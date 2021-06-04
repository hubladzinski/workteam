import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestType } from "../backend/backend";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const initialState = {
  inventory: [],
  status: "idle",
  error: null,
  addStatus: "idle",
  addResponse: "",
  addError: null,
  editStatus: "idle",
  editResponse: "",
  editError: null,
  deleteStatus: "idle",
  deleteResponse: "",
  deleteError: null,
};

const UploadImgToFirebase = (img, id) => {
  let storageRef = ref(storage, id);
  let uploadTask = uploadBytesResumable(storageRef, img);

  return new Promise((resolve) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export const getInventory = createAsyncThunk(
  "inventory/getInventory",
  async (arg = null, { getState, dispatch }) => {
    try {
      const { token } = getState().user.user;
      const request = {
        url: requestType.get_inventory,
        options: {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      };
      const response = await fetch(request.url, request.options);
      const json = await response.json();
      return json;
    } catch (err) {
      return err;
    }
  }
);

export const addInventory = createAsyncThunk(
  "inventory/addInventory",
  async ({ name, picture, stock, price }, { getState, dispatch }) => {
    try {
      const { token } = getState().user.user;
      const request = {
        url: requestType.post_inventory,
        options: {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            stock,
            price,
            date: new Date(Date.now()),
          }),
        },
      };
      const response = await fetch(request.url, request.options);
      const json = await response.json();
      const { _id, date } = json.inventory;
      const photoURL = await UploadImgToFirebase(picture, _id);

      const request_edit = {
        url: requestType.put_inventory,
        options: {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            name,
            picture: photoURL,
            stock,
            price,
          }),
        },
      };
      const response_edit = await fetch(request_edit.url, request_edit.options);
      await response_edit.json();
      const newInventory = {
        _id,
        name,
        picture: photoURL,
        stock,
        price,
        date,
      };
      return { response: json, newInventory };
    } catch (err) {
      return err;
    }
  }
);

export const editInventory = createAsyncThunk(
  "inventory/editInventory",
  async ({ _id, name, picture, stock, price }, { getState, dispatch }) => {
    try {
      const { token } = getState().user.user;
      let photoURL = null;
      if (picture) photoURL = await UploadImgToFirebase(picture, _id);
      const request = {
        url: requestType.put_inventory,
        options: {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            name,
            picture: photoURL,
            stock,
            price,
          }),
        },
      };
      const response = await fetch(request.url, request.options);
      const json = await response.json();
      return {
        response: json,
        _id,
        name,
        picture: photoURL,
        stock,
        price,
      };
    } catch (err) {
      return err;
    }
  }
);

export const deleteInventory = createAsyncThunk(
  "inventory/deleteInventory",
  async ({ _id }, { getState, dispatch }) => {
    try {
      const { _id: userID, token } = getState().user.user;
      const request = {
        url: `${requestType.delete_inventory}/${_id}`,
        options: {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: userID,
          }),
        },
      };
      const response = await fetch(request.url, request.options);
      const json = await response.json();
      console.log(json);
      return { response: json, _id };
    } catch (err) {
      return err;
    }
  }
);

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialState,
  reducers: {
    resetStatus: (state, action) => {
      state[action.payload.statusType] = "idle";
      state[action.payload.errorType] = null;
    },
  },
  extraReducers: {
    [getInventory.pending]: (state, action) => {
      state.status = "loading";
    },
    [getInventory.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.inventory = action.payload;
    },
    [getInventory.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addInventory.pending]: (state, action) => {
      state.addStatus = "loading";
    },
    [addInventory.fulfilled]: (state, action) => {
      state.addStatus = "succeeded";
      if (action.payload.response.inventory.name) {
        state.inventory = [...state.inventory, action.payload.newInventory];
        state.addResponse = action.payload.response.response;
      } else {
        state.addResponse = "Something went wrong";
      }
    },
    [addInventory.rejected]: (state, action) => {
      state.addStatus = "failed";
      state.addError = action.error.message;
    },
    [editInventory.pending]: (state, action) => {
      state.editStatus = "loading";
    },
    [editInventory.fulfilled]: (state, action) => {
      state.editStatus = "succeeded";
      if (action.payload.response.inventory.n > 0) {
        state.inventory = state.inventory.map((item) => {
          if (item._id === action.payload._id) {
            if (action.payload.picture) {
              return action.payload;
            } else {
              return {
                ...item,
                _id: action.payload_id,
                name: action.payload.name,
                stock: action.payload.stock,
                price: action.payload.price,
              };
            }
          }
          return item;
        });
        state.editResponse = action.payload.response.response;
      } else {
        state.editResponse = "Something went wrong";
      }
    },
    [editInventory.rejected]: (state, action) => {
      state.addStatus = "failed";
      state.editError = action.error.message;
    },
    [deleteInventory.pending]: (state, action) => {
      state.deleteStatus = "loading";
    },
    [deleteInventory.fulfilled]: (state, action) => {
      state.deleteStatus = "succeeded";
      if (action.payload.response.inventory.n > 0) {
        state.inventory = state.inventory.filter(
          (item) => item._id !== action.payload._id
        );
        state.deleteResponse = action.payload.response.response;
      } else {
        state.deleteResponse = "Something went wrong";
      }
    },
    [deleteInventory.rejected]: (state, action) => {
      state.deleteStatus = "failed";
      state.deleteError = action.error.message;
    },
  },
});

export const { resetStatus } = inventorySlice.actions;

export default inventorySlice.reducer;
