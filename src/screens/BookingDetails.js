import React, { useState, useEffect } from "react";
import { Heading, Loading, CardImg } from "../components";
import { Container, Row, Col, Card, Table, Form } from "react-bootstrap";
import { bookingApi } from "../api";
import {
  FaCheckCircle,
  FaRegClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserAlt,
} from "react-icons/fa";
import DayJS from "react-dayjs";
import { getUser } from "../Utils/Common";

const BookingDetails = ({ match, history }) => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [heading, setHeading] = useState("");
  const [err, setErr] = useState(null);
  const [searchKey, setSearchKey] = useState({
    page: 1,
    limit: 6,
    search: "",
    // category: "",
    // author: "",
    // sort: "ASC",
  });
  const [searchChild, setSearchChild] = useState({
    // category: "", author: ""
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 0,
  });

  useEffect(() => {
    const getBooking = async () => {
      try {
        const bk = await bookingApi.getById(match.params.id);
        setBooking(bk);
        if (bk.status == "ORDERING")
          setHeading({
            status: "Waiting to Receive",
            message:
              "Your order will be delivered to you within 1 to 3 working days",
          });
        if (bk.status == "ORDERED")
          setHeading({ status: "Completed", message: "Received" });
      } catch (error) {
        console.log(error);
      }
    };
    getBooking();
  }, []);

  function handlePageChange(newPage) {
    setSearchKey({ ...searchKey, page: newPage });
  }

  const handleFilterChange = (newFilters) => {
    setSearchKey({
      ...searchKey,
      ...{
        search: newFilters.searchText,
        page: 1,
      },
      // ...searchChild,
    });
  };

  return (
    <Container fluid>
      <Heading title="order Details"></Heading>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="display-center">
            <Card border="light" style={{ width: "70%" }}>
              <Card.Header>
                <div>
                  <FaCheckCircle
                    style={{ color: "green", marginRight: "10px" }}
                  />
                  {heading?.status}

                  <span>
                    <FaRegClock
                      style={{
                        marginLeft: "2rem",
                        color: "#11bba3",
                        color: "green",
                      }}
                    ></FaRegClock>
                    <span style={{ marginLeft: ".6rem" }}>
                      <DayJS format="YYYY-MM-DD HH:MM" className="text-nowrap">
                        {booking?.createdAt}
                      </DayJS>
                    </span>
                  </span>

                  <span>
                    <FaUserAlt
                      style={{
                        marginLeft: "2rem",
                        color: "#11bba3",
                        color: "green",
                      }}
                    ></FaUserAlt>
                    <span style={{ marginLeft: ".6rem" }}>
                      {booking?.receiver || getUser().fullname}
                    </span>
                  </span>

                  <span>
                    <FaPhoneAlt
                      style={{
                        marginLeft: "2rem",
                        color: "#11bba3",
                        color: "green",
                      }}
                    ></FaPhoneAlt>
                    <span style={{ marginLeft: ".6rem" }}>
                      {booking?.phone || getUser().phone}
                    </span>
                  </span>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <p>
                    <FaMapMarkerAlt />
                    <small> {booking.address || getUser().address} </small>
                  </p>
                  <p>{heading?.message}</p>
                </Card.Title>
                <Card.Text>
                  <Table
                    className="text-center"
                    style={{ border: "none!important" }}
                  >
                    <thead className="text-table-title">
                      <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quatity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody
                      className="text-table-content"
                      style={{ verticalAlign: "middle" }}
                    >
                      {booking.carts?.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td
                              className=" d-flex justify-content-around p-5"
                              colSpan={2}
                            >
                              <a href={`/perfumes/${item.perfume.id}`}>
                                <CardImg
                                  width={4}
                                  height={4}
                                  src={item.perfume.image}
                                />
                              </a>
                            </td>
                            <td>{item.perfume.name}</td>
                            <td>
                              {item.perfume.price.toLocaleString()}
                              <b>
                                <u>
                                  <sup>đ</sup>
                                </u>
                              </b>
                            </td>
                            <td>{item?.quatity}</td>
                            <td>
                              {(
                                item.perfume.price * item.quatity
                              ).toLocaleString()}
                              <b>
                                <u>
                                  <sup>đ</sup>
                                </u>
                              </b>
                            </td>
                          </tr>
                        );
                      })}

                      <tr stype={{ border: "none" }}>
                        <td>Shipping Fee: </td>
                        <td colSpan={3}> </td>

                        <td>
                          {booking.method == "CASH" ? (11000).toLocaleString() : 0}{" "}
                          <sup>đ</sup>
                        </td>
                      </tr>

                      <tr stype={{ border: "none" }}>
                        <td>Total: </td>
                        <td colSpan={3}> </td>

                        <td>
                          <b style={{ fontSize: "1.1rem" }}>
                            {booking?.amount
                              ? booking.amount.toLocaleString()
                              : booking.amount}{" "}
                            <sup>đ</sup>
                          </b>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="display-center">
            <Card border="light" style={{ width: "40%", marginTop: "2rem" }}>
              <Card.Header>Delivery Method</Card.Header>
              <Card.Body>
                <Card.Title>
                  <Form>
                    <div key="radio" className="mb-3">
                      <Form.Check
                        label="Standard delivery"
                        checked
                        name="group1"
                        type="radio"
                        id="1"
                      />
                    </div>
                  </Form>
                </Card.Title>
              </Card.Body>
            </Card>

            <Card border="light" style={{ width: "30%", marginTop: "2rem" }}>
              <Card.Header>Payment Method</Card.Header>
              <Card.Body>
                <Card.Title>
                  <Form>
                    <div key="radio" className="mb-3">
                      <Form.Check
                        label={
                          booking?.method == "CASH"
                            ? "Cash on Delivery"
                            : "Credit/Debit Card"
                        }
                        checked
                        name="group1"
                        type="radio"
                        id="1"
                      />
                    </div>
                  </Form>
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div
            className="display-center"
            style={{ marginTop: "2rem", fontSize: "1.2rem", width: "50%" }}
          >
            <a href="/booking" style={{ color: "#fff" }}>
              {" "}
              <small>View other orders</small>
            </a>
          </div>
        </div>
      )}

      {/* <Avatar user={getUser()} logout={handleLogout}></Avatar> */}
    </Container>
  );
};

export default BookingDetails;
