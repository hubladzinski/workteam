import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Form, Formik } from "formik";
import Input from "../input/Input";
import SelectPeople from "../select/SelectPeople";
import Button from "../button/Button";
import { requestType } from "../../backend/backend";
import { addTasks } from "../../reducers/calendarSlice";

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-column-gap: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
`;

const InnerWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;

  button {
    margin-left: 10px;
    width: 55px;
  }
`;

const StepsHeader = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  color: ${({ theme }) => theme.font2};
  font-size: 14px;
  margin-bottom: 10px;
`;

const StepWrapper = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.focus1};
  }
`;

const StepsInnerHeader = styled.h4`
  text-align: left;
  margin-left: 10px;
  max-width: 500px;
`;

const TaskForm = ({ selectedDay, ...props }) => {
  const dispatch = useDispatch();
  const [steps, setSteps] = useState([]);
  const [selected, setSelected] = useState([]);

  const ID = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const handleClickAdd = (task) => {
    setSteps((prevSteps) => {
      let newTask = {
        task: task,
        id: ID(),
        order: prevSteps.length,
        status: prevSteps.length === 0 ? "inProgress" : "idle",
      };
      return [...prevSteps, newTask];
    });
  };

  const handleClickRemove = (id) => {
    console.log(id);
    let newSteps = steps.filter((item) => item.id !== id);
    setSteps(newSteps);
  };

  const handleCallback = (selectedPeople) => {
    setSelected(selectedPeople);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        time_start: "",
        time_end: "",
        note: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const usersIDs = selected.map((item) => item._id);
        dispatch(
          addTasks({
            usersIDs,
            title: values.title,
            selectedDay,
            time_start: values.time_start,
            time_end: values.time_end,
            note: values.note,
            steps,
          })
        );
      }}
    >
      {({ values }) => (
        <StyledForm {...props}>
          <InnerWrapper>
            <Input
              label="Title"
              name="title"
              type="text"
              component="input"
              secondary
            />
            <Input
              label="Start time"
              name="time_start"
              type="time"
              component="input"
              secondary
            />
            <Input
              label="End time"
              name="time_end"
              type="time"
              component="input"
              secondary
            />
            <Input label="Note" name="note" component="textarea" secondary />
            <SelectPeople handleCallback={handleCallback} />
          </InnerWrapper>
          <div>
            <InputWrapper>
              <Input
                label="Tasks"
                name="task"
                component="textarea"
                secondary
                textarea
              />
              <Button type="button" onClick={() => handleClickAdd(values.task)}>
                +
              </Button>
            </InputWrapper>
            <div>
              {steps.length > 0 && <StepsHeader>Added steps</StepsHeader>}
              <ul>
                {steps.map((item, index) => {
                  return (
                    <StepWrapper
                      key={index}
                      onClick={() => handleClickRemove(item.id)}
                    >
                      <div>{index + 1}.</div>
                      <StepsInnerHeader>{item.task}</StepsInnerHeader>
                    </StepWrapper>
                  );
                })}
              </ul>
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default TaskForm;
