import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Form, Formik } from "formik";
import { addInventory } from "../../../reducers/inventorySlice";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import CustomError from "../../atoms/customError/CustomError";
import * as Yup from "yup";

const StyledForm = styled(Form)`
  display: grid;
  width: 500px;
  grid-gap: 10px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  margin-top: 10px;
  transition: transform 0.5s ease-in;
  transform: rotate(360deg);
`;

const Img = styled.img`
  padding: 10px;
  max-height: 300px;
  width: 100%;
  object-fit: contain;
  border: 1px solid ${({ theme }) => theme.border3};
  border-radius: 3px;
`;

const ProgressBar = styled.progress`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border3};
  border-radius: 3px;
`;

const InventoryAddSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Must be between 2-30 characters long")
    .max(30, "Must be between 2-30 characters long")
    .required("Required"),
  stock: Yup.number().integer(),
  price: Yup.number(),
});

const InventoryForm = ({ ...props }) => {
  const dispatch = useDispatch();
  const formRef = useRef();

  const [picture, setPicture] = useState();
  const [preview, setPreview] = useState();
  const [fileError, setFileError] = useState({ show: false, message: "" });

  const handleFile = () => {
    const pictureHandler = document.querySelector("#picture");
    if (pictureHandler.files[0]) {
      if (pictureHandler.files[0].size < 1048576) {
        setPreview(URL.createObjectURL(pictureHandler.files[0]));
        setPicture(pictureHandler.files[0]);
        setFileError({
          show: false,
          message: "",
        });
      } else {
        setFileError({
          show: true,
          message: "File must be less than 1 MB",
        });
      }
    }
  };

  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        name: "",
        stock: 0,
        price: 0,
        picture: "",
      }}
      validationSchema={InventoryAddSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          dispatch(
            addInventory({
              name: values.name,
              picture,
              stock: values.stock,
              price: values.price,
            })
          );
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({ values }) => (
        <StyledForm {...props}>
          <Input
            label="Name"
            name="name"
            type="text"
            component="input"
            secondary
          />
          <Input
            label="Stock avaiable"
            name="stock"
            type="number"
            component="input"
            min="0"
            secondary
          />
          <Input
            label="Price"
            name="price"
            type="number"
            component="input"
            min="0"
            step="0.01"
            secondary
          />
          <Input
            label="Picture"
            name="picture"
            type="file"
            accept="image/*"
            component="input"
            onChange={handleFile}
            secondary
          />
          {fileError.show && <CustomError>{fileError.message}</CustomError>}
          {preview && <Img src={preview} alt="preview" />}
          {preview && (
            <ProgressBar value="0" max="100" id="progress-bar"></ProgressBar>
          )}
          <Button type="submit">Add item</Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default InventoryForm;
