import { useEffect } from "react";
import { useSelect } from "../../hooks/useSelect";
import { useSelector } from "react-redux";
import styled from "styled-components";
import IndividualSmall from "../taskForm/IndividualSmall";
import Button from "../button/Button";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  position: relative;
  grid-template-columns: auto auto;
  justify-content: center;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fontFamily2};
  font-weight: 600;
  color: ${({ theme }) => theme.font2};

  input {
    width: 100%;
    height: 30px;
    padding: 10px;
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    background-color: white;
    border: none;
    border-radius: 20px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    margin-left: 20px;

    &:focus {
      outline-width: 0;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
    }
  }
`;

const Participants = styled.div`
  height: ${({ open }) => (open ? "250px" : "auto")};
  position: absolute;
  left: -330px;
  overflow-y: ${({ open }) => (open ? "scroll" : "hidden")};
  z-index: 1;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: white;
`;

const IndividualsWrapper = styled.div`
  margin-top: 10px;
`;

const ParticipantsHeader = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  color: ${({ theme }) => theme.font2};
  font-size: 14px;
`;

const SelectDropdown = styled.div`
  width: 100%;
  top: 50px;
  display: ${({ showDropdown }) => (showDropdown ? "grid" : "none")};
  position: absolute;
  padding: 15px 5px;
  border: 1px solid ${({ theme }) => theme.border3};
  background-color: white;
  grid-gap: 5px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin-left: 10px;
    height: 25px;
    width: 55px;
  }
`;

const SelectPeopleInline = ({ handleCallback }) => {
  const { searchCalendar } = useSelector((state) => state.calendar);
  const {
    peopleFiltered,
    showDropdown,
    selected,
    open,
    inputValue,
    handleInput,
    handleClickAdd,
    handleClickRemove,
    handleOpen,
  } = useSelect(searchCalendar);

  useEffect(() => {
    handleCallback(selected);
  }, [selected, handleCallback]);

  return (
    <Wrapper>
      <LabelWrapper>
        <label htmlFor="people">People/Teams</label>
        <input
          onChange={(e) => handleInput(e.target.value)}
          id="people"
          type="text"
          value={inputValue}
          autoComplete="off"
        />
      </LabelWrapper>
      {searchCalendar.length > 0 && (
        <Participants open={open}>
          {searchCalendar.length > 0 && (
            <HeaderWrapper>
              <ParticipantsHeader>
                {open ? "Hide visible schedules" : "Show visible schedules"}
              </ParticipantsHeader>
              <Button onClick={handleOpen}>
                {open && <i className="fas fa-angle-up"></i>}
                {!open && <i className="fas fa-angle-down"></i>}
              </Button>
            </HeaderWrapper>
          )}
          {open && (
            <IndividualsWrapper>
              {searchCalendar.map((item, index) => {
                return (
                  <IndividualSmall
                    onClick={() => handleClickRemove(item._id)}
                    key={`people${index}`}
                    _id={item._id}
                    name={item.name}
                    picture={item.picture}
                  />
                );
              })}
            </IndividualsWrapper>
          )}
        </Participants>
      )}
      <SelectDropdown showDropdown={showDropdown}>
        {peopleFiltered.map((item, index) => {
          return (
            <IndividualSmall
              onClick={() => handleClickAdd(item._id)}
              key={`selected${index}`}
              _id={item._id}
              name={item.name}
              picture={item.picture}
            />
          );
        })}
      </SelectDropdown>
    </Wrapper>
  );
};

export default SelectPeopleInline;
