import Login from "./pages/login/Login";
import UserLayout from "./layout/UserLayout";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Authsuccess from "./pages/login/Authsuccess";

import { AdminLayout } from "./layout/AdminLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import Main from "./pages/product/Main";
import ProtectedRoute from "./routes/Protectedroute";
import ProductMain from "./pages/Client/product/Main";
import Productdetailmain from "./pages/Client/product/Productdetailmain";

import CheckoutMain from "./pages/Client/checkout/CheckoutMain";
import LoggedUser from "./routes/LoggedUser";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/product/detail/:product"
          element={<Productdetailmain />}
        />
        <Route
          path="/product/:category/:subcategory?"
          element={<ProductMain />}
        />

        <Route
          path="/checkout"
          element={
            <LoggedUser>
              <CheckoutMain />
            </LoggedUser>
          }
        />
      </Route>
      <Route path="/auth/success/" element={<Authsuccess />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/admin/dashboard/product" element={<Main />} />
      </Route>
    </Routes>
  );
}
