import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import ItemListContainer from "../Components/ItemListContainer/ItemListContainer";
import ItemDetails from "../Components/ItemDetails/ItemDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer />}></Route>
        <Route path="/category/:name" element={<ItemListContainer/>}></Route>
        <Route path="/product/:id" element={<ItemDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
