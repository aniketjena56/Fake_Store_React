import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './cart/Cart'
import { CartcontextProvider } from './pages/CartContext'
import Home from './components/Home'







const App = () => {


  

  return (
  


   <CartcontextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/> } />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartcontextProvider>

  )
}

export default App

