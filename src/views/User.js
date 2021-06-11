import styled from "styled-components";
import MainTemplate from "../templates/mainTemplate/MainTemplate";
import Card from "../components/atoms/card/Card";
import UserTemplate from "../templates/userTemplate/UserTemplate";

const Header = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily2};
  font-weight: 700;
  font-size: 32px;
`;

const User = () => (
  <MainTemplate>
    <Header>User profile</Header>
    <Card>
      <UserTemplate />
    </Card>
  </MainTemplate>
);

export default User;
