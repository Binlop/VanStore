import { React, useEffect, useState } from "react"
import './Cart.css'
import product1 from './/example_products_photo/1.webp';
import priceFormatter from "../../utils/priceFormatter";

export default function Cart() {
  const [productsList, setProductsList] = useState([
    { id: '1', title: 'phone', price: 19999, count: 1, priceTotal: 19999 },
    { id: '2', title: 'laptop', price: 53999, count: 1, priceTotal: 53999 },
    { id: '3', title: 'CPU', price: 49999, count: 1, priceTotal: 49999 },
    { id: '4', title: 'GPU', price: 102999, count: 1, priceTotal: 102999 }
  ])

  const [total, setTotal] = useState({
    price: productsList.reduce((prev, curr) => { return prev + curr.priceTotal }, 0),
    count: productsList.reduce((prev, curr) => { return prev + curr.count }, 0)
  })

  useEffect(() => {
    setTotal({
      price: productsList.reduce((prev, curr) => { return prev + curr.priceTotal }, 0),
      count: productsList.reduce((prev, curr) => { return prev + curr.count }, 0)
    })
  }, [productsList])

  function deleteProduct(id) {
    setProductsList((productsList) => {
      return productsList.filter((product) => { return id !== product.id })
    })
  }


  return (
    <div className="cart-container">
      <div className="cart-page">
        <div className="cart-page-title">
          <h1>Корзина</h1>
          <div>{total.count} тов.</div>
        </div>
        <div className="cart-page-under-title-part">
          <div className="cart-page-product-tabs">
            <RenderProducts deleteProduct={deleteProduct} productsList={productsList} setProductsList={setProductsList} />
          </div>
          <div className="cart-page-total-amount">
            <TotalAmount total={total} />
          </div>
        </div>
      </div>
    </div>
  )
}

function RenderProducts({ productsList, setProductsList, deleteProduct }) {


  function increase(id) {

    setProductsList((productsList) => {
      return productsList.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            count: product.count + 1,
            priceTotal: (product.count + 1) * product.price
          };
        }
        return product
      })
    })
  }

  function decrease(id) {

    setProductsList((productsList) => {
      return productsList.map((product) => {
        if (product.id === id) {

          const newCount = product.count - 1 > 1 ? product.count - 1 : 1

          return {
            ...product,
            count: newCount,
            priceTotal: newCount * product.price
          };
        }
        return product
      })
    })
  }

  function changeValue(id, value) {
    setProductsList((productsList) => {
      return productsList.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            count: value,
            priceTotal: value * product.price
          }
        }
        return product
      })
    })
  }

  return (
    productsList && productsList.map(
      prod => (
        <CartProduct deleteProduct={deleteProduct} changeValue={changeValue} priceTotal={prod.priceTotal} count={prod.count} decrease={decrease} increase={increase} id={prod.id} key={prod.id} title={prod.title} />
      )
    )
  )
}

function CartProduct({ deleteProduct, changeValue, priceTotal, count, decrease, increase, id, title }) {

  return (
    <div className="cart-product-card">
      <div className="cart-product-info">
        <div className="cart-product-image"><img src={product1} alt="product" /></div>
        <div className="cart-product-mid">
          <div className="cart-product-mid-name">{title}</div>
          <div className="cart-product-mid-amount">
            <button type="button" className="cart-product-mid-amount-minus-btn" onClick={() => { decrease(id) }}>-</button>
            <input type="number" min={1} max={99} value={count} onChange={(e) => { changeValue(id, +e.target.value) }} />
            <button type="button" className="cart-product-mid-amount-plus-btn" onClick={() => { increase(id) }}>+</button>
          </div>
        </div>
        <div className="cart-product-right">
          <div className="cart-product-right-buttons">
            <i className='bx bx-trash' onClick={() => deleteProduct(id)}></i>
            <i className='bx bx-heart'></i>
          </div>
          <div className="cart-product-right-price">{priceFormatter(priceTotal)} ₽</div>
        </div>
      </div>
    </div>
  )
}

function TotalAmount({ total }) {
  const { count, price } = total

  return (
    <div className="cart-page-total-amount-next">
      <div className="cart-page-total-amount-next-tab">
        <div className="cart-page-total-amount-next-tab-total-amount-and-price">
          <div className="cart-page-total-amount-next-tab-total-amount">
            <p>Итого:</p>
            {count} тов.
          </div>
          <div className="cart-page-total-amount-next-tab-total-price">
            {priceFormatter(price)} ₽
          </div>
        </div>
        <div className="cart-page-total-amount-next-tab-btn">
          <button type="button">Перейти к оформлению</button>
        </div>
      </div>
    </div>
  )
}
