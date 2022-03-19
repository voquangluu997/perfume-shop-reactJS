import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PublicRoute, PrivateRoute, AdminRoute } from "./Utils";
import {
  MyNavbar,
  Footer,
  Contact,
  Avatar,
  Slide,
  Heading,
} from "./components";
import { Row, Col } from "react-bootstrap";
import MessengerCustomerChat from "react-messenger-customer-chat";

import {
  Login,
  Register,
  Page404,
  Home,
  PerfumeDetail,
  Cart,
  Booking,
  BookingDetails,
  Admin,
  AdminPerfume,
  // AddPerfume,
} from "./screens";
import { cartApi, userApi } from "./api";
import { getUser } from "./Utils/Common";

const getcurrentUser = () => {
  return getUser();
};

const App = (props) => {
  // const currUser = getUser();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const getCurrUser = async () => {
      try {
        const currUser = getUser();
        if (currUser) {
          setUser(currUser);
          const currCart = await cartApi.getAll();
          const { data } = currCart;
          setCart(data);
        }
      } catch (error) {
        console.log(error);
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
        <MyNavbar user={user} onSubmit={handleAvatar} cart={cart.length} />
        <div className="row dark">
          <div style={{ padding: "2rem" }}>
            <BrowserRouter>
              <MessengerCustomerChat
                pageId="2405136319710067"
                appId="1090255354883066"
              />
              <div className="headers"></div>
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
                  <PrivateRoute
                    exact
                    path="/cart"
                    component={Cart}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/booking"
                    component={Booking}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/booking/:id"
                    component={BookingDetails}
                  ></PrivateRoute>
                  <AdminRoute
                    exact
                    path="/admin"
                    component={Admin}
                  ></AdminRoute>
                  <AdminRoute
                    exact
                    path="/admin/ana"
                    component={Admin}
                  ></AdminRoute>

                  <AdminRoute
                    exact
                    path="/admin/perfume"
                    component={AdminPerfume}
                  ></AdminRoute>

                  {/* <AdminRoute
                    exact
                    path="/admin/add-perfume"
                    component={AddPerfume}
                  ></AdminRoute> */}

                  <Route path="*" component={Page404} />
                </Switch>
              </div>
            </BrowserRouter>
          </div>
          <div className="foot">
            <div style={{ margin: "2rem", borderRadius: "100px" }}>
              <Heading title="Promotions" />
              <Slide />
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
