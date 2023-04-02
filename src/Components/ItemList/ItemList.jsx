import React from "react"
import { Link } from "react-router-dom"

// funcion para agregar puntos suspensivos a los nombres largos de los productos
export const shortenTitle = (p) => {
  if (p.title.length > 18) {
    if (p.title.slice(-1) !== ".") {
      let corte = `${p.title.substring(0, 17)}`
      if (corte.slice(-1) === " ") {
        corte = corte.substring(0, 16)
      }
      p.title = corte + "..."
    }
  }
}

const ItemList = ({ products }) => {
  return (
    <div className="products">
      {products.map((p) => {
        shortenTitle(p)
        return (
          <div className="product" key={p.id}>
            <figure>
              <img src={p.image} alt="" />
              <figcaption>{p.title}</figcaption>
              <p>{p.description}</p>
              <Link to={`/product/${p.id}`}>
                <button>See detail</button>
              </Link>
            </figure>
          </div>
        )
      })}
    </div>
  )
}

export default ItemList
