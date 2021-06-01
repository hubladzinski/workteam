import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 25px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.focus1};
  }
`;

const Picture = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  object-fit: cover;
  margin-right: 20px;
`;

const Header = styled.h4`
  text-align: left;
`;

const IndividualSmall = ({ name, picture, ...props }) => {
  return (
    <Wrapper {...props}>
      <Picture src={picture} />
      <Header>{name}</Header>
    </Wrapper>
  );
};

export default IndividualSmall;
