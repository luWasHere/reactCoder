import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { allCategories } from "../../js/functions"

const Categories = () => {
  const [categories, setCategories] = useState(null)

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
