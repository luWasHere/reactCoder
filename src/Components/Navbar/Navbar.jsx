import CartWidget from "./CartWidget"
import Categories from "./Categories"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <Link to="/" style={{ textDecoration: "none" }}>
        <span className="logo">"EL PEPE" Store</span>
      </Link>
      <ul className="ul">
        <Link to="/" style={{ textDecoration: "none", color: "#ddd" }}>
          <li>All products</li>
        </Link>
        <li className="categoriesBtn">Categories</li>
        <CartWidget />
        <Categories />
      </ul>
    </nav>
  )
}

export default Navbar
