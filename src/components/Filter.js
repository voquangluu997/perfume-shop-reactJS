import React, { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { brandApi, fragranceApi, perfumeApi } from "../api";

const Filter = ({ onSubmit }) => {
  const [brands, setBrands] = useState([]);
  const [fragrances, setFragrances] = useState([]);
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const br = await brandApi.getAll();
        const fr = await fragranceApi.getAll();
        setBrands(br.data);
        setFragrances(fr.data);
      } catch (error) {}
    };

    getBrands();
  }, []);

  return (
    <div>
      <Card style={{ width: "100%", maxHeight: "220px" }}>
        <Card.Header style={{ backgroundColor: "#11bba3" }}>
          <b>Shop by Brand</b>
        </Card.Header>
        <ListGroup variant="flush" className="filter">
          {brands?.map((item) => {
            return (
              <ListGroup.Item className="filter-link">
                <Card.Link
                  onClick={async () => {
                    const perfume = await perfumeApi.getAll({
                      brand: item?.name,
                    });
                    onSubmit({ perfume });
                  }}
                  style={{ color: "#000" }}
                  href={`localhost://3000`}
                >
                  {item?.name}
                </Card.Link>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>

      <Card style={{ width: "100%", maxHeight: "220px" }}>
        <Card.Header style={{ backgroundColor: "#11bba3" }}>
          <b>Shop by Fragrance</b>
        </Card.Header>
        <ListGroup variant="flush" className="filter">
          {fragrances?.map((item) => {
            return (
              <ListGroup.Item className="filter-link">
                <Card.Link
                  href="#"
                  style={{ color: "#000" }}
                  onClick={async () => {
                    const perfume = await perfumeApi.getAll({
                      fragrance: item?.name,
                    });
                    onSubmit({ perfume });
                  }}
                  style={{ color: "#000" }}
                  href={`localhost://3000`}
                >
                  {item?.name}
                </Card.Link>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>

      <Card style={{ width: "100%", maxHeight: "200px" }}>
        <Card.Header style={{ backgroundColor: "#11bba3" }}>
          <b>Shop by Price</b>
        </Card.Header>
        <ListGroup variant="flush" className="filter">
          <ListGroup.Item className="filter-link">
            <Card.Link href="#" style={{ color: "#000" }}>
              {`< ${(2000000).toLocaleString()}`}
              <sup>đ</sup>
            </Card.Link>
          </ListGroup.Item>

          <ListGroup.Item className="filter-link">
            <Card.Link href="#" style={{ color: "#000" }}>
              <p>
                {`${(2).toLocaleString()}`}
                {`-${(4000000).toLocaleString()}`}
                <sup>đ</sup>{" "}
              </p>
            </Card.Link>
          </ListGroup.Item>
          <ListGroup.Item className="filter-link">
            <Card.Link href="#" style={{ color: "#000" }}>
              {`>${(4000000).toLocaleString()}`}
              <sup>đ</sup>
            </Card.Link>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default Filter;
