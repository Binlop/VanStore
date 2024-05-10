import React, { useState, useEffect, useContext } from "react";
import axios from "axios"
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

const [loadingData, setLoadingData] = useState(true);
const [data, setData] = useState([]);

const getProductDetail = () => {
    axios
        .get('/api/products/c79d3862-594c-4554-ba0f-4f76c44db03d/')
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));
}


  useEffect(() => {
    getProductDetail();
    console.log(data)
      }, []);

// Профессор Кирилл Евгеньевич, [09.05.2024 16:07]
    async function getData() { 
      await axios
        .get('/api/products/24a4d40b-6f5b-4642-8d48-77abee12b1b1/')
        .then((res) => {
          setData(res.data);
          console.log(data);
          setLoadingData(false);
        });
    }
    if (loadingData) {
          getData();
        }
    return(
    <div className="home">
            <div class="grid-container">
            {productsList && productsList.map(product => (                    
                    <div className="item">
                        <div style={{ alignItems: 'center' }}>
                            <img src={product1} width={145} height={145} />
                            <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                                <span style={{ color: 'red', marginBottom: '5px' }}>5 000 Р</span>
                                <span>{product.name}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img src={product1} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red', marginBottom: '5px' }}>5 000 Р</span>
                            <span>Товар 1</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img src={product2} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red', marginBottom: '5px' }}>5 000 Р</span>
                            <span>Товар 2</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img src={product3} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red', marginBottom: '5px' }}>5 000 Р</span>
                            <span>Товар 3</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img src={product4} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red', marginBottom: '5px' }}>5 000 Р</span>
                            <span>Товар 4</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img src={product5} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red', marginBottom: '5px' }}>5 000 Р</span>
                            <span>Товар 5</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img src={product6} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red', marginBottom: '5px' }}>5 000 Р</span>
                            <span>Товар 6</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img src={product7} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red', marginBottom: '5px' }}>5 000 Р</span>
                            <span>Товар 7</span>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div style={{ alignItems: 'center' }}>
                        <img src={product8} width={145} height={145} />
                        <div style={{ justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'red', marginBottom: '5px' }}>5 000 Р</span>
                            <span>Товар 8</span>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}