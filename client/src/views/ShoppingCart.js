import { useEffect, useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import { CartContext } from "../App";
import { getCart as getCartApi } from "../services/productService";
import { getOne as getOneApi } from "../services/productService";

function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCartApi();
      const productsWithCount = data.map(async ({ productId, count }) => {
        const product = await getOneApi(productId);
        return {
          ...product,
          count,
        };
      });
      const products = await Promise.all(productsWithCount);
      setProducts(products);

      const total = products.reduce((acc, product) => {
        return acc + product.price * product.count;
      }, 0);
      setTotalPrice(total);
    };
    fetchData();
  }, []);

  return (
    <>
      <h2>Kundvagn</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Produkt</th>
            <th>Pris</th>
            <th>Antal</th>
            <th>Sammanlagt pris</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product, i) => {
              return (
                <>
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{product.title}</td>
                    <td>{product.price} kr</td>
                    <td>{product.count}</td>
                    <td>{product.price * product.count} kr</td>
                  </tr>
                </>
              );
            })
          ) : (
            <></>
          )}
          <tr>
            <th></th>
            <td></td>
            <td></td>
            <td></td>
            <td>{totalPrice} kr</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default ShoppingCart;
