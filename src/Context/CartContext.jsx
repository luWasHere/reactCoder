import { createContext, useState } from "react"

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    let exists = isInCart(product.id)

    if (exists) {
      let newCart = cart.map((e) => {
        if (e.id === product.id) {
          return { ...e, quantity: e.quantity + product.quantity }
        }
      })

      setCart(newCart)
    } else {
      setCart([...cart, product])
    }
  }

  const isInCart = (id) => {
    return cart.some((e) => e.id === id)
  }

  let data = {
    cart,
    setCart,
    addToCart,
  }

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}

export default CartContextProvider
