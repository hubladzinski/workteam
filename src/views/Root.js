import { BrowserRouter, Switch, Route } from "react-router-dom";
import Schedule from "../views/Schedule";

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Schedule} />
    </Switch>
  </BrowserRouter>
);

export default Root;
