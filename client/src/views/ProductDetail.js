import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { BsStar, BsStarFill } from "react-icons/bs";
import { getOne, getProductRating, setProductRating } from "../services/productService";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../App";
import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button";

function ProductDetail() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState([]);
  const [rating, setRating] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    getOne(id).then((result) => setProduct(result));
  }, [id]);

  useEffect(() => {
    getProductRating(id).then(result => setRating(result));
  }, [id]);

  function addProductToCart() {
    cart.push(product);
    setCart(cart);
  }

  function getRating() {
    let stars = [];
    let count = 0;
    let totalRating = 0;
    rating.forEach(r => {
      count += 1;
      totalRating += r.rating;
    });

    totalRating = totalRating / count;

    for (let i = 1; i <= 5; i++) {
      if (totalRating >= i) {
        stars.push(<BsStarFill />);
      } else {
        stars.push(<BsStar />);
      }
    }
  
    return stars;
  }

  async function postRating(rating) {
    await setProductRating(id, rating);
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
      {getRating()}
      <Button variant="success" onClick={addProductToCart}>
        Lägg till i kundvagn
      </Button>

      <h3>Lämna betyg på produkt</h3>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Betyg
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => postRating(5)}>
            <BsStarFill></BsStarFill>
            <BsStarFill></BsStarFill>
            <BsStarFill></BsStarFill>
            <BsStarFill></BsStarFill>
            <BsStarFill></BsStarFill>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => postRating(4)}>
            <BsStarFill></BsStarFill>
            <BsStarFill></BsStarFill>
            <BsStarFill></BsStarFill>
            <BsStarFill></BsStarFill>
            <BsStar></BsStar>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => postRating(3)}>
            <BsStarFill></BsStarFill>
            <BsStarFill></BsStarFill>
            <BsStarFill></BsStarFill>
            <BsStar></BsStar>
            <BsStar></BsStar>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => postRating(2)}>
            <BsStarFill></BsStarFill>
            <BsStarFill></BsStarFill>
            <BsStar></BsStar>
            <BsStar></BsStar>
            <BsStar></BsStar>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => postRating(1)}>
            <BsStarFill></BsStarFill>
            <BsStar></BsStar>
            <BsStar></BsStar>
            <BsStar></BsStar>
            <BsStar></BsStar>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default ProductDetail;
