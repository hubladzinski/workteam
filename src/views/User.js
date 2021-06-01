import styled from "styled-components";
import MainTemplate from "../templates/MainTemplate";
import Card from "../components/card/Card";
import UserTemplate from "../templates/UserTemplate";

const Header = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily2};
  font-weight: 700;
  font-size: 32px;
`;

const DetailsPage = () => (
  <MainTemplate>
    <Header>User profile</Header>
    <Card>
      <UserTemplate />
    </Card>
  </MainTemplate>
);

export default DetailsPage;
