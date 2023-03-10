import axios from "axios"

const allProducts = async (state) => {
  const pet = await axios.get("https://fakestoreapi.com/products")
  state(pet.data)
}

const oneProduct = async (id, state) => {
  const pet = await axios.get("https://fakestoreapi.com/products/" + id)
  state(pet.data)
}

const allCategories = async (state) => {
  const pet = await axios.get("https://fakestoreapi.com/products/categories")
  state(pet.data)
}

export { allProducts, oneProduct, allCategories }
