import React from "react";
import { Route } from "react-router";
import { getToken } from "./Common";
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !getToken() ? (
          <Component {...props} />
        ) : (
          props.history.push("/")
        );
      }}
    />
  );
};

export default PublicRoute;
