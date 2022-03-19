import React, { useState, useEffect } from "react";
import { Heading, ShippingAddress } from "../components";
import { cartApi } from "../api";
import { CART_MESSAGES, CART_ERRORS } from "../constant";
import { Table, Card, Form, Container } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import { CardImg, Loading } from "../components";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [err, setErr] = useState(null);
  const [quatity, setQuatity] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [isChangeQuatity, setIsChangeQuatity] = useState(false);
  const [shippingF, setShippingF] = useState(11000);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 0,
  });
  const [searchKey, setSearchKey] = useState({
    page: 1,
    limit: 6,
    search: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await cartApi.getAll(searchKey);
        const { data } = response;
        if (data.length == 0) setErr(CART_MESSAGES("cartEmpty"));
        let currQuatity = quatity;
        data.forEach((dt) => {
          currQuatity = [...currQuatity, dt.quatity];
          setQuatity(currQuatity);
        });
        setCart(data);
        setFinalPrice(response.totalPrice);
        setPagination(response.pagination);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        // setErr(CART_ERRORS(error.response.message));
      }
    };
    fetchCart();
  }, [searchKey, isChangeQuatity]);

  const handleSubmit = () => {
    let isUpdate = isChangeQuatity;
    setIsChangeQuatity(!isUpdate);
  };

  return (
    <Container fluid>
      <Heading title="CART"></Heading>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Loading />
        </div>
      ) : (
        <div>
          {cart.length < 1 ? (
            <div className="display-center" style={{ margin: " 5rem" }}>
              <Card border="light" style={{ width: "50%", marginTop: "2rem" }}>
                <Card.Header>Your cart is empty ! </Card.Header>
                <Card.Body>
                  <Card.Title>
                    <a href="/" style={{ color: "#fff" }}>
                      {" "}
                      Let's add your first product to your cart
                    </a>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          ) : (
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
              <tbody
                className="text-table-content"
                style={{ verticalAlign: "middle" }}
              >
                {cart?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td
                        className=" d-flex justify-content-around p-5"
                        colSpan={2}
                      >
                        <CardImg
                          width={4}
                          height={4}
                          src={item.perfume.image}
                        />
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
                        <input
                          type="number"
                          value={quatity[i]}
                          className=" td-input text-center btn btn-outline-light"
                          onChange={async (e) => {
                            setQuatity([
                              ...quatity.slice(0, i),
                              e.target.value,
                              ...quatity.slice(i + 1),
                            ]);

                            const update = await cartApi.update({
                              perfumeId: item.perfume.id,
                              quatity: +e.target.value,
                            });
                            const isChange = isChangeQuatity;
                            setIsChangeQuatity(!isChange);
                          }}
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
                        <FaRegTrashAlt
                          onClick={async () => {
                            try {
                              await cartApi.delete(item.id);
                              const isChange = isChangeQuatity;
                              setIsChangeQuatity(!isChange);
                              window.location.reload();
                            } catch (error) {
                              alert(CART_ERRORS(error));
                            }
                          }}
                          className="btn-remove"
                        />{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
          <ShippingAddress
            cart={cart}
            finalPrice={finalPrice}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </Container>
  );
};

export default Cart;
