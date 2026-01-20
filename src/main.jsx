import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Lenis from '@studio-freight/lenis'
import Loader from './components/Loader/Loader.jsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import './index.css'

// Lazy load components for code splitting and loading states
const App = lazy(() => import('./App.jsx'))
const Products = lazy(() => import('./components/Products/products.jsx'))
const Cart = lazy(() => import('./components/cart/cart.jsx'))
const PayWall = lazy(() => import('./components/PayWallMock/PayWall.jsx'))
const Login = lazy(() => import('./components/Login/Login.jsx'))
const Admin = lazy(() => import('./components/Admin/Admin.jsx'))
const Profile = lazy(() => import('./components/Profile/Profile.jsx'))
const ProductDetail = lazy(() => import('./components/ProductDetail/ProductDetail.jsx'))
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
    path: "product/:id",
    element: (
      <Suspense fallback={<Loader />}>
        <ProductDetail />
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
  {
    path: "checkout",
    element: (
      <Suspense fallback={<Loader />}>
        <PayWall />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    )
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    )
  },
  {
    path: "admin",
    element: (
      <Suspense fallback={<Loader />}>
        <Admin />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    )
  },
  {
    path: "profile",
    element: (
      <Suspense fallback={<Loader />}>
        <Profile />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    )
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    )
  }
])

// Initialize Lenis smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

// Connect Lenis to requestAnimationFrame
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Expose lenis globally for programmatic scrolling
window.lenis = lenis

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)
