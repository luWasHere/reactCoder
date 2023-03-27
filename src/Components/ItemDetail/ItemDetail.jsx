import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { CartContext } from "../../Context/CartContext"

const Itemdetail = () => {
  const [product, setProduct] = useState()

  const params = useParams()

  const { addToCart } = useContext(CartContext)

  const oneProduct = async (id, state) => {
    const pet = await axios.get("https://fakestoreapi.com/products/" + id)
    state(pet.data)
  }

  useEffect(() => {
    oneProduct(params.id, setProduct)
  }, [])

  const onAdd = () => {
    addToCart({ ...product, quantity: quantityCounter })
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

  const [quantityCounter, setQuantity] = useState(1)

  const quantityCount = (operation) => {
    switch (operation) {
      case "sum":
        setQuantity(quantityCounter + 1)
        break
      case "rest":
        if (quantityCounter <= 1) {
          break
        } else {
          setQuantity(quantityCounter - 1)
          break
        }
    }
  }

  return (
    <>
      {product != null ? (
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
        </div>
      ) : (
        " "
      )}
    </>
  )
}

export default Itemdetail
