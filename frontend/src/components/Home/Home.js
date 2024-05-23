import React, { useState, useEffect, useContext } from "react";
import axios from "axios"
import { Link } from 'react-router-dom';
import './home.css'
import product1 from './example_products_photo/1.webp'
import priceFormatter from "../../utils/priceFormatter";

export default function Home() {
  const [productsList, setProductsList] = useState(null);

  useEffect(() => {
    getProductList()
  }, []);

  const getProductList = () => {
    axios
      .get(`/api/products`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        setProductsList(res.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="home">
      <div class="grid-container">
        {productsList && productsList.map(product => (
          <div className="item">
            <div className="home-img-senior-wrapper">
              <div className="home-img-wrapper">
              <img
                alt="product"
                src={product.image ? `http://localhost:8000/api/files/products/images/${product.image.id}` : product1}
                className="home-img"
              />
              </div>
              <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'red' }}>{priceFormatter(Math.floor(product.price))} ₽</span>
                <span title={product.name} className="home-product-name"><Link to={`/products/${product.id}`} className="link-style">{product.name}</Link></span>
              </div>
            </div>
          </div>
        ))}
        <div className="item">
          <div style={{ alignItems: 'center' }}>
            <img alt="product" src={product1} width={145} height={145} />
            <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'red' }}>5 000 ₽</span>
              <span title="Средство для мытья посуды Fairy Нежные руки, Ромашка и витамин E, 1,35 л" className="home-product-name">Средство для мытья посуды Fairy Нежные руки, Ромашка и витамин E, 1,35 л</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}