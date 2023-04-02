import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebaseConfig"

const Categories = () => {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    const itemsCollection = collection(db, "categories")
    getDocs(itemsCollection).then((res) => {
      let list = res.docs.map((c) => {
        return {
          ...c.data(),
          id: c.id,
        }
      })
      setCategories(list)
    })
  }, [])

  return (
    <div className="categoriesContainer">
      <ul className="categories">
        {categories != null ? (
          categories.map((c) => {
            return (
              <Link
                to={`/category/${c.name}`}
                style={{ textDecoration: "none", color: "#ddd" }}
                key={c.id}
              >
                <li>{c.name}</li>
              </Link>
            )
          })
        ) : (
          <span>Loading... Please wait</span>
        )}
      </ul>
    </div>
  )
}

export default Categories
