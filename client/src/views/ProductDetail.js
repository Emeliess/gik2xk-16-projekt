import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { BsStar, BsStarFill } from "react-icons/bs";
import {
  getOne,
  getProductRatings,
  setProductRating,
} from "../services/productService";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../App";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

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
      if (result.ratings.length > 0) {
        setRating(result.ratings[0].AverageRating);
      }
    });
  }, [id]);

  function addProductToCart() {
    cart.push(product);
    setCart(cart);
  }

  useEffect(() => {
    getProductRatings(id).then((result) => {
      setRatings(result);
    });
  }, [id]);

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

  async function postRating(rating) {
    const newRating = await setProductRating(id, rating);
    setRatings([...ratings, newRating]);
  }

  return (
    <>
      <Container className="mt-2 mb-5 shadow-lg p-3 mb-5 bg-white rounded">
        <Row>
          <Col>
          <Image className="shadow-lg" rounded="true" height="300px" src={product.imageUrl}></Image>
          <h3 className="mt-2">{product.title}</h3>
          <p>{product.description}</p>
          <p>{product.price} kr</p>
          <p>{getRating(rating)}</p>

          <Button variant="success" onClick={addProductToCart}>
            Lägg till i kundvagn
          </Button>
          </Col>

          <Col>
          <h5>Lämna betyg på produkt</h5>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
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

          <h5 className="mt-5 pt-5 border-top border-dark">Tidigare betyg</h5>
          {ratings &&
            ratings.map((r) => {
              return (
                <>
                  <p>
                    {formatDate(r.createdAt)} <b>{getRating(r.rating)}</b>
                  </p>
                </>
              );
            })}
            </Col>
        </Row>
      </Container>
    </>
  );

  function formatDate(date) {
    var result = "";
    const d = new Date(date);
    result += d.toLocaleDateString("sv-SE");
    result += " ";
    result += d.toLocaleTimeString("sv-SE");

    return result;
  }
}

export default ProductDetail;
