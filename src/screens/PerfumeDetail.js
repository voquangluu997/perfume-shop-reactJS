import React, { useState, useEffect } from "react";
import { removeUserSession } from "../Utils/Common";
import {
  Heading,
  CardPerfumeDetail,
  Loading,
  Review,
  Pagination,
  Dialog,
  Filter,
  SearchBar,
} from "../components";
import { Container, Col, Row } from "react-bootstrap";
import { perfumeApi, reviewApi, cartApi } from "../api";
import DayJS from "react-dayjs";
import { BUTTONS, CART_ERRORS } from "../constant";
import { FaShoppingCart, FaCheckCircle, FaPhoneAlt } from "react-icons/fa";

const PerfumeDetail = ({ match, history }) => {
  const [perfumeDetails, setPerfumeDetails] = useState({});
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(false);
  const [mess, setMess] = useState("");
  const [show, setShow] = useState(false);

  const [searchKey, setSearchKey] = useState({
    page: 1,
    limit: 6,
    search: "",
  });

  const handleFilterChange = (newFilters) => {
    history.push({
      pathname: "/",
      state: { searchText: newFilters.searchText },
    });
  };

  const [searchChild, setSearchChild] = useState({
    // category: "", author: ""
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 0,
  });

  useEffect(() => {
    const fetchPerfumeDetails = async () => {
      setLoading(true);
      try {
        const response = await perfumeApi.getById(match.params.id);
        const listReview = await reviewApi.getAll(match.params.id, searchKey);
        setPerfumeDetails(response);
        setReviews(listReview);
        setPagination(listReview.pagination);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMess(" failed to fetch perfume details");
      }
    };
    fetchPerfumeDetails();
  }, [searchKey]);

  function handlePageChange(newPage) {
    setSearchKey({ ...searchKey, page: newPage });

    const handleSearchChildChange = (filters) => {
      setSearchChild({
        ...searchChild,
      });
    };
  }
  const updateShow = (getShow) => {
    setShow(getShow.show);
  };

  const handleBuyNow = async () => {
    try {
      await cartApi.add({
        perfumeId: match.params.id,
        quatity: 1,
      });
      history.push("/cart");
      window.location.reload();
    } catch (error) {
      alert(CART_ERRORS(error.response.data.message));
    }
  };

  const handleAddToCart = async () => {
    try {
      await cartApi.add({
        perfumeId: match.params.id,
        quatity: 1,
      });
      setShow(true);
    } catch (error) {
      console.log(error.response.data);
      alert(CART_ERRORS(error.response.data.message));
    }
  };

  const handleFilter = (data) => {
    const perfume = data.perfume;
    history.push({
      pathname: "/",
      state: {
        perfume,
      },
    });
  };

  return (
    <Container className="container">
      <SearchBar onSubmit={handleFilterChange}></SearchBar>
      {loading || !perfumeDetails.brand || !perfumeDetails.fragrance ? (
        <div className="d-flex justify-content-center">
          <Loading />
        </div>
      ) : (
        <Row className="details">
          <Col md={2} style={{ marginTop: "-10rem" }}>
            <Filter onSubmit={handleFilter} />
          </Col>
          <Col md={4} xs="12" className=" d-flex justify-content-end box">
            <CardPerfumeDetail perfume={perfumeDetails}></CardPerfumeDetail>
          </Col>

          <Col md="6" xs="12" className=" d-flex justify-content-start box">
            <div className="details-box">
              <div className="header-details">
                <h2> {perfumeDetails.name}</h2>
              </div>

              <div className="body-details">
                <label>
                  <h2 className="display-around">
                    <b
                      className="price"
                      style={{ color: "#fff", marginRight: "1.4rem" }}
                    >
                      {perfumeDetails?.price.toLocaleString()} <sup>đ</sup>
                    </b>

                    <b className="price">
                      <del>
                        {(perfumeDetails?.price * 1.05).toLocaleString()}{" "}
                      </del>
                      <sup>đ</sup>
                    </b>
                  </h2>
                </label>
                <br></br>
                <label> Brand: </label>
                <span className="text-nowrap">
                  {" "}
                  {perfumeDetails.brand.name}
                </span>
                <br />
                <label> Fragrance: </label>
                <span className="text-nowrap">
                  {" "}
                  {perfumeDetails.fragrance.name}
                </span>
                <br />
                <label> Publish year:</label>
                <span>
                  {" "}
                  <DayJS format="YYYY" className="text-nowrap">
                    {perfumeDetails.publishYear}
                  </DayJS>
                </span>
                <br />

                <label> Sex: </label>
                <span className="text-nowrap">
                  {" "}
                  {perfumeDetails.sex || "Men"}
                </span>
                <br />
                <label> Origin: </label>
                <span className="text-nowrap">
                  {" "}
                  {perfumeDetails.origin || "Fench"}
                </span>

                <br />
              </div>

              <div className="footer-details">
                <div
                  className="d-flex justify-content-around"
                  style={{ marginTop: "2rem" }}
                >
                  <button
                    onClick={handleBuyNow}
                    className="btn btn-outline-warning btn-outlight"
                    style={{
                      width: "46%",
                      backgroundColor: "dan",
                    }}
                  >
                    {BUTTONS("buyNow")}
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className=" btn btn-outline-light btn-outlight"
                    style={{
                      width: "46%",
                    }}
                  >
                    <div className="display-center">
                      <FaShoppingCart style={{ marginRight: ".5rem" }} />
                      {BUTTONS("addToCart")}{" "}
                    </div>
                  </button>

                  <Dialog
                    item={perfumeDetails}
                    isShow={show}
                    onSubmit={updateShow}
                  />
                </div>
              </div>
              <div style={{ marginTop: "rem", fontSize: ".5rem" }}>
                {/* <span>
                  <FaCheckCircle
                    style={{ color: "green", marginRight: ".5rem" }}
                  />
                  Free return in 7 days see details
                </span>
                <br></br>
                <span>
                  <FaCheckCircle
                    style={{ color: "green", marginRight: ".5rem" }}
                  />
                  Check the goods before receiving
                </span> */}
                {/* <br /> */}
                {/* <span>
                 
                  <FaPhoneAlt style={{ marginRight: ".5rem" }} />
                  <span>
                    <u style={{ color: "yellow" }}>033.5963.824 </u>to supported{" "}
                  </span>
                </span> */}
              </div>
            </div>
          </Col>

          <div className="border-white-box">
            <h3> Description </h3>
            <div>
              <span>{perfumeDetails.about} </span>
            </div>
          </div>
          <Review listReview={reviews} searchKey={searchKey} />
          <Pagination
            className="mt-4"
            pagination={pagination}
            onPageChange={handlePageChange}
            search={searchKey}
          ></Pagination>
        </Row>
      )}
    </Container>
  );
};

export default PerfumeDetail;
