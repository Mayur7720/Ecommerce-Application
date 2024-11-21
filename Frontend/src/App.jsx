import "./App.css";
import RootLayout from "./Layout/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsPage from "./Pages/Products/ProductsPage";
import { CartProvider } from "./Context/CartProvider";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import ProductDetails from "./Pages/Products/ProductDetails";
import ProfileLayout from "./Layout/ProfileLayout";
import Info from "./Pages/Profile/Info";
import YourOrder from "./Pages/Profile/YourOrder";
import Wishlist from "./Pages/Profile/Wishlist";
import Cart from "./Pages/Products/Cart";

function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "allProducts", element: <ProductsPage /> },
        { path: "product_details/:id", element: <ProductDetails /> },
        { path: "cart", element: <Cart /> },
      ],
    },
    {
      path: "/profile",
      element: <ProfileLayout />,
      children: [
        { path: "info", element: <Info /> },
        { path: "your_order", element: <YourOrder /> },
        { path: "wishlist", element: <Wishlist /> },
      ],
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
