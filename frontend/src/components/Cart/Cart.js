import { React, useEffect, useState } from "react"
import './Cart.css'
import product1 from './/example_products_photo/1.webp';

function RenderProducts() {
  const [productsList, setProductsList] = useState([
    { id: '1', title: 'phone', price: '19999' },
    { id: '2', title: 'laptop', price: '53999' },
    { id: '3', title: 'CPU', price: '49999' },
    { id: '4', title: 'GPU', price: '102999' }
  ])

  return (
    productsList && productsList.map(
      prod => (
        CartProduct(prod.id, prod.title, prod.price)
      )
    )
  )
}

export default function Cart() {
  return (
    <div className="cart-container">
      <div className="cart-page">
        <div className="cart-page-title">
          <h1>Корзина</h1>
          <div>X товаров</div>
        </div>
        <div className="cart-page-under-title-part">
          <div className="cart-page-product-tabs">
            {RenderProducts()}
          </div>
          <div className="cart-page-total-amount">
            {TotalAmount()}
          </div>
        </div>
      </div>
    </div>
  )
}

function CartProduct(id, title, price) {
  const [amountCounter, setAmountCounter] = useState(1)

  function AmountChanger(e) {
      setAmountCounter(e.target.value)
    }

  return (
    <div key={id} className="cart-product-card"> {/* Несмотря на то, что key не виден в html, он всё равно работает */}
      <div className="cart-product-info">
        <div className="cart-product-image"><img src={product1} alt="product" /></div>
        <div className="cart-product-mid">
          <div className="cart-product-mid-name">{title}</div>
          <div className="cart-product-mid-amount">
            <button type="button" className="cart-product-mid-amount-minus-btn" onClick={() => {if(amountCounter > 1){setAmountCounter(prev => parseInt(prev) - 1)}}}>-</button>
            <input type="number" min={1} max={99} value={amountCounter} onChange={AmountChanger} />
            <button type="button" className="cart-product-mid-amount-plus-btn" onClick={() => {if(amountCounter < 99){setAmountCounter(prev => parseInt(prev) + 1)}}}>+</button>
          </div>
        </div>
        <div className="cart-product-right">
          <div className="cart-product-right-buttons">
            <i className='bx bx-trash'></i>
            <i className='bx bx-heart'></i>
          </div>
          <div className="cart-product-right-price">{price * amountCounter} ₽</div>
        </div>
      </div>
    </div>
  )
}

function TotalAmount() {
  return (
    <div className="cart-page-total-amount-next">
      <div className="cart-page-total-amount-next-tab">
        <div className="cart-page-total-amount-next-tab-total-amount-and-price">
          <div className="cart-page-total-amount-next-tab-total-amount">
            <p>Итого:</p>
            X товаров
          </div>
          <div className="cart-page-total-amount-next-tab-total-price">
            X ₽
          </div>
        </div>
        <div className="cart-page-total-amount-next-tab-btn">
          <button type="button">Перейти к оформлению</button>
        </div>
      </div>
    </div>
  )
}
