import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../Loader/Loader"
import { db } from "../../firebaseConfig"
import { collection, getDocs, query, where } from "firebase/firestore"
import ItemList from "./ItemList"

const ItemListContainer = () => {
  const { categoryName } = useParams()

  const [products, setProducts] = useState([])

  useEffect(() => {
    const itemsCollection = collection(db, "products")

    let get
    if (categoryName === undefined) {
      get = itemsCollection
    } else {
      get = query(itemsCollection, where("category", "==", categoryName))
    }

    getDocs(get).then((res) => {
      let firebaseProducts = res.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        }
      })
      setProducts(firebaseProducts)
    })
  }, [categoryName])

  if (products.length === 0) {
    return <Loader />
  }

  return <ItemList products={products} categoryName={categoryName}/>
}

export default ItemListContainer
