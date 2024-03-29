import React, { useState } from "react"
import { addDoc, collection, updateDoc, doc } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { shortenTitle } from "../ItemList/ItemList"
import { ToastContainer, toast } from "react-toastify"

const FormCheckout = ({
  cart,
  getTotalPrice,
  setOrderId,
  resetCart,
  setShowPayment,
}) => {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    confirmEmail: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (userData.confirmEmail === userData.email) {
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

      cart.forEach((p) => {
        let refDoc = doc(db, "products", p.id)
        updateDoc(refDoc, { stock: p.stock - p.quantity })
      })
    } else {
      return toast.error("Email does not match", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
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
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={userData.phone}
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Confirm email"
          value={userData.confirmEmail}
          onChange={(e) =>
            setUserData({ ...userData, confirmEmail: e.target.value })
          }
          required
        />

        <button type="submit">PURCHASE</button>
        <button onClick={() => setShowPayment(false)}>CANCEL</button>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default FormCheckout
