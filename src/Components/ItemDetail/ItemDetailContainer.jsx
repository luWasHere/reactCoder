import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../Loader/Loader"
import { getDoc, collection, doc } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import ItemDetail from "./ItemDetail"
import { Link } from "react-router-dom"

const Itemdetail = () => {
  const [product, setProduct] = useState()
  const params = useParams()

  useEffect(() => {
    const itemsCollection = collection(db, "products")
    const ref = doc(itemsCollection, params.id)

    getDoc(ref).then((res) => {
      if (res.data() !== undefined) {
        setProduct({ ...res.data(), id: res.id })
      } else {
        setProduct("Not found")
      }
    })
  }, [params.id])

  if (product == null) {
    return <Loader />
  } else if (product === "Not found") {
    return (
      <div className="errorNotFound">
        <i class="fa-solid fa-circle-exclamation"></i>
        <p>Product not found.</p>
        <Link to="/" className="errorBtn">RETURN TO MAIN PAGE</Link>
      </div>
    )
  }

  return <ItemDetail product={product} />
}

export default Itemdetail
