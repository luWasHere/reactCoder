import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Categories = () => {
  const [categories, setCategories] = useState(null)

  const allCategories = async (state) => {
    const pet = await axios.get("https://fakestoreapi.com/products/categories")
    state(pet.data)
  }

  useEffect(() => {
    allCategories(setCategories)
  }, [])

  return (
    <div className="categoriesContainer">
      <ul className="categories">
        {categories != null
          ? categories.map((c) => {
              return (
                <Link
                  to={`/category/${c}`}
                  style={{ textDecoration: "none", color: "#ddd" }}
                  key={categories.indexOf(c)}
                >
                  <li>{c}</li>
                </Link>
              )
            })
          : ""}
      </ul>
    </div>
  )
}

export default Categories
