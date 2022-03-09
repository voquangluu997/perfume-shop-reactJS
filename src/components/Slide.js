import { Table, Card, Carousel } from "react-bootstrap";

const Slide = () => {
  return (
    <Carousel >
      <Carousel.Item>
        <a href="#">
          <img className="d-block w-100" src="/km.jpg" alt="Second slide" />
        </a>
      </Carousel.Item>

      <Carousel.Item>
        <a href="#">
          <img className="d-block w-100" src="/km.jpg" alt="Second slide" />
        </a>
      </Carousel.Item>
      <Carousel.Item>
        <a href="#">
          <img className="d-block w-100" src="/km.jpg" alt="Second slide" />
        </a>
      </Carousel.Item>
      <Carousel.Item>
        <a href="#">
          <img className="d-block w-100" src="/km.jpg" alt="Second slide" />
        </a>
      </Carousel.Item>
    </Carousel>
  );
};
export default Slide;
