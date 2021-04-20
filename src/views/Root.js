import { BrowserRouter, Switch, Route } from "react-router-dom";
import Schedule from "../views/Schedule";
import Inventory from "../views/Inventory";
import Individuals from "../views/Individuals";

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Schedule} />
      <Route exact path="/calendar" component={Schedule} />
      <Route exact path="/inventory" component={Inventory} />
      <Route exact path="/teams" component={Individuals} />
    </Switch>
  </BrowserRouter>
);

export default Root;
