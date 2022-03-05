import React, { useState, useEffect } from "react";
import { Heading, Pagination, Loading, ShippingAddress } from "../components";
import {
  Container,
  Table,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import { bookingApi } from "../api";
import DayJS from "react-dayjs";
import {
  FaSortAmountUp,
  FaSortAmountDown,
  FaPhoneAlt,
  FaCheckCircle,
  FaFilter,
} from "react-icons/fa";

const Admin = (props) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [searchKey, setSearchKey] = useState({
    page: 1,
    limit: 15,
    search: "",
    time: "",
    order: "time",
    sort: "DESC",
    status: "",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    totalRows: 0,
  });

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await bookingApi.getAllAdmin(searchKey);
        if (response.data.length == 0) setErr("No order");
        else setErr("");
        setBookings(response);
        setPagination(response.pagination);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // setErr(error.response.message);
      }
    };
    fetchBookings();
  }, [searchKey]);

  function handlePageChange(newPage) {
    setSearchKey({ ...searchKey, page: newPage });
  }

  return (
    <Container fluid>
      <Heading title="thống kê đơn hàng"></Heading>
      <div className="display-center" style={{ width: "100%" }}>
        <div style={{ margin: "2rem" }}>
          {" "}
          <a href="/admin/ana">
            <Button variant="primary">Thống kê đơn hàng</Button>
          </a>
        </div>
        <div style={{ margin: "2rem" }}>
          {" "}
          <a href="/admin/add">
            <Button variant="success">thêm sản phẩm mới</Button>
          </a>
        </div>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Loading />
        </div>
      ) : (
        <div>
          (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>#</th>
                {searchKey.sort == "DESC" ? (
                  <th
                    style={{ textAlign: "center" }}
                    onClick={() => {
                      setSearchKey({
                        ...searchKey,
                        order: "time",
                        sort: "ASC",
                      });
                    }}
                  >
                    <span>Time </span>
                    <FaSortAmountDown stype={{ marginLeft: "1rem" }} />
                  </th>
                ) : (
                  <th
                    style={{ textAlign: "center" }}
                    onClick={() => {
                      setSearchKey({
                        ...searchKey,
                        order: "time",
                        sort: "DESC",
                      });
                    }}
                  >
                    <span>Time </span>
                    <FaSortAmountUp stype={{ marginLeft: "1rem" }} />
                  </th>
                )}
                <th style={{ textAlign: "center" }}>Order Codes</th>
                <th
                  style={{ textAlign: "center" }}
                  onClick={() => {
                    searchKey?.status == "ORDERING"
                      ? setSearchKey({ ...searchKey, status: "ORDERED" })
                      : searchKey?.status == "ORDERED"
                      ? setSearchKey({ ...searchKey, status: "" })
                      : setSearchKey({ ...searchKey, status: "ORDERING" });
                  }}
                >
                  {" "}
                  <span>
                    Status
                    <FaFilter style={{ marginLeft: ".3rem" }} />
                  </span>
                </th>
                <th style={{ textAlign: "center" }}>Details</th>
                <th style={{ textAlign: "center" }}>
                  <FaPhoneAlt style={{ marginRight: ".2rem" }} />
                  Customer
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings?.data?.map((booking, i) => {
                return (
                  <tr>
                    <td style={{ textAlign: "center" }}>{i + 1}</td>
                    <td style={{ textAlign: "center" }}>
                      <DayJS format="YYYY-MM-DD HH:MM" className="text-nowrap">
                        {booking?.createdAt}
                      </DayJS>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <p> {booking.id}</p>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <div>
                        {booking?.status == "ORDERING" ? (
                          <button
                            className="btn btn-danger"
                            onClick={async () => {
                              try {
                                const up = await bookingApi.approveOrder(
                                  booking.id,
                                  searchKey
                                );
                                console.log({ up });
                                setBookings(up);
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            APPROVE NOW
                          </button>
                        ) : (
                          <span>
                            <FaCheckCircle
                              style={{ color: "green", marginRight: ".2rem" }}
                            />
                            APPROVED
                          </span>
                        )}
                      </div>
                    </td>
                    <td
                      style={{ textAlign: "center" }}
                      onClick={() => {
                        props.history.push(`/booking/${booking.id}`);
                      }}
                    >
                      <u>View Details</u>
                    </td>

                    <td
                      style={{ textAlign: "center" }}
                      onClick={() => {
                        props.history.push(`/booking/${booking.id}`);
                      }}
                    >
                      <span>{booking?.user?.phone}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
            search={searchKey}
          />
        </div>
      )}
    </Container>
  );
};

export default Admin;
