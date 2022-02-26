import { Table, Card } from "react-bootstrap";
import { CardImg } from "../components";

const CartItem = ({ item }) => {
  return (
    <Table striped hover>
      <thead>
        <tr className="display-center">
          <th>
            <CardImg width={4} height={4} src={item.image} />
          </th>
          <th className="display-center" style={{ height: "5rem" }}>
            {item.name}
          </th>
          <th style={{ height: "5rem" }} className="display-center">
            {item.price}Đ
          </th>
        </tr>
      </thead>
    </Table>
  );
};
export default CartItem;
