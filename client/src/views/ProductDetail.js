import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { BsStar, BsStarFill } from "react-icons/bs";
import { getOne, getProductRatings, setProductRating } from "../services/productService";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../App";
import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button";

function ProductDetail() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState([]);
  const [rating, setRating] = useState(0);
  const { cart, setCart } = useContext(CartContext);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    getOne(id).then((result) => {
      setProduct(result);
      if(result.ratings.length > 0) {
        setRating(result.ratings[0].AverageRating);
      }
    });
  }, [id]);

  function addProductToCart() {
    cart.push(product);
    setCart(cart);
  }

  useEffect(() => {
    getProductRatings(id).then(result => {
      console.log(result)
      setRatings(result);
    })
  }, [id])

  function getRating() {
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
