import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthRoute from "../utils/AuthRoute";
import Schedule from "./Schedule";
import Inventory from "./Inventory";
import Individuals from "./Individuals";
import Login from "./Authentication";
import DetailsPage from "./DetailsPage";
import User from "./User";

const Root = () => (
  <BrowserRouter>
    <Switch>
      <AuthRoute exact path="/" component={Schedule} />
      <AuthRoute exact path="/calendar" component={Schedule} />
      <AuthRoute exact path="/calendar/task/:id" component={DetailsPage} />
      <AuthRoute exact path="/inventory" component={Inventory} />
      <AuthRoute exact path="/teams" component={Individuals} />
      <AuthRoute exact path="/user" component={User} />
      <Route
        exact
        path="/login"
        render={(props) => <Login {...props} mode="login" />}
      />
      <Route
        exact
        path="/signup"
        render={(props) => <Login {...props} mode="signup" />}
      />
    </Switch>
  </BrowserRouter>
);

export default Root;
