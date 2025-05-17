import React, { useState } from 'react'
import Body from "./Body"
import FilterBar from './FilterBar'
import Header from './Header'

import { useCartContext } from '../pages/CartContext'

const Home = () => {

  const { state: { products } } = useCartContext()
  const [filters, setFilters] = useState({ price: 5000, ratings: 0 });
  const [sortType, setSortType] = useState('')
 


  // we are taking products array and sorting if the sort type match as 
  // sort() cant sort direct to numbers so "a" = is 1st element , 'b' =2nd element 
  // sort [4,2,1 ,5] = a-b mean 4 <2 no ->swap [2415] ->4<1 no -> swap , [2145] -> 4<5 yes -> no swap -> next iteration 
  // so its same as bubble sort
  // and in every change it will b acessing the productCard adjusting internally in virtual dom then shows on real dom

 const filterProduct = products
  .filter((p) => p.price <= filters.price )
  .sort((a, b) => {
    if (sortType === 'asec') return a.price - b.price;
    if (sortType === 'desec') return b.price - a.price;
    return 0;
  });

 
  return (
    <div>

      <Header
        filters={filters}
        setFilters={setFilters}
        sortType={sortType}
        setSortType={setSortType}
      />
      <div className='flex  '>
       <FilterBar 
  setSortType={setSortType} 
  sortType={sortType} 
  filters={filters} 
  setFilters={setFilters} 
  
/>

        <Body filterProduct={filterProduct}   />
      </div>


    </div>
  )
}

export default Home