import { useEffect, useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import { CartContext } from "../App";
import { getCart as getCartApi } from "../services/productService";
import { getOne as getOneApi } from "../services/productService";

function ShoppingCart() {
  // eslint-disable-next-line
  //const { cart, setCart } = useContext(CartContext);
  // eslint-disable-next-line
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

  /*   function ShoppingCart() {
    // eslint-disable-next-line
    const { cart, setCart } = useContext(CartContext);
      // eslint-disable-next-line
    const [ products, setProducts ] = useState([]);
    const count = {};
    let totalPrice = 0;
    
    // Loopar igenom varje produkt i kundvagnen
    // Om produktens id redan finns i "count" plussas antalet upp med 1
    // om inte läggs produktens id till i count med värdet 1.
    cart.forEach(p => {
      count[p.id] = count[p.id] ? count[p.id] + 1 : 1;
    });
  
    for(const key in count) {
      // eslint-disable-next-line
      let p = cart.find(pp => pp.id == key);
      p.count = count[key];
      products.push(p);
      totalPrice += p.count * p.price;
    }; */

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
