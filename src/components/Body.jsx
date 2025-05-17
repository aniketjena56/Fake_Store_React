import React from 'react'
import ProductCard from './ProductCard'



const Body = ({filterProduct }) => {
 
 

  return (



    <div className='grid grid-cols-3 gap-4 p-4 max-[1000px]:grid-cols-2 max-[570px]:grid-cols-1 '>
   
     
      {
        filterProduct.map((product) => {
          return <ProductCard key={product.id} productDetails={product} />
        })
      }
    </div>)
    
}

export default Body