import { allProducts } from "../../js/functions"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const ItemListContainer = () => {

  const { name } = useParams()

  const [products, setProducts] = useState([])

  let filterProducts = products.filter(p => p.category === name)

  if (name === undefined) {filterProducts = products}

  useEffect(() => {
    allProducts(setProducts)
  }, [name])

  return (
    <div className="products">
      {products
        ? filterProducts.map((p) => {
            if (p.title.length > 18) {
              if (p.title.slice(-1) == ".") {p.title = p.title}
              else {
                let corte = `${p.title.substring(0, 17)}`
                if (corte.slice(-1) == " ") {
                  corte = corte.substring(0, 16)
                }
                p.title = corte + "..."
              }
            }

            return (
              <div className="product" key={p.id}>
                <figure>
                  <img src={p.image} alt="" />
                  <figcaption>{p.title}</figcaption>
                  <p>{p.description}</p>
                  <Link to={`/product/${p.id}`}>
                    <button>See details</button>
                  </Link>
                </figure>
              </div>
            )
          })
        : ""}
    </div>
  )
}

export default ItemListContainer
