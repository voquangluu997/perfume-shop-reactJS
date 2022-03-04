import { Table, Card, Form } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import { CardImg } from "../components";
import { useState } from "react";

const CardList = ({ items }) => {
  const [quatity, setQuatity] = useState(null);
  const handleDelete = async () => {};

  return (
    <Table className="text-center" style={{ border: "none!important" }}>
      <thead className="text-table-title">
        <tr>
          <th>Product</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quatity</th>
          <th>Total</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody className="text-table-content" style={{ verticalAlign: "middle" }}>
        {items?.map((item, i) => {
          return (
            <tr key={i}>
              <td className=" d-flex justify-content-around p-5" colSpan={2}>
                <CardImg width={4} height={4} src={item.perfume.image} />
              </td>
              <td>{item.perfume.name}</td>
              <td>
                {item.perfume.price.toLocaleString()}
                <b>
                  <u>
                    <sup>đ</sup>
                  </u>
                </b>
              </td>
              <td>
                <Form.Control
                  type="email"
                  value={quatity}
                  className=" td-input text-center btn btn-outline-light"
                  onChange={(e) => setQuatity(e.target.value)}
                />
              </td>
              <td>
                {(item.perfume.price * item.quatity).toLocaleString()}
                <b>
                  <u>
                    <sup>đ</sup>
                  </u>
                </b>
              </td>
              <td>
                <FaRegTrashAlt onClick={handleDelete} />{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
export default CardList;
