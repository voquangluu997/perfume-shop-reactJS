import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "./Utils";
import { MyNavbar, Footer, Contact } from "./components";
import { Login, Register, Page404, Home, PerfumeDetail } from "./screens";

function App() {
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
              </div>
              <div className="content">
                <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <PublicRoute
                    exact
                    path="/perfumes/:id"
                    component={PerfumeDetail}
                  ></PublicRoute>
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
}

export default App;
