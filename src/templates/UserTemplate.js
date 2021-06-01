import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/input/Input";
import { Form, Formik } from "formik";
import Button from "../components/button/Button";
import TasksList from "../components/taskItem/Complex/tasksList";
import { editUser, resetStatus } from "../reducers/userSlice";
import Feedback from "../components/feedback/Feedback";

const FormWrapper = styled(Form)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 40px;
  margin-bottom: 25px;
  justify-content: center;
  margin: 0 auto;
`;

const StyledSubmitButton = styled(Button)`
  width: 250px;
`;

const InnerWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
`;

const Header = styled.h3`
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.font2};
`;

const PictureWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  position: relative;
`;

const ProfilePic = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
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
  top: 30px;
  left: 180px;
`;

const StyledButton = styled(Button)`
  width: 50px;
  color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.primary2};
`;

const UserTemplate = (props) => {
  const { user, status, error, editStatus, editError } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [editPicture, setEditPicture] = useState(false);
  const [currentPicture, setCurrentPicture] = useState();
  const [newPicture, setNewPicture] = useState();
  const [preview, setPreview] = useState();

  const handleFile = () => {
    const pictureHandler = document.querySelector("#picture");
    setPreview(URL.createObjectURL(pictureHandler.files[0]));
    setNewPicture(pictureHandler.files[0]);
  };

  useEffect(() => {
    setEditPicture(false);
    setCurrentPicture();
    setPreview();
  }, [user]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: user.name,
        tel: user.tel,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await dispatch(
            editUser({
              picture: newPicture,
              name: values.name,
              tel: values.tel,
            })
          );
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({ values }) => (
        <FormWrapper {...props}>
          <InnerWrapper>
            <PictureWrapper>
              <Header>Profile picture</Header>
              <ProfilePic
                onClick={() => setEditPicture((prevState) => !prevState)}
                src={currentPicture ? currentPicture : user.picture}
                alt="profile"
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
                  {preview && (
                    <>
                      <Img src={preview} alt="preview" />
                      <Button
                        type="button"
                        onClick={() => setCurrentPicture(preview)}
                      >
                        Set new photo
                      </Button>
                    </>
                  )}
                </PictureEditor>
              )}
              {currentPicture && (
                <StyledButton onClick={() => setCurrentPicture(null)} secondary>
                  Reset
                </StyledButton>
              )}
            </PictureWrapper>
            <InnerWrapper>
              <Input
                label="Name"
                name="name"
                type="text"
                component="input"
                secondary
              />
              <Input
                label="Phone"
                name="tel"
                type="tel"
                component="input"
                secondary
              />
            </InnerWrapper>
            <StyledSubmitButton>Update profile</StyledSubmitButton>
          </InnerWrapper>
          <TasksList tasks={user.tasks} />
          <Feedback
            onClick={() =>
              dispatch(
                resetStatus({
                  statusType: "editStatus",
                  errorType: "editError",
                })
              )
            }
            message={editError ? editError : "Profile edited"}
            activate={
              editStatus === "succeeded" || editStatus === "failed"
                ? true
                : false
            }
          />
        </FormWrapper>
      )}
    </Formik>
  );
};

export default UserTemplate;
