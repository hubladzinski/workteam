import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInventory, resetStatus } from "../reducers/inventorySlice";
import MainTemplate from "../templates/MainTemplate";
import Card from "../components/card/Card";
import InventoryItem from "../components/inventoryItem/InventoryItem";
import InputSearch from "../components/input/InputSearch";
import Button from "../components/button/Button";
import InventoryForm from "../components/inventoryForm/inventoryForm";
import Feedback from "../components/feedback/Feedback";
import { useSpring, animated, useTransition } from "react-spring";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily2};
  font-weight: 700;
  font-size: 32px;
`;

const ListLabel = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  list-style: none;
  text-align: center;
  height: 30px;
  margin-bottom: 15px;
  font-weight: 500;
`;

const ListItems = styled.ul`
  display: grid;
  grid-gap: 20px;
  list-style: none;
`;

const InnerWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 20px;
`;

const StyledButton = styled(Button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const FormWrapper = styled.div`
  position: relative;
`;

const StyledInventoryForm = styled(InventoryForm)`
  position: absolute;
`;

const Schedule = () => {
  const {
    inventory,
    status,
    error,
    addStatus,
    addError,
    editStatus,
    editError,
    deleteStatus,
    deleteError,
  } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const transitions = useTransition(showForm, {
    from: { transform: "scale(0)", opacity: 1 },
    enter: { transform: "scale(1)", opacity: 1 },
    leave: { transform: "scale(0)", opacity: 0 },
    reverse: showForm,
    delay: 50,
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(getInventory());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (inventory) {
      let filter = inventory.filter((item) => {
        return item.name
          .replace(/ /g, "")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFiltered(filter);
    }
  }, [search, inventory]);

  const handleCallback = (inputValue) => {
    setSearch(inputValue);
  };

  return (
    <MainTemplate>
      <HeaderWrapper>
        <InnerWrapper>
          <Header>Inventory</Header>
          <FormWrapper>
            <StyledButton
              onClick={() => setShowForm((prevState) => !prevState)}
            >
              +
            </StyledButton>
            {transitions(
              (styles, item) =>
                item && (
                  <animated.div style={styles}>
                    <StyledInventoryForm />
                  </animated.div>
                )
            )}
          </FormWrapper>
        </InnerWrapper>
        <InputSearch label={"search"} handleCallback={handleCallback} />
      </HeaderWrapper>
      <Card>
        <ListLabel>
          <li>Name</li>
          <li>Picture</li>
          <li>Stock</li>
          <li>Price</li>
          <li>Date added</li>
          <li>Actions</li>
        </ListLabel>
        <ListItems>
          {filtered.map((item) => (
            <InventoryItem
              _id={item._id}
              name={item.name}
              picture={item.picture}
              price={item.price}
              date={item.date}
              stock={item.stock}
            />
          ))}
        </ListItems>
      </Card>
      <Feedback
        onClick={() =>
          dispatch(
            resetStatus({
              statusType: "deleteStatus",
              errorType: "deleteError",
            })
          )
        }
        message={deleteError ? deleteError : "Item deleted"}
        activate={
          deleteStatus === "succeeded" || deleteStatus === "failed"
            ? true
            : false
        }
      />
      <Feedback
        onClick={() =>
          dispatch(
            resetStatus({
              statusType: "addStatus",
              errorType: "addError",
            })
          )
        }
        message={addError ? addError : "Item added"}
        activate={
          addStatus === "succeeded" || addStatus === "failed" ? true : false
        }
      />
      <Feedback
        onClick={() =>
          dispatch(
            resetStatus({
              statusType: "editStatus",
              errorType: "editError",
            })
          )
        }
        message={editError ? editError : "Item edited"}
        activate={
          editStatus === "succeeded" || editStatus === "failed" ? true : false
        }
      />
    </MainTemplate>
  );
};

export default Schedule;
