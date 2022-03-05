import React from "react";
import { Route } from "react-router";
import { getToken, getUser } from "./Common";
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return getToken() &&
          getUser().id == "d52b499a-d3e7-40d4-9059-70304fb1ea21" ? (
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
