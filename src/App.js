import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import ItemListContainer from "./Components/ItemListContainer/ItemListContainer"
import ItemDetail from "./Components/ItemDetail/ItemDetail"
import CartContextProvider from "./Context/CartContext"
import Cart from "./Components/Cart/Cart"

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<ItemListContainer />}></Route>
          <Route path="/category/:categoryName" element={<ItemListContainer />}></Route>
          <Route path="/product/:id" element={<ItemDetail />}></Route>

          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </CartContextProvider>
    </BrowserRouter>
  )
}

export default App
