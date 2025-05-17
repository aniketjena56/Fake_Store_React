import React from 'react'
import { FaPlus } from "react-icons/fa6"
import { useCartContext } from '../pages/CartContext'
import { FaMinus } from 'react-icons/fa'

const CartProductCard = ({ cproductDetails }) => {
  // console.log(productDetails) // acessing each or each product from as child component of Body.jsx : a, b , c, d

  const { state: { cart }, dispatch } = useCartContext()

  console.log(cart);




  const handleRemoveCart = () => {

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: cproductDetails

    })

  }
  const handleIncrement = () => {
    dispatch({
      type:"INCREMENT_QUANTITY",
      payload: cproductDetails

    })
  
  }

  const handleDecrement = () => {
    if(cproductDetails.quantity <= 1 ){ //if product quantity is less in cart then return and "quantity" is a key inside cproductDetails , inside dispatch we are sending value only
      return
    }
    dispatch({
      type:"DECREMENT_QUANTITY",
      payload:cproductDetails

    })
  
  }

  return (
    <div className="card bg-base-100 shadow-sm border border-white/20 ">
      <figure>
        <img
          src={cproductDetails.image}
          alt="Shoes"
          //   not saffect to page if img is bigger it will get cover
          className='aspect-video object-cover'
        />
      </figure>
      <div className="card-body">
         <div className="flex items-center gap-5">
          <p>
            <strong>{cproductDetails.price}</strong> Rs
          </p>
          <div className="flex items-center gap-4">

          <button className='btn btn-square btn-outline btn-sm ' onClick={handleIncrement}>
            <FaPlus />
          </button>
           
          {/* each product in cart quantity is acesed and showed */}
          <span className=' font-semibold '>{cproductDetails.quantity}</span>


          <button className='btn btn-square btn-outline btn-sm' onClick={handleDecrement}>
            <FaMinus />
          </button>
          </div>
        </div>
        <p>Price : <strong>{cproductDetails.price}</strong></p>


        {
          //.some() or find() use to find the data exist or not
          //productDetails.id is from "products" array 
          // cart is an array also so we are checking if the product in cart its present or not if present then remove from cart else Add to cart
          // basicaly i was doing if the cart(p.id) is not same as product.id then show remove  101 !=101 false -> 101!=102 -> true 
          // now show remove button even one is there with matching id [101 === 101] then remove
           

         
          cart.some(p=> p.id === cproductDetails.id) &&
         //so here we are using some which returns true or false 
         //so check if the products if in the cart then only render the buttons
          (
 
    <div className="card-actions justify-between">
    <button className="btn btn-outline btn-primary" onClick={handleRemoveCart}>Remove From Cart</button>
    <button className="btn btn-outline btn-primary" >Buy Now</button>
    </div>)

  

            
        }

      </div>
    </div>
  )
}

export default CartProductCard
// here goes the flow 
// when we click the remove btn -> goes to the onclick -> dispatch func -> goes to the func in cartReducer -> checks and filter elememnts which is not same of as itemid ;
// item.id = 1 → ✅ keep
// item.id = 2 → ✅ keep
// item.id = 3 → ❌ REMOVE
// item.id = 4 → ✅ keep 