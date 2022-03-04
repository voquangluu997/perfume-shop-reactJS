import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import { Heading } from ".";
import { FaPhoneAlt, FaEnvelope, FaInternetExplorer } from "react-icons/fa";

const Footer = () => {
  return (
    <Container fluid className="contact" id="contact">
      <div className="heading-underline-long"></div>
      <Container fluid className="text-center contact-child">
        {/* <Heading title="contact me" /> */}
        <p>
          <b>60 Ngo Sy Lien,Hoa Khanh Bac, Lien Chieu district, Da Nang city</b>{" "}
        </p>
        <Row className="row container-fluid">
          <Col className="custom-contact">
            <p>
              <h3 style={{ color: "#fff" }}>THÔNG TIN</h3>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Về LV perfume shop
              </a>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Quy chế hoạt động
              </a>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Liên hệ
              </a>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Gửi yêu cầu hỗ trợ
              </a>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Hợp tác với chúng tôi
              </a>
            </p>
            <FaPhoneAlt /> <p>033 5963 824</p>
          </Col>

          <Col className="custom-contact">
            <p>
              <h3 style={{ color: "#fff" }}>CÂU HỎI THƯỜNG GẶP</h3>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Chính sách bán hàng
              </a>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Chính sách bảo hành
              </a>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Chính sách đổi trả và hoàn tiền
              </a>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Chính sách thanh toán
              </a>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Chính sách bảo mật và chia sẻ thông tin
              </a>
            </p>
            <FaEnvelope />
            <p>
              <a href="mailto:voquangluu997@gmail.com" className="text-white">
                voquangluu997@gmail.com
              </a>
            </p>
          </Col>

          <Col>
            <p>
              <h3 style={{ color: "#fff" }}>DỊCH VỤ KHÁCH HÀNG</h3>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Hotline
              </a>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Văn phòng đại diện
              </a>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Chính sách đổi trả và hoàn tiền
              </a>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Tổng đài{" "}
              </a>
            </p>
            <p>
              <a href="#" style={{ fontSize: "1rem", color: "#fff" }}>
                Mã số thuế
              </a>
            </p>
            <FaInternetExplorer />
            <p>
              <a
                target="_blank"
                href="https://voquangluu997.github.io/my_resume/"
                className="text-white"
              >
                voquangluu997.github.io/my_resume
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
