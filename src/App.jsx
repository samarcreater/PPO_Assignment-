
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ProductPage from './components/Product/ProductPage'
import { CartProvider } from './components/CartContext'
import Cart from './components/Cart/Cart';
function App() {
  return (
    <>
    <CartProvider>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<ProductPage/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
    </CartProvider>
      
    </>
  )
}

export default App
