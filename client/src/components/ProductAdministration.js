import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import { deleteProduct as apiDelete } from "../services/productService";

function ProductAdministration({ product }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={product.imageUrl} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <div>{product.price}:-</div>
        <Card.Text>
          {product.description}
          <LinkContainer to={"/produkt/" + product.id}>
            <div className="App-link">...visa mer</div>
          </LinkContainer>
        </Card.Text>
        <LinkContainer to={"/uppdateraProdukt/" + product.id}>
          <Button variant="secondary">Uppdatera</Button>
        </LinkContainer>
        <Button
          className="m-2"
          onClick={() => deleteProduct(product.id)}
          variant="danger"
        >
          Ta bort
        </Button>
      </Card.Body>
    </Card>
  );
}

async function deleteProduct(id) {
  apiDelete(id);
}

export default ProductAdministration;
