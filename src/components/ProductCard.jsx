import React from 'react'
import Rating from './Rating'
import { useCartContext } from '../pages/CartContext'

const ProductCard = ({ productDetails }) => {
  // console.log(productDetails) // acessing each or each product from as child component of Body.jsx : a, b , c, d

  const { state: { cart }, dispatch } = useCartContext()

  console.log(cart);


  const handleAddtoCart = () => {

    dispatch({
      type: "ADD_TO_CART",//main
      payload: productDetails

    }) // dispatch is reciving "type" , "payload" and this are in the func "cartReducer()" and inside we have parameter to acess this type and payload is "action"

  }

  const handleRemoveCart = () => {

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productDetails

    })



  }

  return (
    <div className="card bg-base-100 shadow-sm border border-white/20 ">
      <figure>
        <img
          src={productDetails.image}
          alt="Shoes"
          //   not saffect to page if img is bigger it will get cover
          className='aspect-video object-cover'
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <span className='line-clamp-1'>
            {productDetails.productName}</span>
          {productDetails.new && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p><span className='line-clamp-1'>{productDetails.productDescription}</span></p>

        <p>Price : <strong>{productDetails.price}</strong></p>
        <Rating defaultRating={1} className={"w-4 h-4"} />
        


{/* 
          //.some() or find() use to find the data exist or not
        //productDetails.id is from "products" array 
        // cart is an array also so we are checking if the product in cart its present or not if present then remove from cart else Add to cart
        // Suppose your cart is: [A, B, C]
        // productDetails => A
        //What happens?
        //cart.some((p) = p.id !== A.id)
        //➔ Checks:
        //B.id !== A.id → ✅ true
        //C.id !== A.id → ✅ true // doesnt return a new array , make changes in existing array */}


        <div className="card-actions justify-between mt-6">
        
          {cart.some((p) => p.id === productDetails.id) ? (
            <button
              onClick={handleRemoveCart}
              className="btn btn-outline btn-error"
            >
              Remove From Cart
            </button>
          ) : (
            <button
              onClick={handleAddtoCart}
              className="btn btn-outline btn-info"
            >
              Add To Cart
            </button>
          )}
          <button
            onClick={() => alert("Try to implement a fake buy now logic..!!")}
            className="btn btn-outline btn-info"
          >
            Buy Now
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductCard