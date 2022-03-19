import React, { useState, useEffect } from "react";
import {
  Heading,
  Pagination,
  Loading,
  CardImg,
  SearchBar,
} from "../components";
import { Container, Table, Button } from "react-bootstrap";
import { perfumeApi, bookingApi } from "../api";
import {
  FaSortAmountUp,
  FaSortAmountDown,
  FaPhoneAlt,
  FaCheckCircle,
  FaFilter,
  FaRegEdit,
  FaTrashAlt,
} from "react-icons/fa";

const AdminPerfume = (props) => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [searchKey, setSearchKey] = useState({
    page: 1,
    limit: 15,
  });

  const [info, setInfo] = useState({
    name: "",
    price: "",
    publishYear: "",
    sex: "",
    origin: "",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    totalRows: 0,
  });

  const handleFilterChange = (newFilters) => {
    setSearchKey({
      ...searchKey,
      ...{
        search: newFilters.searchText,
        page: 1,
      },
    });
  };

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
        console.log(response);
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
      {/* <SearchBar onSubmit={handleFilterChange}></SearchBar> */}
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
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>image</th>
                <th>name</th>
                <th>price</th>
                <th>publish year</th>
                <th>sex</th>
                <th>origin</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {perfumes?.data?.map((item, i) => {
                return (
                  <tr>
                    <td style={{ textAlign: "center" }}>{i + 1}</td>
                    <td className="display-center">
                      <CardImg width={3} height={3} src={item.image}></CardImg>
                    </td>
                    <td style={{ textAlign: "center" }}>{item.name}</td>
                    <td style={{ textAlign: "center" }}>
                      {`${item.price.toLocaleString()}`} <sup>đ</sup>
                    </td>
                    <td style={{ textAlign: "center" }}>{item.publishYear}</td>
                    <td style={{ textAlign: "center" }}>{item.sex}</td>
                    <td style={{ textAlign: "center" }}> {item.origin}</td>
                    <td>
                      <div style={{ textAlign: "center" }}>
                        <FaRegEdit
                          style={{ margin: "0 3px", color: "#198754" }}
                        ></FaRegEdit>
                        <FaTrashAlt
                          style={{ margin: "0 3px", color: "#E91E63" }}
                          onclick={async () => {
                            try {
                              await perfumeApi.delete(item.id);
                              alert(
                                `Product with id ${item.id} has been deleted`
                              );
                            } catch (error) {
                              alert("Delete failed, please try it later");
                            }
                          }}
                        ></FaTrashAlt>
                      </div>
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

export default AdminPerfume;
