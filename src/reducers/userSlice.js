import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestType } from "../backend/backend";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const initialState = {
  user: {
    email: "User",
    uid: "",
    token: "",
    loginStatus: false,
    admin: [],
    tasks: [],
    picture: "",
    phone: "",
    name: "",
  },
  status: "idle",
  response: "",
  error: null,
  editStatus: "idle",
  editResponse: "",
  editError: null,
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

const fetchUserTasks = async (userID, token) => {
  const request = {
    url: `${requestType.get_user_tasks}/${userID}`,
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
};

const login = async (userCredentials) => {
  const request = {
    url: requestType.login,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
      }),
    },
  };
  const response = await fetch(request.url, request.options);
  const json = await response.json();
  const { user, token } = json;

  let tasks = [];
  if (user.tasks && user.tasks.length > 0) {
    tasks = await fetchUserTasks(user._id, token);
  }

  const userInfo = {
    name: user.name,
    tel: user.tel,
    email: user.email,
    _id: user._id,
    uid: user.uid,
    token: token,
    loginStatus: true,
    tasks: tasks,
    picture: user.picture,
  };
  return userInfo;
};

export const authenticateLogin = createAsyncThunk(
  "user/authenticateLogin",
  async ({ email, password }, { getState, dispatch }) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userInfo = await login(userCredentials);
      return userInfo;
    } catch (err) {
      return err;
    }
  }
);

export const authenticateSignup = createAsyncThunk(
  "user/authenticateSignup",
  async ({ email, password }, { getState, dispatch }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userInfo = await login(userCredentials);
      return userInfo;
    } catch (err) {
      return err;
    }
  }
);

export const authenticateLoginGoogle = createAsyncThunk(
  "user/authenticateLoginGoogle",
  async (arg = null, { getState, dispatch }) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);
      const userInfo = await login(userCredentials);
      return userInfo;
    } catch (err) {
      return err;
    }
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ picture, name, tel }, { getState, dispatch }) => {
    try {
      const { _id, token } = getState().user.user;
      let photoURL = null;
      if (picture) photoURL = await UploadImgToFirebase(picture, _id);
      const request = {
        url: requestType.put_user,
        options: {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            name,
            tel,
            picture: photoURL,
          }),
        },
      };
      const response = await fetch(request.url, request.options);
      const json = await response.json();
      const userInfo = {
        name,
        tel,
        picture: photoURL,
      };
      return { response: json, userInfo };
    } catch (err) {
      return err;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetStatus: (state, action) => {
      state[action.payload.statusType] = "idle";
      state[action.payload.errorType] = null;
    },
    logout: (state, action) => {
      state.user = {};
    },
  },
  extraReducers: {
    [authenticateLogin.pending]: (state, action) => {
      state.status = "loading";
    },
    [authenticateLogin.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if (action.payload.uid) {
        state.user = action.payload;
      } else {
        state.response = action.payload.code;
      }
    },
    [authenticateLogin.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [authenticateLoginGoogle.pending]: (state, action) => {
      state.status = "loading";
    },
    [authenticateLoginGoogle.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    [authenticateLoginGoogle.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [authenticateSignup.pending]: (state, action) => {
      state.status = "loading";
    },
    [authenticateSignup.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if (action.payload.uid) {
        state.user = action.payload;
      } else {
        state.response = action.payload.code;
      }
    },
    [authenticateSignup.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [editUser.pending]: (state, action) => {
      state.editStatus = "loading";
    },
    [editUser.fulfilled]: (state, action) => {
      state.editStatus = "succeeded";
      if (action.payload.response.user.n > 0) {
        if (action.payload.userInfo.picture) {
          state.user = {
            ...state.user,
            name: action.payload.userInfo.name,
            tel: action.payload.userInfo.tel,
            picture: action.payload.userInfo.picture,
          };
        } else {
          state.user = {
            ...state.user,
            name: action.payload.userInfo.name,
            tel: action.payload.userInfo.tel,
          };
        }
        state.editResponse = action.payload.response.response;
      } else {
        state.editResponse = "Something went wrong";
      }
    },
    [editUser.rejected]: (state, action) => {
      state.editStatus = "failed";
      state.error = action.error.message;
    },
  },
});

export const { resetStatus, logout } = userSlice.actions;

export default userSlice.reducer;
