import React, { useState, useEffect, useContext } from "react";
import axios from "axios"
import { Link } from 'react-router-dom';
import './home.css'
import product1 from './example_products_photo/1.webp'
import product2 from './example_products_photo/2.webp'
import product3 from './example_products_photo/3.webp'
import product4 from './example_products_photo/4.webp'
import product5 from './example_products_photo/5.webp'
import product6 from './example_products_photo/6.webp'
import product7 from './example_products_photo/7.webp'
import product8 from './example_products_photo/8.webp'


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
    return(
    <div className="home">
            <div class="grid-container">
            {productsList && productsList.map(product => (                    
                    <div className="item">
                        <div style={{ alignItems: 'center' }}>
                            <img alt="product" src={product1} width={145} height={145} />
                            <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                                <span style={{ color: 'red' }}>{Math.floor(product.price)} ₽</span>
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
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img alt="product" src={product2} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red' }}>5 000 ₽</span>
                            <span title="Кофе молотый, Carte Noire Original, 230г" className="home-product-name">Кофе молотый, Carte Noire Original, 230г</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img alt="product" src={product3} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red' }}>5 000 ₽</span>
                            <span title="Товар 3" className="home-product-name">Товар 3</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img alt="product" src={product4} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red' }}>5 000 ₽</span>
                            <span title="Товар 4" className="home-product-name">Товар 4</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img alt="product" src={product5} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red' }}>5 000 ₽</span>
                            <span title="Товар 5" className="home-product-name">Товар 5</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img alt="product" src={product6} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red' }}>5 000 ₽</span>
                            <span title="Товар 6" className="home-product-name">Товар 6</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img alt="product" src={product7} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red' }}>5 000 ₽</span>
                            <span title="Товар 7" className="home-product-name">Товар 7</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img alt="product" src={product8} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red' }}>5 000 ₽</span>
                            <span title="Товар 8" className="home-product-name">Товар 8</span>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}