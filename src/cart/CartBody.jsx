import React from 'react'
import CartProductCard from './CartProductCard'
import { useCartContext } from '../pages/CartContext'


const CartBody = () => {
  const { state:{ cart } } = useCartContext()
  console.log(cart) ;
  


  return (
    
      cart.length < 1 ? (
        <div className='w-full flex items-center justify-center mt-6 text-xl font-semibold'>
          Cart is empty
        </div>

      ) : (<div className='grid grid-cols-3 gap-4 p-4 max-[1000px]:grid-cols-2 max-[570px]:grid-cols-1  w-full'>
        {
          cart.map((cproduct) => {
            return <CartProductCard key={cproduct.id} cproductDetails={cproduct} />
          })
        }
      </div>

      )
    
  )

}

export default CartBody
// issue : no button "addto cart , buy now "  not working 
// filter bar not visible in mobile view 9
// ratings not showing
// filter by price https://chatgpt.com/c/6816cf25-2848-8005-b630-03fd00ade2f8

// benefits of localStorage : if we open in new tab the , and if we had made changes earlier in website like addto cart then we open in new tab it will b show in that tab also mean updaed data gets saves
// but in session, if we add a item in the cart then it will not get saved if we open in new tab
// Syntax: sessionStorage.setItem('key' , json.stringyfy(state)) , mean 1st state is converted in "string" then we we save it in a "key"(key name can b annything)