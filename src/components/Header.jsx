import React, { useEffect, useRef, useState } from 'react'
import { CiMenuBurger } from "react-icons/ci"
import FilterBar from './FilterBar'
import { useCartContext } from '../pages/CartContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Header = ({ filters, setFilters, sortType, setSortType  }) => {

  // For icon to show the items got and how many got add
  const { state: { cart, unFilteredProduct } , dispatch } = useCartContext()
  const cartLength = cart.length;

  // reduce() : is used  to add elements in array 
  // syntax: a.reduce(previousValue/accumulator, currentvalue , index) 
  // a=[2,3,4,5] , and in accumulator is always should b "0"  , currentVal=2 , internaly acc=acc+2 so after 
  // acc=2 and curval=3 without loop it will add all elements and gives final result

  const total = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0) // acc: accumulator , cur = acessing the elemets in arra from start end , "0" : intial value of acc

  const [search, setSearch] = useState('')

const debounceId = useRef() // useRef is a React hook that gives you a box (called a “ref object”) where you can store any value you want, and that value stays the same between re-renders of the component., also used to acess Dom Elements(scrolling , search)
//  & here it is store the id of timer , if we took a simple variable the it might change the id whenever it re render

  // whenever search value gets change "useEffect" will run

  useEffect(() => {
    // when we changes the input or 2nd word it will remove old timer and clear interval works if a setTimeout() is there , if we wont give then all old and new timer will b running no timer will b deleted only if someone types fast
    if(debounceId.current) {
      clearTimeout(debounceId.current)
    }
    // Start a new timer (wait 300ms before running the search)
debounceId.current = setTimeout(() => { 
  if(!search) { // if search bar is empty then return the all products  
      dispatch({
        type:"FILTER_SEARCH" ,
        payload :unFilteredProduct
      })
      return
    }
    // so now we want that after search we will get items after filtering out of 20 products 
    // but problem is 2nd time i tried to search i got opion only to search from that remaining product 
    // ex: i search -> filter() -> got 11 product -> once more i want to search some difreent thing -> but i am only get llowed to search from 11 items only not from 20 items and thats why 
    // we will create a copy of original products[] array then we will use it for search only no other work will b done like "add to cart" or giving results of 11 items etc...


   const filteredItems= unFilteredProduct.filter((p) => {
      return p.productName.toLowerCase().includes(search.toLowerCase()) // filter the array -> 1st convert all product name to lowercase and then search wether the check the items exist in array thst is enteredin search bar, "includes()" also check the the string any word is there or not
    })
    dispatch({
      type:"FILTER_SEARCH" ,
      payload :filteredItems
    })

  }, 700)

  // 🔥 6️⃣ Cleanup function: runs when component unmounts or before next effect runs mean whenever we change the input it re render and everytime
  return () => clearTimeout(debounceId.current)

}, [search])
// so when search input change the setTimeout works and after 0.7s it will the run the code inside it but if we interupt before the time compltes the last cleartimeout will remove the old timer and start the new timer and so on...


    

  const navigate = useNavigate()


  return (
   <div className="navbar bg-base-200 border-b border-b-white/10 sticky top-0 z-50 ">

      <div className=" flex flex-1">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-outline btn-info btn-sm drawer-button md:hidden"><CiMenuBurger className='text-xl ' /></label>

            <Link to='/' className="btn btn-ghost text-xl" >Fake Store</Link>
          </div>
          <div className="drawer-side ">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-black text-base-content  min-h-full w-80 p-4 z-50  ">
              {/* Sidebar content here */}
               
              <FilterBar filters={filters} setFilters={setFilters} sortType={sortType} setSortType={setSortType} isMobile={true}/>
            </ul>
          </div>
        </div>
      </div>
      {/* search bar */}
      <input type="text"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto"
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
      {/* Cart */} {/* Cart dropDown*/}{/* if we wont give arrow then onclick will get "undefined" as val */}
    <div className="dropdown dropdown-end">
  <label tabIndex={0} className="btn btn-ghost btn-circle ">
    <div className="indicator">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
       {cartLength > 0 && (
    <span className="badge badge-sm indicator-item">
      {cartLength}
    </span>
  )}
    </div>
  </label>

  <ul
    tabIndex={0}
    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50"
  >
    <li>
      <span className="text-lg font-bold">{cartLength} Items</span>
    </li>
    <li>
      <span className="text-info">Subtotal: {total} Rs</span>
    </li>
    <li>
      <button onClick={() => navigate('/cart')} className="btn btn-primary btn-block">
        View cart
      </button>
    </li>
  </ul>
</div>

      </div>
   
  )
}

export default Header

// difrence of 2 clearTimeout https://chatgpt.com/c/681b5e1f-49e4-8005-8996-159f84e84080