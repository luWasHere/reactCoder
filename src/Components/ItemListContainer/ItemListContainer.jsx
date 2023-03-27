import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

const ItemListContainer = () => {
  const { categoryName } = useParams()

  const [products, setProducts] = useState([])

  const getProducts = async (state, category) => {
    const pet = await axios.get("https://fakestoreapi.com/products")

    if (categoryName !== undefined) {
      state(pet.data.filter((p) => p.category === categoryName))
    } else {
      state(pet.data)
    }
  }

  useEffect(() => {
    getProducts(setProducts)
  }, [categoryName])

  // funcion para agregar puntos suspensivos a los nombres largos de los productos
  const shortenTitle = (p) => {
    if (p.title.length > 18) {
      if (p.title.slice(-1) == ".") {
        p.title = p.title
      } else {
        let corte = `${p.title.substring(0, 17)}`
        if (corte.slice(-1) == " ") {
          corte = corte.substring(0, 16)
        }
        p.title = corte + "..."
      }
    }
  }

  return (
    <div className="products">
      {products
        ? products.map((p) => {
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
          })
        : ""}
    </div>
  )
}

export default ItemListContainer
