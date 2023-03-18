import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/esm/Container';

function Home() {
    return (
        <Container>
        <Carousel>
          <Carousel.Item className="image">
          <img
              className="d-block w-100"
              src="https://www.vadvivet.se/content/images/2021/07/c-dustin-K-Iog-Bqf8E-unsplash.jpeg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2015/07/10/14/46/canal-839282_960_720.jpg"
              alt="Second slide"
            />
    
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2022/06/05/20/24/rome-7244828_960_720.jpg"
              alt="Third slide"
            />
    
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </Container>
      );
    }
    

export default Home;