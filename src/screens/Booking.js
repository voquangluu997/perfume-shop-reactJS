import React, { useState, useEffect } from "react";
import { Heading, Pagination } from "../components";
import { Container, Table, DropdownButton, Dropdown } from "react-bootstrap";
import { bookingApi } from "../api";
import DayJS from "react-dayjs";

const Booking = (props) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [searchKey, setSearchKey] = useState({
    page: 1,
    limit: 20,
    search: "",
    // category: "",
    // author: "",
    // sort: "ASC",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    totalRows: 0,
  });

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await bookingApi.getAll(searchKey);
        if (response.data.length == 0) setErr("No order");
        else setErr("");
        setBookings(response);
        setPagination(response.pagination);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErr(error.response.message);
      }
    };
    fetchBookings();
  }, [searchKey]);

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
      <Heading title="MY ORDERS "></Heading>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>
              <DropdownButton
                variant="light"
                id="dropdown-basic-button"
                title="Order filter"
                className="display-center"
              >
                <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                <Dropdown.Item href="#/action-2">To Reveice</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Completed</Dropdown.Item>
              </DropdownButton>
            </th>
            <th style={{ textAlign: "center" }}> Time</th>
            <th colSpan={2} style={{ textAlign: "center" }}>
              Order Codes
            </th>

            <th style={{ textAlign: "center" }}> Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.data?.map((booking, i) => {
            return (
              <tr
                onClick={() => {
                  props.history.push(`/booking/${booking.id}`);
                }}
              >
                <td style={{ textAlign: "center" }}>{i + 1}</td>
                <td style={{ textAlign: "center" }}>
                  <DayJS format="YYYY-MM-DD HH:MM" className="text-nowrap">
                    {booking?.createdAt}
                  </DayJS>
                </td>

                <td colSpan={2} style={{ textAlign: "center" }}>
                  <p> {booking.id}</p>
                </td>

                <td style={{ textAlign: "center" }}>
                  <p>
                    {" "}
                    {booking?.status == "ORDERING" ? "PENDING" : "COMPLETED"}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination pagination={pagination} />
    </Container>
  );
};

export default Booking;
