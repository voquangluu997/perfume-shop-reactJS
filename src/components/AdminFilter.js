import React, { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { brandApi, fragranceApi, perfumeApi } from "../api";

const AdminFilter = ({ onSubmit }) => {
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
          <ListGroup.Item className="filter-link">
            <Card.Link style={{ color: "#000" }} href={`localhost://3000`}>
              allllllllll
            </Card.Link>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default AdminFilter;
