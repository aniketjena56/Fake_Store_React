import React from 'react'
import CartBody from './CartBody'
import CartTotal from './CartTotal'




const Cart = () => {
  return (
    <div>
      
        <div className='flex '>
        <CartBody/>
        <div >
         <CartTotal/>
        </div>
        </div>
        
        
    </div>
  )
}

export default Cart