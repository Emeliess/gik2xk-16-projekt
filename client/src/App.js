import './App.css';
import StoreNav from './components/StoreNav';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Products from './views/Products';
import ShoppingCart from './views/ShoppingCart';
import ProductDetail from './views/ProductDetail';
import React, { useState } from 'react';
import Administration from './views/Administration';
import UpdateProduct from './views/UpdateProduct';

export const CartContext = React.createContext(null);

function App() {
    const [cart, setCart] = useState([]);

    return (
        <div className='App'>
            <CartContext.Provider value={{cart: cart, setCart: setCart}}>
                <StoreNav />
                <div class="container">
                    <Routes>
                        <Route path='/' element={<Home></Home>}></Route>
                        <Route path='/produkter' element={<Products></Products>}></Route>
                        <Route path='/kundvagn' element={<ShoppingCart></ShoppingCart>}></Route>
                        <Route path="/produkt/:id" element={<ProductDetail ></ProductDetail>}></Route>
                        <Route path="/administration" element={<Administration></Administration>}></Route>
                        <Route path="/uppdateraProdukt/:id" element={<UpdateProduct></UpdateProduct>}></Route>
                    </Routes>
                </div>
            </CartContext.Provider>        
        </div>
    );
}

export default App;
