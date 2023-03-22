import Button from "react-bootstrap/esm/Button";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { create } from "../services/productService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getAll } from "../services/productService.js";
import { useState, useEffect } from "react";
import ProductAdministration from "../components/ProductAdministration";

function Administration() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll().then((result) => setProducts(result));
  }, []);

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Lägg till produkt</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={createProduct}>
              <Form.Group className="mb-3">
                <Form.Label>Titel</Form.Label>
                <Form.Control type="text" name="title" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Beskrivning</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pris</Form.Label>
                <Form.Control type="number" name="price" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bild-URL</Form.Label>
                <Form.Control type="text" name="imageUrl" />
              </Form.Group>
              <Button type="submit" variant="secondary">
                Lägg till produkt
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Visa alla produkter</Accordion.Header>
          <Accordion.Body>
            <Container>
              <Row>
                {products &&
                  products.map((product) => {
                    return (
                      <Col>
                        <ProductAdministration
                          product={product}
                        ></ProductAdministration>
                      </Col>
                    );
                  })}
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

async function createProduct(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const product = Object.fromEntries(formData.entries());

  await create(product);
}

export default Administration;
