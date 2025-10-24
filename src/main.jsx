import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Products from './components/Products/products.jsx'
import Cart from './components/cart/cart.jsx'
import NotFound from './components/ErrorPage/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />
  },
  {
    path: "shop",
    element: <Products />,
    errorElement: <NotFound />
  },
  {
    path: "cart",
    element: <Cart />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
