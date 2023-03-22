import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import { CartContext } from "../App";
import { useContext } from "react";


function Product({ product }) {
  // eslint-disable-next-line
  const { cart, setCart } = useContext(CartContext);

  function addProductToCart() {
    cart.push(product);
    setCart(cart);
  }

  return (
    <div className="mb-5">
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
        <Button variant="success" onClick={addProductToCart}>
          Lägg till i kundvagn
        </Button>
      </Card.Body>
    </Card></div>
  );
}

export default Product;
