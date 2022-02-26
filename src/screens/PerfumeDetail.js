import React, { useState, useEffect } from "react";
import { removeUserSession } from "../Utils/Common";
import {
  Heading,
  CardPerfumeDetail,
  Loading,
  Review,
  Pagination,
  Dialog,
} from "../components";
import { Container, Col, Row } from "react-bootstrap";
import { perfumeApi, reviewApi } from "../api";
import { Link } from "react-router-dom";
import DayJS from "react-dayjs";
import { BUTTONS } from "../constant";

const PerfumeDetail = ({ match, history }) => {
  const [perfumeDetails, setPerfumeDetails] = useState({});
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(false);
  const [mess, setMess] = useState("");
  const [show, setShow] = useState(false);

  const [searchKey, setSearchKey] = useState({
    page: 1,
    limit: 6,
    // search: "",
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
  }
  const updateShow = (getShow) => {
    setShow(getShow.show);
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      await perfumeApi.delete(perfumeDetails.id);
      setMess(`Perfume with id ${perfumeDetails.id} has been deleted`);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      typeof error.response.data.message == "object"
        ? setMess(`${error.response.data.message[0]}`)
        : setMess(`${error.response.data.message}`);
      console.log(error);
    }
  };

  const handleLogout = () => {
    removeUserSession();
    history.push("/login");
  };
  return (
    <Container fluid className="container">
      <Heading title={perfumeDetails.name}></Heading>
      {/* <Avatar user={getUser()} logout={handleLogout}></Avatar> */}
      {loading || !perfumeDetails.brand || !perfumeDetails.fragrance ? (
        <div className="d-flex justify-content-center">
          <Loading />
        </div>
      ) : (
        <Row className="details">
          <Col md="6" xs="12" className=" d-flex justify-content-end box">
            <CardPerfumeDetail perfume={perfumeDetails}></CardPerfumeDetail>
          </Col>

          <Col md="6" xs="12" className=" d-flex justify-content-start box">
            <div className="details-box">
              <div className="header-details">
                <h2> {perfumeDetails.name}</h2>
              </div>

              <div className="body-details">
                {/* <button
                  style={{
                    width: "60%",
                  }}
                  className="d-flex justify-content-center align-items-center btn btn-auth btn-light btn-outlight price-large"
                > */}
                <label>
                  <h2>
                    <b className="price">
                      {perfumeDetails?.price.toLocaleString()} đ
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
                <span className="text-nowrap"> {perfumeDetails.sex}</span>
                <br />
                <label> Origin: </label>
                <span className="text-nowrap"> {perfumeDetails.origin}</span>

                <br />
              </div>

              <div className="footer-details">
                <div
                  className="d-flex justify-content-around"
                  style={{ marginTop: "2rem" }}
                >
                  <Link
                    to={`/card`}
                    className="btn btn-outline-warning btn-outlight"
                    style={{
                      width: "46%",
                      backgroundColor: "dan",
                    }}
                  >
                    {BUTTONS("buyNow")}
                  </Link>

                  <button
                    onClick={() => {
                      setShow(true);
                    }}
                    className=" btn btn-outline-light btn-outlight"
                    style={{
                      width: "46%",
                    }}
                  >
                    {BUTTONS("addToCart")}
                  </button>

                  <Dialog
                    item={perfumeDetails}
                    isShow={show}
                    onSubmit={updateShow}
                  />
                </div>
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
      {/* <div>{perfumeDetails.title}</div> */}
    </Container>
  );
};

export default PerfumeDetail;
