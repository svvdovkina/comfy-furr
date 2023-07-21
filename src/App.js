import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import {About, Cart, Checkout, Home, Products, SingleProduct, Error, PrivateRoute, AuthWrapper} from "./pages"
import ErrorPage from './pages/ErrorPage'

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
        element: <PrivateRoute>
            <Checkout/>
        </PrivateRoute>
        
      },
      {
        path: '/products/:id',
        element: <SingleProduct/>
      },
      {
        path: '*',
        element: <ErrorPage/>
      }
    ]
  }
])

function App() {
  return <AuthWrapper>
    <RouterProvider router={router}/>
  </AuthWrapper>
  
  
}

export default App
