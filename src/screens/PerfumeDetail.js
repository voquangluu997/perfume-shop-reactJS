import React, { useState, useEffect } from "react";
import { getUser, removeUserSession } from "../Utils/Common";
import { Heading, Avatar, CardPerfumeDetail, Loading } from "../components";
import { Container, Col, Row } from "react-bootstrap";
import perfumeApi from "../api/perfumeApi";
import { Link } from "react-router-dom";
import DayJS from "react-dayjs";

const PerfumeDetail = ({ match, history }) => {
  const [perfumeDetails, setPerfumeDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [mess, setMess] = useState("");

  useEffect(() => {
    const fetchPerfumeDetails = async () => {
      setLoading(true);
      try {
        const response = await perfumeApi.getById(match.params.id);
        setPerfumeDetails(response);
        console.log(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMess(" failed to fetch perfume details");
      }
    };
    fetchPerfumeDetails();
  }, []);

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
        <div class="d-flex justify-content-center">
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
                {/* </button> */}
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
                <span> <DayJS format="MM-DD-YYYY" className="text-nowrap">
                    {perfumeDetails.publishYear}
                  </DayJS>
                </span>

                <br />
              </div>

              <div className="footer-details">
                {/* <div className="d-flex justify-content-center">
                  <button
                    style={{
                      width: "60%",
                    }}
                    className="d-flex justify-content-center align-items-center btn btn-auth btn-light btn-outlight"
                  >
                    Price :{perfumeDetails?.price}$
                  </button>
                </div> */}

                <div
                  className="d-flex justify-content-around"
                  style={{ marginTop: "2rem" }}
                >
                  <Link
                    to={`${perfumeDetails.id}/update`}
                    className=" btn btn-dark btn-outlight"
                    style={{
                      width: "46%",
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="btn btn-danger btn-outlight"
                    style={{
                      width: "46%",
                      backgroundColor: "dan",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Col>

          <div>
            {mess && mess == "Update password succesfuly" ? (
              <p className="mb-3 alert alert-success noti">{mess}</p>
            ) : (
              mess && <p className="mb-3 alert alert-danger noti">{mess}</p>
            )}
          </div>

          <div className="description">
            <h3> Description </h3>
            <div>
              <span>{perfumeDetails.about} </span>
            </div>
          </div>
        </Row>
      )}
      {/* <div>{perfumeDetails.title}</div> */}
    </Container>
  );
};

export default PerfumeDetail;
