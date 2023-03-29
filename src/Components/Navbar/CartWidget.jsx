import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../Context/CartContext"

const CartWidget = () => {
  const { cart, quantity } = useContext(CartContext)

  return (
    <Link to="/cart">
      <div className="cart">
        <i className="fa-solid fa-cart-shopping"></i>
        {cart.length != 0 ? <p className="counter">{quantity}</p> : ""}
      </div>
    </Link>
  )
}

export default CartWidget
