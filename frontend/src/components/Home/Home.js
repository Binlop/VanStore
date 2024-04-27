import React from "react";
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
    return(
    <div className="home">
            <div class="grid-container">
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