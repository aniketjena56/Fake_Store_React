import React  from 'react'
import Rating from './Rating'

// so we are r going to filter on basis of price and rating

const FilterBar = ({setSortType , setFilters , filters ,isMobile=false }) => {

  
   const clearFilters = () => {
  setFilters({ price: 5000, ratings: 0 });
  setSortType('');
};

 
  const handleSortChange =(e) => {
     setSortType(e.target.value)
  }



  // using prev , to use the latest state if we use "...filters" it might take old values
  const handleRating = (rate) => {
    setFilters(prev => ({
      ...prev, ratings: rate
    }))
  }


  const handleChangePrice = (e) => {
    const { name, value } = e.target
    // console.log(name, value);// name =price , value= 0 to 5000  (price  5000)

    setFilters((prev) => ({
      ...prev, [name]:Number(value) //price:0 to 5000
    }))
  }


  return (
    <div className={`min-w-[16rem] border-r border-r-white/10 sticky top-[3.5rem] h-fit ${isMobile ? '' :"max-[650px]:hidden"}`}>
      <div className='form-control'>
        <label className='label cursor-pointer' >Ascending</label>
        <input type="radio" 
        name="prices" 
        value='asec'
        className="radio radio-accent" 
        onChange={handleSortChange}
        defaultChecked />
      </div>
      <br />

      <div className='form-control'>
        <label className='label cursor-pointer'>Descending</label>
        <input type="radio" 
        name="prices" 
        className="radio radio-accent"
        value="desec"
        onChange={handleSortChange} /></div>
      <br />
      <div className='h-0.5 w-full bg-white/20' ></div>
      <br />
      {/* so in rating we will send props to control the change in rating */}
      <Rating onchangeRating={handleRating} 
      isEditable={true} 
      defaultRate={filters.ratings} />

      <div>
        <br />
        <p>Price : <strong>{filters.price}</strong></p>

        <input type="range"
          min={0} max={5000}
          value={filters.price}
          className="range range-accent"
          onChange={handleChangePrice}
          name='price' />
      </div>
      <br />
      <div>
        <button className='btn btn-neutral w-full rounded-2xl ' onClick={clearFilters}>Clear Filters</button>
      </div>

    </div>



  )
}

export default FilterBar
// so here see working step by step
// when user click on stars then it pass the number of stars clicked from "rate state"([1,2,3,4,5]) is there and -> pass the value in "onchangeRating" from "Rating.jsx" to "Filter.jsx"
// ex:- a user click on 4 rating ->inside now onChangeRating(4) -> handleRating(4) -> setFilters(spread the data na dinside that ratings gets updated )
// then after re rendering of component the filter will having the updated value 