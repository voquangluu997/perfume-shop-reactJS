import React, { useState, useEffect } from "react";
import { removeUserSession, getUser } from "../Utils/Common";
import {
  Heading,
  PerfumeItem,
  // Avatar,
  Pagination,
  SearchBar,
  Loading,
  Filter,
  StarAvg,
} from "../components";
import { Container, Row, Col } from "react-bootstrap";
import perfumeApi from "../api/perfumeApi";

const Home = (props) => {
  const [perfumeList, setPerfumeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [mess, setMess] = useState(null);
  const [reviews, setReviews] = useState([]);
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

  const handleFilter = async (perfumes) => {
    setPerfumeList(perfumes.perfume.data);
    setPagination(perfumes.perfume.pagination);
    setReviews(perfumes.perfume.reviews);
  };

  useEffect(() => {
    if (props.history.location.state) {
      if (props.history.location.state.perfume) {
        const pf = props.history.location.state.perfume;
        setPerfumeList(pf.data);
        setPagination(pf.pagination);
        setReviews(pf.reviews);
      }
      if (props.history.location.state.searchText) {
        let sk = searchKey;
        sk = { ...sk, search: props.history.location.state.searchText };
        setSearchKey(sk);
      }
    }
    const fetchPerfumeList = async () => {
      setLoading(true);
      try {
        const response = await perfumeApi.getAll(searchKey);
        const { data, pagination, reviews } = response;
        if (data.length == 0)
          setErr(`Search result for key: "${searchKey.search}" Not found `);
        else setErr("");
        setPerfumeList(data);
        setPagination(pagination);
        setReviews(reviews);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErr("Something went wrong, Please try it later");
      }
    };
    fetchPerfumeList();
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
    });
  };

  return (
    <Container fluid>
      <Heading title="LV PERFUME SHOP"></Heading>
      <SearchBar onSubmit={handleFilterChange}></SearchBar>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Loading />
        </div>
      ) : (
        <Row>
          <Col sm={2}>
            <Filter onSubmit={handleFilter} />
          </Col>
          <Col sm={10}>
            <Row className="d-flex justify-content-center">
              <span
                style={{
                  marginBottom: "10px",
                  fontWeight: "800",
                  marginLeft: "3rem",
                }}
              >
                {searchKey?.search ? (
                  <p
                    style={{ fontSize: "1.2rem" }}
                  >{`Search result for key: "${searchKey.search}": `}</p>
                ) : (
                  ""
                )}
                Total matched: {perfumeList?.length}
              </span>

              {perfumeList?.map((perfume, i) => {
                return (
                  <Col
                    lg="3"
                    md="6"
                    className="d-flex justify-content-center"
                    key={i}
                  >
                    <PerfumeItem
                      perfume={perfume}
                      reviews={reviews[i]}
                    ></PerfumeItem>
                  </Col>
                );
              })}
              {err && <p className="mb-3 alert alert-danger noti">{err}</p>}
            </Row>
            <div style={{ marginTop: "3.5rem" }}>
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
                search={searchKey}
              ></Pagination>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;
