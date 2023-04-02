import { useContext, useState } from "react"
import { CartContext } from "../../Context/CartContext"
import { Link } from "react-router-dom"
import FormCheckout from "../FormCheckout/FormCheckout"

const Cart = () => {
  const {
    cart,
    getTotalPrice,
    setCart,
    deleteProductById,
    editProductQuantity,
    lsSet,
  } = useContext(CartContext)

  const resetCart = () => {
    setCart([])
    lsSet([])
  }

  const [showPayment, setShowPayment] = useState(false)
  const [orderId, setOrderId] = useState(false)

  const paymentButton = () => {
    setShowPayment(true)
  }

  if (orderId) {
    return (
      <div className="payFinishedContainer">
        <div className="payFinished">
          <h1>¡Thanks for buying!</h1>
          <div className="purchaseId">
            <h2>PURCHASE ID</h2>
            <p>{orderId}</p>
          </div>
          <Link to="/" className="buyMore">
            BUY MORE PRODUCTS
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {showPayment === true ? (
        <div className="paymentContainer">
          <FormCheckout
            cart={cart}
            getTotalPrice={getTotalPrice}
            setOrderId={setOrderId}
            resetCart={resetCart}
            setShowPayment={setShowPayment}
          />
        </div>
      ) : (
        <div className="cartContainer">
          {cart.length != 0 ? (
            <>
              {cart.map((e) => {
                return (
                  <div className="cartProduct" key={e.id}>
                    <Link to={`/product/${e.id}`} className="link">
                      <figure>
                        <img src={e.image} alt="" />
                        <figcaption>{e.title}</figcaption>
                      </figure>
                    </Link>
                    <div className="quantityContainer">
                      <button
                        className="delete"
                        onClick={() => deleteProductById(e.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        className="rest"
                        onClick={() => editProductQuantity(e.id, "rest")}
                      >
                        -
                      </button>
                      <span className="quantity">{e.quantity}</span>
                      <button
                        className="sum"
                        onClick={() => editProductQuantity(e.id, "sum")}
                      >
                        +
                      </button>
                    </div>
                    <h2>${(e.price * e.quantity).toFixed(2)}</h2>
                  </div>
                )
              })}
              <span className="deleteAll" onClick={resetCart}>
                Delete all products
              </span>
              <div className="total">
                <h2>TOTAL</h2>
                <span className="price">${getTotalPrice()}</span>
                <button onClick={paymentButton} className="setPayBtn">
                  GO TO PAYMENT
                </button>
                <Link to="/" className="addMoreBtn">
                  ADD MORE PRODUCTS
                </Link>
              </div>
            </>
          ) : (
            <div>There are not products to purchase.</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Cart
