import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../button/Button";
import { requestType } from "../../backend/backend";
import TasksList from "../taskItem/Complex/tasksList";
import { useSpring, animated, useTransition } from "react-spring";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 50px;
  padding: 20px 35px;
  border: 1px solid ${({ theme }) => theme.border2};
`;

const BasicWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Picture = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-right: 50px;
  object-fit: cover;
`;

const HeaderWrapper = styled.div`
  margin-right: 70px;

  button {
    width: 250px;
  }
`;

const Header = styled.h2`
  font-size: 26px;
  margin-bottom: 15px;
`;

const ListWrapper = styled.div`
  display: flex;
  list-style: none;
  font-size: 16px;

  li {
    position: relative;
    margin-right: 100px;
  }

  li:not(:last-child)::after {
    content: "";
    position: absolute;
    border-right: 1px solid #000;
    height: 96px;
    right: -50px;
    bottom: -40%;
  }

  div {
    margin-top: 20px;
  }
`;

const AdvancedWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const IndividualItem = ({ _id, name, email, picture, tel, taskId }) => {
  const { user } = useSelector((state) => state.user);
  const [toggleDetails, setToggleDetails] = useState(false);
  const [tasks, setTasks] = useState([]);

  const transitions = useTransition(toggleDetails, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: toggleDetails,
    delay: 100,
  });

  const fetchData = async (request, callback) => {
    try {
      const response = await fetch(request.url, request.options);
      const json = await response.json();
      callback(json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (toggleDetails) {
      const request = {
        url: `${requestType.get_user_tasks}/${_id}`,
        options: {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        },
      };
      fetchData(request, setTasks);
    }
  }, [toggleDetails, user.token, _id]);

  return (
    <Wrapper>
      <BasicWrapper>
        <Picture src={picture} />
        <HeaderWrapper>
          <Header>{name}</Header>
          <Button onClick={() => setToggleDetails((prevState) => !prevState)}>
            Details
          </Button>
        </HeaderWrapper>
        <ListWrapper>
          <li>
            Telefon:<div>{tel}</div>
          </li>
          <li>
            Email:<div>{email}</div>
          </li>
        </ListWrapper>
      </BasicWrapper>
      {transitions(
        (styles, item) =>
          item &&
          toggleDetails && (
            <animated.div style={styles}>
              <AdvancedWrapper>
                <TasksList tasks={tasks} taskId={taskId} />
              </AdvancedWrapper>
            </animated.div>
          )
      )}
    </Wrapper>
  );
};

export default IndividualItem;
