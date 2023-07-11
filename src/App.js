import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import {About, Cart, Checkout, Home, Products, SingleProduct, Error} from "./pages"

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Navbar/>
      <Sidebar/>
      <Outlet/>
      <Footer/>
    </>,
    errorElement: <Error/>,
    children:
    [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/products',
        element: <Products/>
      },
      {
        path: '/checkout',
        element: <Checkout/>
      },
      {
        path: '/products/:id',
        element: <SingleProduct/>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router}/>
  
}

export default App
