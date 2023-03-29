import { useContext } from "react"
import { CartContext } from "../../Context/CartContext"
import { Link } from "react-router-dom"

const Cart = () => {
  const {
    cart,
    getTotalPrice,
    setCart,
    deleteProductById,
    editProductQuantity,
  } = useContext(CartContext)

  const resetCart = () => {
    setCart([])
  }

  return (
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
          <span className="deleteAll" onClick={resetCart}>Delete all products</span>
          <div className="total">
            <h2>TOTAL</h2>
            <span className="price">${getTotalPrice().toFixed(2)}</span>
            <button onClick={resetCart}>PURCHASE</button>
          </div>
        </>
      ) : (
        <div>There are not products to purchase.</div>
      )}
    </div>
  )
}

export default Cart
