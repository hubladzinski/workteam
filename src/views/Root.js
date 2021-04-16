import { BrowserRouter, Switch, Route } from "react-router-dom";
import Schedule from "../views/Schedule";
import Inventory from "../views/Inventory";

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Schedule} />
      <Route exact path="/inventory" component={Inventory} />
    </Switch>
  </BrowserRouter>
);

export default Root;
