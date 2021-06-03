import { useEffect } from "react";
import { useSelect } from "../../hooks/useSelect";
import styled from "styled-components";
import IndividualSmall from "../taskForm/IndividualSmall";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  position: relative;
`;

const LabelWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  font-size: 16px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.font2};

  input {
    width: 100%;
    height: 55px;
    padding: 10px;
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.border3};
    border-radius: 3px;
  }
`;

const Participants = styled.div`
  margin-bottom: 10px;
`;

const ParticipantsHeader = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  color: ${({ theme }) => theme.font2};
  font-size: 14px;
  margin-bottom: 10px;
`;

const SelectDropdown = styled.div`
  display: ${({ showDropdown }) => (showDropdown ? "grid" : "none")};
  position: absolute;
  padding: 15px 5px;
  border: 1px solid ${({ theme }) => theme.border3};
  background-color: white;
  grid-gap: 5px;
  top: 100px;
`;

const SelectPeople = ({ handleCallback }) => {
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
  } = useSelect();

  useEffect(() => {
    handleCallback(selected);
  }, [selected, handleCallback]);

  return (
    <Wrapper>
      <LabelWrapper>
        <label htmlFor="people">People</label>
        <input
          onChange={(e) => handleInput(e.target.value)}
          id="people"
          type="text"
          value={inputValue}
          autoComplete="off"
        />
      </LabelWrapper>
      <Participants open={open}>
        {selected.length > 0 && (
          <ParticipantsHeader onClick={handleOpen}>
            Added participants
          </ParticipantsHeader>
        )}
        <div>
          {selected.map((item, index) => {
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
        </div>
      </Participants>
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

export default SelectPeople;
