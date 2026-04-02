import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
let AboutUs = lazy(() => import("./pages/AboutUs"))
let ContactUs = lazy(() => import("./pages/ContactUs"))
let CartPage = lazy(() => import("./pages/CartPage"))
let FavoriteItem = lazy(() => import("./components/FavoriteItem"))
let ProductDetail = lazy(() => import("./components/ProductDetail"))
let OrderCompleted = lazy(() => import("./components/OrderCompleted"))

import NotFound from "./components/NotFound";
import SignupForm from "./pages/SignupForm";
import App from "./pages/App";
import Layout from "./components/Layout";

const routes = createBrowserRouter([

  {
    path: "/",
    element:
      <App />
  },

  {
    path: "/about-us",
    element:
      <Layout><AboutUs /></Layout>
  },

  {
    path: "/contact-us",
    element:
      <Layout><ContactUs /></Layout>
  },

  {
    path: "/cart-page",
    element:
      <Layout><CartPage /></Layout>
  },

  {
    path: "/favorite",
    element:
      <Layout><FavoriteItem /></Layout>
  },

  {
    path: "/signup-form",
    element:
      <Layout><SignupForm /></Layout>
  },

  {
    path: "/detail-page/:id",
    element:
      <Layout><ProductDetail /></Layout>
  },

  {
    path: "/completed",
    element:
      <OrderCompleted />
  },

  {
    path: "/*",
    element: <NotFound />
  }

])

export default routes