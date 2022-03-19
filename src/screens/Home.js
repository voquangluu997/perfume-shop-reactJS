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
  Slide,
} from "../components";
import { Container, Row, Col } from "react-bootstrap";
import perfumeApi from "../api/perfumeApi";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

const Home = (props) => {
  const [perfumeList, setPerfumeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [mess, setMess] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [searchKey, setSearchKey] = useState({
    page: "1",
    limit: "15",
    order: "",
    sort: "ASC",
    // search: "",
  });
  const [searchChild, setSearchChild] = useState({});
  const [pagination, setPagination] = useState({
    page: "1",
    limit: "15",
    totalRows: 0,
  });
  const [up, setUp] = useState(false);

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
    <div>
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
              <div
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

                <span style={{ marginRight: "2rem" }}>
                  {" "}
                  Total matched: {perfumeList?.length}
                </span>
                <button
                  className="btn btn-outline-light btn-medium "
                  onClick={() => {
                    if (up == false){
                      setSearchKey({
                        ...searchKey,
                        order: "price",
                        sort: "ASC",
                      });
                      setUp(true);
                    }
                     
                    else{setSearchKey({
                      ...searchKey,
                      order: "price",
                      sort: "DESC",
                    });
                    setUp(false)

                    }
                      
                  }}
                >
                  Price 
                  {searchKey.order == "price" && searchKey.sort == "ASC" ? (
                    <FaSortAmountDownAlt style = {{marginLeft:"7px"}}/>
                  ) : (
                    <FaSortAmountUpAlt style = {{marginLeft:"7px"}} />
                  )}
                </button>
              </div>

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
            <div style={{ marginTop: "-0.5rem" }}>
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
                search={searchKey}
              ></Pagination>
            </div>
          </Col>
        </Row>
      )}

      <Row style={{ marginTop: "2.5rem" }}>
        <Col sm={2}></Col>
        <Col sm={10}>
          <Heading title="recommend for you" />
          <Row className="d-flex justify-content-center">
            <span
              style={{
                marginTop: "10px",
              }}
            ></span>

            {perfumeList?.map((perfume, i) => {
              let j = perfumeList?.length - i - 1;
              if (i > 2)
                return (
                  <Col
                    lg="3"
                    md="6"
                    className="d-flex justify-content-center"
                    key={j}
                  >
                    <PerfumeItem
                      perfume={perfumeList[j]}
                      reviews={reviews[j]}
                    ></PerfumeItem>
                  </Col>
                );
            })}
            {err && <p className="mb-3 alert alert-danger noti">{err}</p>}
          </Row>
          <div style={{}}>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
              // search={searchKey}
            ></Pagination>
          </div>
        </Col>
      </Row>

      {/* <Slide /> */}
    </div>
  );
};

export default Home;
