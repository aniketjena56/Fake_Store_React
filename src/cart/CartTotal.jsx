import React from 'react'
import { useCartContext } from '../pages/CartContext'

const CartTotal = () => {
    const {state:{cart} } = useCartContext()
const cartLength= cart.length
const total = cart.reduce((acc, cur) => acc + cur.price *cur.quantity, 0) 


    return (
         
        <div className="min-w-[15rem] border-l border-l-white/20 p-6 sticky top-[3.5rem] ">
      <div className="flex flex-col gap-3">
        <span className="text-lg font-bold">{cartLength} Items</span>
        <span className="text-info">Subtotal: {total} Rs</span>
        <div className="card-actions">
          <button
            onClick={() =>
              alert("Please try to implement this functionality..!!")
            }
            className="btn btn-primary btn-block"
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>

  
  );
};
        
   

export default CartTotal