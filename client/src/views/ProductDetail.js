import { useParams } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { BsStar, BsStarFill } from "react-icons/bs";

function ProductDetail() {
  const params = useParams();
  const id = params.id;

  const product = {
    id: id,
    title: "Moln",
    description: "Fint moln",
    rating: 4,
    price: 200,
    imageUrl:
      "https://www.vadvivet.se/content/images/2021/07/c-dustin-K-Iog-Bqf8E-unsplash.jpeg",
  };

  return (
    <>
      <Image rounded="true" fluid="true" width="400px" src={product.imageUrl}></Image>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>{product.price} kr</p>
      {getRating(product.rating)}
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
