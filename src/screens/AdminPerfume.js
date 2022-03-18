import React, { useState, useEffect } from "react";
import { Heading, Pagination, Loading, ShippingAddress } from "../components";
import {
  Container,
  Table,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import { perfumeApi, bookingApi } from "../api";
import DayJS from "react-dayjs";
import {
  FaSortAmountUp,
  FaSortAmountDown,
  FaPhoneAlt,
  FaCheckCircle,
  FaFilter,
} from "react-icons/fa";

const AdminPerfume = (props) => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [searchKey, setSearchKey] = useState({
    page: 1,
    limit: 15,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    totalRows: 0,
  });

  useEffect(() => {
    const fetchPerfumes = async () => {
      setLoading(true);
      try {
        const response = await perfumeApi.getAll(searchKey);
        if (response.data.length == 0) setErr("No product");
        else setErr("");
        setPerfumes(response);
        setPagination(response.pagination);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // setErr(error.response.message);
      }
    };
    fetchPerfumes();
  }, [searchKey]);

  function handlePageChange(newPage) {
    setSearchKey({ ...searchKey, page: newPage });
  }

  return (
    <Container fluid>
      <Heading title="Quản lý sản phẩm"></Heading>
      <div className="display-center" style={{ width: "100%" }}>
        <div style={{ margin: "2rem" }}>
          {" "}
          <a href="/admin/ana">
            <Button variant="primary">Thống kê đơn hàng</Button>
          </a>
        </div>
        <div style={{ margin: "2rem" }}>
          {" "}
          <a href="/admin/perfume">
            <Button variant="success">Quản lý sản phẩm</Button>
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
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
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

export default AdminPerfume;
