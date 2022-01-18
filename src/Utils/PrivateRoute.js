import React from "react";
import { Route } from "react-router";
import { getToken } from "./Common";
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return getToken() ? (
          <Component {...props} />
        ) : (
          props.history.push({
            pathname: "/login",
            state: {
              from: props.location,
              authMess: "Trang bạn yêu cầu cần quyền đăng nhập",
            },
          })
        );
      }}
    />
  );
};

export default PrivateRoute;
