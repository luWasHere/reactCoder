import { useContext } from "react"
import { CartContext } from "../../Context/CartContext"

const Cart = () => {
  const { cart, setCart } = useContext(CartContext)

  const editQuantity = (id, operation) => {
    let newCart = cart.map((e) => {
      if (e.id === id) {
        let edit = () => {
          if (operation === "sum") {
            return { ...e, quantity: e.quantity + 1 }
          } else {
            return { ...e, quantity: e.quantity - 1 }
          }
        }
        let newValue = edit()
        return newValue
      }
    })

    setCart(newCart.filter((e) => e.quantity >= 1))
  }

  return (
    <div className="cartContainer">
      {cart.length != 0 ? (
        <>
          {cart.map((e) => {
            return (
              <div className="cartProduct" key={e.id}>
                <figure>
                  <img src={e.image} alt="" />
                  <figcaption>{e.title}</figcaption>
                </figure>
                <div className="quantityContainer">
                  <button
                    className="rest"
                    onClick={() => editQuantity(e.id, "rest")}
                  >
                    -
                  </button>
                  <span className="quantity">{e.quantity}</span>
                  <button
                    className="sum"
                    onClick={() => editQuantity(e.id, "sum")}
                  >
                    +
                  </button>
                </div>
                <h2>${e.price}</h2>
              </div>
            )
          })}
          <div className="total">
            <h2>TOTAL</h2>
            <span className="price">$100</span>
            <button>PURCHASE</button>
          </div>
        </>
      ) : (
        <div>There are not products to purchase.</div>
      )}
    </div>
  )
}

export default Cart
