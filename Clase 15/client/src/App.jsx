import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Products from './components/Products'
import Register from './components/Register'
import Nav from './components/Navbar'
import { Logout } from './components/Logout'
import { LoggedProvider } from './context/LoggedContext'
import NewProduct from './components/NewProduct'
import Cart from './components/Cart'

function App() {

  return (
    <LoggedProvider>
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
            <Route path='/new-product' element={<NewProduct/>} />
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </main>
      </BrowserRouter>
    </LoggedProvider>
  )
}

export default App
