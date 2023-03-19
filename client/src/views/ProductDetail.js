import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { BsStar, BsStarFill } from "react-icons/bs";
import { getOne } from "../services/productService";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../App";
import Button from "react-bootstrap/Button";

function ProductDetail() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    getOne(id).then((result) => setProduct(result));
  }, [id]);

  function addProductToCart() {
    cart.push(product);
    setCart(cart);
  }

  return (
    <>
      <Image
        rounded="true"
        fluid="true"
        width="400px"
        src={product.imageUrl}
      ></Image>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>{product.price} kr</p>
      {getRating(product.rating)}
      <Button variant="success" onClick={addProductToCart}>
        Lägg till i kundvagn
      </Button>
    </>
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

export default ProductDetail;
