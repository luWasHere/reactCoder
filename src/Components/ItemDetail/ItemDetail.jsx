import { useState, useContext } from "react"
import { ToastContainer, toast } from "react-toastify"
import { CartContext } from "../../Context/CartContext"
import { useParams } from "react-router-dom"

const ItemDetail = ({ product }) => {
  const { addToCart, cart } = useContext(CartContext)

  const params = useParams()

  const initialCount = () => {
    let item = cart.find((e) => params.id == e.id)

    if (item !== undefined) {
      return item.quantity
    } else {
      return 1
    }
  }

  const [quantityCounter, setQuantityCounter] = useState(initialCount())

  const onAdd = () => {
    const p = { ...product, quantity: quantityCounter }
    addToCart(p)

    const notify = () =>
      toast.success("Product added!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    notify()
  }

  const addStars = (rate) => {
    let html = ""
    let rating = rate
    for (let i = 0; i < 5; i++) {
      if (rating === 0) {
        html += '<i class="fa-regular fa-star"></i>'
      } else {
        rating--
        html += '<i class="fa-solid fa-star"></i>'
      }
    }
    return html
  }

  const quantityCount = (operation) => {
    switch (operation) {
      case "sum":
        setQuantityCounter(quantityCounter + 1)
        break
      case "rest":
        if (quantityCounter <= 1) {
          break
        } else {
          setQuantityCounter(quantityCounter - 1)
          break
        }
    }
  }

  return (
    <div className="detailContainer">
      <div className="imgContainer">
        <img src={product.image} alt="" />
      </div>

      <div className="infoContainer">
        <h1>{product.title}</h1>
        <span className="rating">
          <p>{product.rating.rate}</p>
          <div
            className="stars"
            dangerouslySetInnerHTML={{
              __html: addStars(Math.round(product.rating.rate)),
            }}
          ></div>
        </span>
        <div className="price">
          <h2>Price</h2>
          <h3>${product.price}</h3>
        </div>
        <p className="description">{product.description}</p>
        <div className="btns">
          <button className="addToCart" onClick={() => onAdd()}>
            Add to cart
          </button>
          <button className="rest" onClick={() => quantityCount("rest")}>
            -
          </button>
          <span className="quantity">{quantityCounter}</span>
          <button className="sum" onClick={() => quantityCount("sum")}>
            +
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  )
}

export default ItemDetail
