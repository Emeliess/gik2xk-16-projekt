import Container from "react-bootstrap/Container";
import Product from "../components/Product";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getAll} from "../services/productService.js";
import {useState, useEffect} from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll().then((result)=> setProducts(result));
  }, []);

  return (
    <>

      <div className="m-5 text-center "><h3>VÅRA FRUKTER</h3></div>
      <Container>
        <Row>
          {products &&
            products.map((product) => {
              return (
                <Col>
                  <Product product={product}></Product>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default Products;
