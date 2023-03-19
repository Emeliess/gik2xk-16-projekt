import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOne, update } from "../services/productService";
import { useNavigate } from "react-router-dom";

function UpdateProduct() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: -1,
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    getOne(id).then((p) => {
      setProduct(p);
    });
  }, [id]);

  function onValueChanged(e) {
    const value = e.target.value;

    setProduct({ ...product, [e.target.name]: value });
  }

  async function updateProduct(e) {
    e.preventDefault();
    await update(product);
    navigate("/administration");
  }

  return (
    <>
      <Form
        onSubmit={updateProduct}
      >
        <Form.Group className="mb-3">
          <Form.Label>Titel</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={product.title}
            onChange={onValueChanged}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Beskrivning</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={product.description}
            onChange={onValueChanged}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pris</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={onValueChanged}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Bild-URL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={onValueChanged}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Uppdatera produkt
        </Button>
      </Form>
    </>
  );
}

export default UpdateProduct;
