import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Products from './components/Products'
import Register from './components/Register'
import Nav from './components/Navbar'
import { Logout } from './components/Logout'
import { LoggedProvider } from './context/LoggedContext'
import NewProduct from './components/NewProduct'
import Cart from './components/Cart'
import ItemDetailContainer from './components/ItemDetailContainer'
import { CartProvider } from './context/CartContext'
import PasswordRecovery from './components/PasswordRecovery'
import NewPassword from './components/NewPassword'

function App() {

  return (
    <LoggedProvider>
      <CartProvider>
      <BrowserRouter>
        <header>
          <Nav />
        </header>
        <main className="grid content-center justify-center h-[90vh]">
          <Routes>
            <Route path='/logout' element={<Logout />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<Products />} />
            <Route path='/detail/:itemId' element={<ItemDetailContainer/>} />
            <Route path='/new-product' element={<NewProduct/>} />
            <Route path='/' element={<Home />} />
            <Route path='/recovery-password' element={<PasswordRecovery/>} />
            <Route path='/change-password/:recovery' element={<NewPassword/>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
        </main>
      </BrowserRouter>
      </CartProvider>
    </LoggedProvider>
  )
}

export default App
