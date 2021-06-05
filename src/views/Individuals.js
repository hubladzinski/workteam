import styled from "styled-components";
import MainTemplate from "../templates/MainTemplate";
import Card from "../components/card/Card";
import IndividualItem from "../components/individualItem/IndividualItem";
import InputSearch from "../components/input/InputSearch";
import Feedback from "../components/feedback/Feedback";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPeople } from "../reducers/peopleSlice";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily2};
  font-weight: 700;
  font-size: 32px;
`;

const IndividualsWrapper = styled.div`
  display: grid;
  grid-gap: 35px;
`;

const Individuals = () => {
  const { people, status } = useSelector((state) => state.people);
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPeople());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (people) {
      let filter = people.filter((item) => {
        return item.name
          .replace(/ /g, "")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFiltered(filter);
    }
  }, [search, people]);

  const handleCallback = (inputValue) => {
    setSearch(inputValue);
  };

  return (
    <MainTemplate>
      <Feedback message="Hello" />
      <HeaderWrapper>
        <Header>Workers/Teams</Header>
        <InputSearch handleCallback={handleCallback} />
      </HeaderWrapper>
      <Card>
        <IndividualsWrapper>
          {filtered.map((item) => (
            <IndividualItem
              _id={item._id}
              name={item.name}
              email={item.email}
              picture={item.picture}
              tel={item.tel}
            />
          ))}
        </IndividualsWrapper>
      </Card>
    </MainTemplate>
  );
};

export default Individuals;
