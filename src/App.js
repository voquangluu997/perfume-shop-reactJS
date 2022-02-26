import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PublicRoute } from "./Utils";
import { MyNavbar, Footer, Contact, Avatar } from "./components";
import { Login, Register, Page404, Home, PerfumeDetail } from "./screens";
import { userApi } from "./api";
import { getUser } from "./Utils/Common";

const App = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getCurrUser = async () => {
      try {
        const currUser = await userApi.getUser();
        setUser(currUser);
      } catch (error) {
        setUser(null);
      }
    };
    getCurrUser();
  }, []);

  const handleAvatar = (onSubmit) => {
    setUser(onSubmit.currUser);
    // props.history.push("/login");
  };

  return (
    <div className="App">
      <Contact />
      <div
        className="fixed-background"
        style={{ backgroundImage: `url(/uploads/bg5.jpg)` }}
      >
        <div className="row dark">
          <div style={{ padding: "2rem" }}>
            <BrowserRouter>
              <div className="headers">
                <MyNavbar></MyNavbar>
                <Avatar user={user} onSubmit={handleAvatar} />
              </div>
              <div className="content">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={Home}
                    onSubmit={handleAvatar}
                  ></Route>
                  <Route
                    exact
                    path="/perfumes/:id"
                    component={PerfumeDetail}
                  ></Route>
                  <PublicRoute path="/login" component={Login}></PublicRoute>
                  <PublicRoute
                    path="/register"
                    component={Register}
                  ></PublicRoute>
                  <Route path="*" component={Page404} />
                </Switch>
              </div>
            </BrowserRouter>
          </div>
          <div className="foot">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
