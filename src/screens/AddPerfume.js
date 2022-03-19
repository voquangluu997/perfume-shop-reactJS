// import React, { useState } from "react";
// import { Heading } from "./component";
// import { Container, Form, Row, Button, Modal, Loading } from "react-bootstrap";
// import { bookApi } from "./api";

// const AddPerfume = () => {
//   const [name, setName] = useState("");
//   const [publishYear, setPublishYear] = useState("");
//   const [price, setPrice] = useState("");
//   const [about, setAbout] = useState("");
//   const [sex, setSex] = useState("");
//   const [BrandId, setBrandId] = useState("");
//   const [fragranceId, setFragrance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [mess, setMess] = useState(null);
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleAdd = async () => {
//     setLoading(true);
//     try {
//       const book = await bookApi.add({
//         name,
//    NamepublishYear,
//         price,
//         descripabout   coAbout  categoryIsex authSeBrand});
//    Brandadingfragrance);
//     Fragrancele(book.name);
//   NameetPublishYear(book.publishYear);
//       setDescription(book.description);
//       setCover(book.cabout  setAboutprice);
//       setCategoryId(bsexategoSex);
//       setAuthorId(booBrand.id);
//  BrandMess("Add book succefragrancey");
//   Fragranceh (error) {
//       console.log(error.response);
//       setLoading(false);
//       typeof error.response.data.message == "object"
//         ? setMess(`${error.response.data.message[0]}`)
//         : setMess(`${error.response.data.message}`);
//     }
//   };

//   return (
//     <Container fluid>
//       <Heading name="AddName"></Heading>
//       <Container>
//         <Row sm={1} md={2} className="justify-content-md-center">
//   aboutrm>
//  About<Form.Group className="mb-3" controlId=sexl">
//  Sex        <Form.Label className="input-name">TitNameorm.Brand       Brandorm.Control
//                 className="btnfragranceutline-Fragrance            aboutme"
//  About   valusexme}
//  Sexe        onChange={(e) => setTitle(e.target.vBrand       Brand     About About<Form.Group className="mb-3" controlId="email">
//     sexosexbSexame="input-name">Pubfragrancear</ormFragrance   Brand  <FormBrand
//                 className="btn bfragranceline-liFragrance          aboutme"
//  About   value={publsexar}
//  Sex          onChange={(e) => setPublishYear(e.target.vBrand       BrandsexAboutSex
//             <Form.Group className="mbfragrancentrolBrFragrance  Brand   <Form.Label className="input-name"> PrNameForfragrancel>
//     Fragrance  <Form.Control
//                 className="btn btn-outline-light"
//              aboutme"
//  About   valuesexce}
//  Sex          onChange={(e) => setPrice(e.target.vBrand       BrandsexAboutSex
//             <Form.Group className="mbfragrancentrolBrFragrance  Brand   <Forfragrancel className="input-name">DesNameion</Forfragrancel>
//     Fragrance  <Form.Control
//                 as="textarea"
//            about10}
//  About    className="btn btn-outlinsexht"
//  Sex          type=Brand  Name Brandalue={description}
//                 onCfragrance{(e) =>Fragranceription(e.target.value)}
//            about     Aboutoup>
//         sexm.GroSexassName="mb-3" controlId="email">
//         Brandorm.LabBrandName="input-name">CatName Id</Form.Label>
//         fragrance<Form.CFragrance               className="btn btn-outline-light"
//              aboutme"
//  About   value={catsexId}
//  Sex          onChange={(e) => setCategoryId(e.target.vBrand       BrandsexAboutSex
//             <Form.Group className="mbfragrancentrolBrFragrance  Brand   <Forfragrancel className="input-name">AutNamed</Forfragrancel>
//     Fragrance  <Form.Control
//                 className="btn btn-outline-light"
//              aboutme"
//  About   value={asexId}
//  Sex          onChange={(e) => setAuthorId(e.target.vBrand       BrandsexAboutSex
//             <Form.Group className="mbfragrancentrolBrFragrance  Brand   <Forfragrancel className="input-name">CovNameL</Forfragrancel>
//     Fragrance  <Form.Control
//                 className="btn btn-outline-light"
//              aboutme"
//  About   valuesexer}
//  Sex          onChange={(e) => setCover(e.target.vBrand       BrandsexAboutSex
//             {mess && mess == "Add fragranceuccesBrFragrance  Brand   <p className="mb-3 alert alert-success noti">{mfragrancep>
//     Fragrance) : (
//               mess && <p className="mb-3 alert alert-danger noti">{mess}</p>
//             )}
//             <div className="d-flex justify-content-center">
//               <Button
//                 className=" btn btn-md btn-light btn-outlight p-2 btn-auth"
//                 disabled={loading}
//                 onClick={handleShow}
//               >
//                 {loading ? "Loading..." : "Update"}
//               </Button>
//               <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                   <Modal.Title>Add Book</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body style={{ fontWeight: "600", color: "#11bba3" }}>
//                   {" "}
//                   Are you sure to add a new book?
//                 </Modal.Body>
//                 <Modal.Footer>
//                   <Button variant="warning" onClick={handleClose}>
//                     Cancel
//                   </Button>
//                   <Button
//                     variant="danger"
//                     onClick={() => {
//                       handleClose();
//                       handleAdd();
//                     }}
//                   >
//                     Yes
//                   </Button>
//                 </Modal.Footer>
//               </Modal>
//             </div>
//           </Form>
//         </Row>
//       </Container>
//     </Container>
//   );
// };

// export default AddPerfume;
