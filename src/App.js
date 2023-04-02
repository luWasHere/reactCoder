import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import ItemListContainer from "./Components/ItemList/ItemListContainer"
import ItemDetailContainer from "./Components/ItemDetail/ItemDetailContainer"
import CartContextProvider from "./Context/CartContext"
import Cart from "./Components/Cart/Cart"

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<ItemListContainer />}></Route>
          <Route
            path="/category/:categoryName"
            element={<ItemListContainer />}
          ></Route>
          <Route path="/product/:id" element={<ItemDetailContainer />}></Route>

          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </CartContextProvider>
    </BrowserRouter>
  )
}

export default App
