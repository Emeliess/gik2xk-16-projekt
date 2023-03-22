import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { BsStar, BsStarFill } from "react-icons/bs";
import { getOne, getProductRatings, setProductRating } from "../services/productService";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../App";
import Dropdown from "react-bootstrap/Dropdown"
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

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
    <Container className="rounded mt-2 mb-5">
      <Image
        rounded="true"
        height="300px"
        src={product.imageUrl}
      ></Image>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>{product.price} kr</p>
      <p>{getRating()}</p>
      
      <Button variant="success" onClick={addProductToCart}>
        Lägg till i kundvagn
      </Button>

      <h4>Lämna betyg på produkt</h4>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
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

      <p>Tidigare betyg</p>
      {ratings &&
            ratings.map((r) => {
              return (
                <>
                  <p><b>{r.rating}</b></p>
                
                </>
              );
            })}
            </Container>
    </>
  );
}


export default ProductDetail;
