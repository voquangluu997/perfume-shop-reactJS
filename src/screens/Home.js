import React, { useState, useEffect } from "react";
import { removeUserSession, getUser } from "../Utils/Common";
import {
  Heading,
  PerfumeItem,
  // Avatar,
  Pagination,
  SearchBar,
  Loading,
} from "../components";
import { Container, Row, Col } from "react-bootstrap";
import perfumeApi from "../api/perfumeApi";

const Home = (props) => {
  
  const [perfumeList, setPerfumeList] = useState([]);
  const [loading, setLoading] = useState(false);
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
    const fetchPerfumeList = async () => {
      setLoading(true);
      try {
        const response = await perfumeApi.getAll(searchKey);
        const { data } = response;
        if (data.length == 0)
          setErr("Oops! Perfumes not found, Please try it again");
        else setErr("");
        setPerfumeList(data);
        setPagination(response.pagination);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErr(error.response.message);
      }
    };
    fetchPerfumeList();
  }, [searchKey]);

  function handlePageChange(newPage) {
    setSearchKey({ ...searchKey, page: newPage });
  }

  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  const handleSearchChildChange = (filters) => {
    setSearchChild({
      ...searchChild,
      // ...{ category: filters.category, author: filters.author },
    });
  };

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
      <Heading title="perfumes"></Heading>
      <div>
        {/* <SearchChild onSubmit={handleSearchChildChange} /> */}
        <SearchBar onSubmit={handleFilterChange}></SearchBar>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Loading />
        </div>
      ) : (
        <Row className="d-flex justify-content-center">
          <span style={{ marginBottom: "10px", fontWeight: "600" }}>
            Total matched: {pagination.totalRows}
          </span>
          {perfumeList?.map((perfume, i) => {
            return (
              <Col
                lg="3"
                md="6"
                className="d-flex justify-content-center"
                key={i}
              >
                <PerfumeItem perfume={perfume}></PerfumeItem>
              </Col>
            );
          })}
          {err && <p className="mb-3 alert alert-danger noti">{err}</p>}
          <Pagination
            className="mt-4"
            pagination={pagination}
            onPageChange={handlePageChange}
            search={searchKey}
          ></Pagination>
        </Row>
      )}

      {/* <Avatar user={getUser()} logout={handleLogout}></Avatar> */}
    </Container>
  );
};

export default Home;
