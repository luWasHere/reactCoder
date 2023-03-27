import React from 'react'

const CartItemList = () => {
  return (
    <div>
        <div className="cartItem">
            <img src="#" alt="" />
            <h2 className='itemTitle'>item title</h2>
            <span className='itemPrice'>400</span>
            <span className="itemCount">2</span>
            <div className="itemBtns">
                <button>-</button>
                <button><i class="fa-solid fa-trash"></i></button>
                <button>+</button>
            </div>
        </div>
    </div>
  )
}

export default CartItemList