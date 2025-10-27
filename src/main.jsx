import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Loader from './components/Loader/Loader.jsx'
import './index.css'

// Lazy load components for code splitting and loading states
const App = lazy(() => import('./App.jsx'))
const Products = lazy(() => import('./components/Products/products.jsx'))
const Cart = lazy(() => import('./components/cart/cart.jsx'))
const NotFound = lazy(() => import('./components/ErrorPage/NotFound.jsx'))

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    )
  },
  {
    path: "shop",
    element: (
      <Suspense fallback={<Loader />}>
        <Products />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    )
  },
  {
    path: "cart",
    element: (
      <Suspense fallback={<Loader />}>
        <Cart />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    )
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
