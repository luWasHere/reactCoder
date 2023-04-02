import React, { useState } from "react"
import { addDoc, collection, updateDoc, doc } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { shortenTitle } from "../ItemList/ItemList"

const FormCheckout = ({
  cart,
  getTotalPrice,
  setOrderId,
  resetCart,
  setShowPayment,
}) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    let order = {
      buyer: userData,
      items: cart,
      total: getTotalPrice(),
    }

    let orderCollection = collection(db, "orders")
    addDoc(orderCollection, order)
      .then((res) => {
        setOrderId(res.id)
        resetCart()
      })
      .catch((err) => console.log(err))

    cart.map((p) => {
      let refDoc = doc(db, "products", p.id)
      updateDoc(refDoc, { stock: p.stock - p.quantity })
    })
  }

  return (
    <div className="checkoutContainer">
      <div className="productsToBuy">
        <h1>Products to buy:</h1>
        {cart.map((p) => {
          shortenTitle(p)
          return (
            <div className="product color" key={p.id}>
              <img src={p.image} alt="" />
              <h3 className="title">{p.title}</h3>
              <span>x{p.quantity}</span>
              <h3 className="price">${p.price * p.quantity}</h3>
            </div>
          )
        })}
        <div className="totalPrice color">
          <h3 className="totalText">TOTAL</h3>
          <span className="totalNumber">${getTotalPrice()}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={userData.phone}
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
        />

        <button type="submit">PURCHASE</button>
        <button onClick={() => setShowPayment(false)}>CANCEL</button>
      </form>
    </div>
  )
}

export default FormCheckout
