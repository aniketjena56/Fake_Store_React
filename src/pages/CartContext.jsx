import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { faker } from '@faker-js/faker'
// Used faker js that it can generate the data randomly
import { cartReducer } from './cartReducer'

faker.seed(100);
// creating a box
const CartContext = createContext()



// the child component who will b in "children" and where i am gonna provide functionalities
export const CartcontextProvider = ({ children }) => {
  
  

  // using to store 20 data in a array by spreading each detail enter value in it one by one in new array
  const products = [...Array(20)].map(() => ({
    id: faker.string.uuid(),

    productName: faker.commerce.productName(),

    productDescription: faker.commerce.productDescription(),

    price: faker.number.int({ min: 100, max: 5000 }),// changed into number using "number.int()"

    image: faker.image.urlPicsumPhotos({width :300 , height :250}),

    inStock: faker.helpers.arrayElement([0, 5, 10, 15, 20]),

    fastDeliver: faker.datatype.boolean(),

    new: faker.datatype.boolean(),

    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),

  }))

  
  // useReducer(dispatch function , state data)  and dispatch func takes 2 value as parameter to perform action and then update the state/ products
  const [state, dispatch] =useReducer(cartReducer, {products, unFilteredProduct:products ,cart: []}) // unfiteredProduct is a copy array of product


  // Explain about Storage and workof it
  // :-> 1st time we opened our app and reducer started , loacalStrage  is empty 
  // :-> After render - 1st useEffect run (Get) return null , and no data stored and do nothing return {} 
  // :-> then 2nd useEffect runs stores (Save) {products :[all products] , cart :[empty]} as state changes then only 2nd useEffect will save for the 1st time visit 
  // i clicked add to cart on 2 items and now it will save the data {products : [...] , cart[apple , b]}

  // now i refresh or visit in another tab then after loading 
// :->so as useEffect with no dependecies run only oncce wether data in storage there or not , and this time we have the data alrady got from 1st visit
// :->so now GEt will run and show the saved  data then 2nd one  will run and save everytime the changes will b done related to state


// now get item and use it
useEffect(()=>{
  // this dispatch func used to set new data in state 
  const localdata= JSON.parse(localStorage.getItem("cartData")) // get data and then convert it into real form i mean obj
  console.log(localdata);
  
  if(localdata){
    dispatch({
    type : "SET_STATE",
    payload : localdata 
  })
  }
  
}, [])


  // we are storing all products[] in form of storage token
useEffect(()=>{
  if(state.cart.length && state.products.length && state.unFilteredProduct.length){
  
  localStorage.setItem("cartData" , JSON.stringify(state)) }// setting Token , and value of token is the state datas "state:{produts[], cart[]}"
},[state])// whenever "state" gets [render/ any change in cart, products] it will run this and set a new token






  return (
    // dispatch is here in "value" so we can call the function in it as in dispatch accept state and func , so it will take the value and perform action then it will return to store a new staste with updated and new value
   <CartContext.Provider value={{state , dispatch}}>
      {children}
    </CartContext.Provider>
  )
}


export const useCartContext = ()=> useContext(CartContext)
