import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.loginStatus) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: "/login" }} />;
        }
      }}
    />
  );
};

export default AuthRoute;
