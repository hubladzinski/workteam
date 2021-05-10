import { BrowserRouter, Switch, Route } from "react-router-dom";
import Schedule from "../views/Schedule";
import Inventory from "../views/Inventory";
import Individuals from "../views/Individuals";
import Login from "../views/Login";
import Signup from "../views/Signup";
import DetailsPage from "../views/DetailsPage";

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Schedule} />
      <Route exact path="/calendar" component={Schedule} />
      <Route exact path="/calendar/task/:id" component={DetailsPage} />
      <Route exact path="/inventory" component={Inventory} />
      <Route exact path="/teams" component={Individuals} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  </BrowserRouter>
);

export default Root;
