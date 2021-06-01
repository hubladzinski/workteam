import styled, { css } from "styled-components";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import { useState, useRef } from "react";
import Input from "../input/Input";
import { deleteInventory, editInventory } from "../../reducers/inventorySlice";

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  align-content: center;
  height: 75px;
  font-size: 14px;
  list-style: none;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border2};
`;

const PictureWrapper = styled.div`
  position: relative;
`;

const Picture = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: contain;

  ${({ editMode }) =>
    editMode &&
    css`
      cursor: pointer;
    `}
`;

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.primary2};
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  align-content: center;
  height: 75px;
  font-size: 14px;
  list-style: none;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border2};
`;

const Img = styled.img`
  padding: 10px;
  max-height: 300px;
  width: 100%;
  object-fit: contain;
  border: 1px solid ${({ theme }) => theme.border3};
  border-radius: 3px;
`;

const PictureEditor = styled.div`
  display: grid;
  width: 300px;
  grid-gap: 10px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 60px;
`;

const InventoryItem = ({
  _id,
  name,
  picture,
  price,
  date,
  stock,
  handleCallback,
}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <li>{name}</li>
      <li>
        <Picture src={picture} />
      </li>
      <li>{stock}</li>
      <li>{price}</li>
      <li>{date}</li>
      <li>
        <div>
          <StyledButton onClick={handleCallback} secondary>
            Edit
          </StyledButton>
        </div>
        <div>
          <StyledButton
            onClick={() => dispatch(deleteInventory({ _id }))}
            secondary
          >
            Delete
          </StyledButton>
        </div>
      </li>
    </Wrapper>
  );
};

const InventoryItemForm = ({
  _id,
  name,
  picture,
  stock,
  price,
  date,
  handleCallback,
  ...props
}) => {
  const dispatch = useDispatch();
  const formRef = useRef();

  const [editPicture, setEditPicture] = useState(false);
  const [newPicture, setNewPicture] = useState();
  const [preview, setPreview] = useState();

  const handleFile = () => {
    const pictureHandler = document.querySelector("#picture");
    setPreview(URL.createObjectURL(pictureHandler.files[0]));
    setNewPicture(pictureHandler.files[0]);
  };

  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        name: name,
        stock: stock,
        price: price,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await dispatch(
          editInventory({
            _id,
            name: values.name,
            picture: newPicture,
            stock: values.stock,
            price: values.price,
          })
        );
        handleCallback();
      }}
    >
      {({ values }) => (
        <StyledForm {...props}>
          <Input
            label="Name"
            name="name"
            type="text"
            component="input"
            editMode
            secondary
          />
          <PictureWrapper>
            <Picture
              src={preview ? preview : picture}
              onClick={() => setEditPicture((prevState) => !prevState)}
              editMode
            />
            {editPicture && (
              <PictureEditor>
                <Input
                  label="Picture"
                  name="picture"
                  type="file"
                  accept="image/*"
                  component="input"
                  editMode
                  onChange={handleFile}
                  secondary
                />
                {preview && <Img src={preview} alt="preview" />}
              </PictureEditor>
            )}
          </PictureWrapper>
          <Input
            label="Stock avaiable"
            name="stock"
            type="number"
            component="input"
            editMode
            secondary
          />
          <Input
            label="Price"
            name="price"
            type="number"
            component="input"
            editMode
            secondary
          />
          <div>{date}</div>
          <div>
            <div>
              <StyledButton onClick={handleCallback} secondary>
                Back
              </StyledButton>
            </div>
            <div>
              <StyledButton type="submit" secondary>
                Confirm changes
              </StyledButton>
            </div>
          </div>
        </StyledForm>
      )}
    </Formik>
  );
};

const InventoryItemWrapper = ({ _id, name, picture, price, date, stock }) => {
  const [editMode, setEditMode] = useState(false);

  const handleCallback = () => {
    setEditMode((prevState) => !prevState);
  };

  let component;
  editMode
    ? (component = (
        <InventoryItemForm
          _id={_id}
          name={name}
          picture={picture}
          price={price}
          stock={stock}
          date={date}
          handleCallback={handleCallback}
        />
      ))
    : (component = (
        <InventoryItem
          _id={_id}
          name={name}
          picture={picture}
          price={price}
          stock={stock}
          date={date}
          handleCallback={handleCallback}
        />
      ));
  return component;
};

export default InventoryItemWrapper;
