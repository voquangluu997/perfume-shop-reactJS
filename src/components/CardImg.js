import { Table, Card } from "react-bootstrap";

const CardImg = ({ width, height, src }) => {
  return (
    <Card
      style={{
        width: `${width}rem`,
        border: "none",
        height: `${height}rem`,
      }}
    >
      <Card.Img
        variant="top"
        src={src}
        className="perfume-cover get-shadow display-center"
      />
    </Card>
  );
};
export default CardImg;
