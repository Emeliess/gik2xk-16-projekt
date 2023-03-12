import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BsStar, BsStarFill } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import { CartContext } from "../../App";
import { useContext } from "react";

function Product({ product }) {
  // eslint-disable-next-line
  const { cart, setCart } = useContext(CartContext);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={product.imageUrl} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <div>{product.price}:-</div>
        {getRating(product.rating)}
        <Card.Text>{product.description}</Card.Text>
        <LinkContainer to={"/produkt/" + product.id}>
          <Button variant="primary">Detaljer</Button>
        </LinkContainer>
        <Button variant="success" onClick={() => addProductToCart(product, cart)}>Lägg till i kundvagn</Button>
      </Card.Body>
    </Card>
  );
}

function getRating(rating) {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<BsStarFill />);
    } else {
      stars.push(<BsStar />);
    }
  }

  return stars;
}

function addProductToCart(product, cart) {
    cart.push(product);
}

export default Product;
