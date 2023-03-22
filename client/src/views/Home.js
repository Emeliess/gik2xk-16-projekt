import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/esm/Container";

function Home() {
  return (
    <Container>
      <Carousel>
        <Carousel.Item className="image">
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1550828519-88895ad9452f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Välkommen till E&J's Fruits</h3>
            <p>Handla nyplockad och färsk frukt hos oss.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1597714026720-8f74c62310ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>E&J's Fruits</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1519180392711-496e450edf6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>E&J's Fruits</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Home;
