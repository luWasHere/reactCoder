import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { oneProduct } from "../../js/functions"

const ItemDetails = () => {
  const [product, setProduct] = useState()

  const params = useParams()

  useEffect(() => {
    oneProduct(params.id, setProduct)
  }, [])

  const addStars = (rate) => {
    let html = ""
    let rating = rate
    for (let i = 0; i < 5; i++) {
      if ((rating == 0)) {
        html += '<i class="fa-regular fa-star"></i>'
      } else {
        rating--
        html += '<i class="fa-solid fa-star"></i>'
      }
    }
    return html
  }

  return (
    <>
      {product != null ? (
        <div className="detailsContainer">
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
          </div>
        </div>
      ) : (
        " "
      )}
    </>
  )
}

export default ItemDetails
