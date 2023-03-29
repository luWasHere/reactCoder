import { createContext, useState } from "react"

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [quantity, setQuantity] = useState()

  const addToCart = (product) => {
    let exists = isInCart(product.id)

    if (exists) {
      let newCart = cart.map((e) => {
        if (e.id == product.id) {
          return { ...e, quantity: product.quantity }
        } else {
          return { ...e }
        }
      })

      setCart(newCart)
      console.log(newCart)
      setQuantity(
        newCart.reduce((acc, elem) => {
          return acc + elem.quantity
        }, 0)
      )
    } else {
      let newCart = [...cart, product]
      setCart(newCart)
      console.log(newCart)
      setQuantity(
        newCart.reduce((acc, elem) => {
          return acc + elem.quantity
        }, 0)
      )
    }
  }

  const isInCart = (id) => {
    return cart.some((e) => e.id === id)
  }

  const getTotalPrice = () => {
    const total = cart.reduce((acc, elem) => {
      return acc + elem.quantity * elem.price
    }, 0)

    return total
  }

  const deleteProductById = (id) => {
    const newCart = cart.filter((e) => e.id !== id)
    setCart(newCart)
    setQuantity(
      newCart.reduce((acc, elem) => {
        return acc + elem.quantity
      }, 0)
    )
  }

  const editProductQuantity = (id, operation) => {
    let newCart = [...cart]
    newCart.map((e) => {
      if (e.id === id) {
        switch (operation) {
          case "sum":
            e.quantity += 1
            break
          case "rest":
            if (e.quantity === 1) {
              break
            }
            e.quantity -= 1
            break
        }
      }
    })
    setCart(newCart)
    setQuantity(
      newCart.reduce((acc, elem) => {
        return acc + elem.quantity
      }, 0)
    )
  }

  let data = {
    cart,
    setCart,
    addToCart,
    quantity,
    setQuantity,
    getTotalPrice,
    deleteProductById,
    editProductQuantity,
  }

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>
}

export default CartContextProvider
