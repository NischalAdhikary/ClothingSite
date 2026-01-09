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
import AddressMain from "./pages/Client/useraddress/Main";
import CheckoutMain from "./pages/Client/checkout/CheckoutMain";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/product/:category/:subcategory?"
          element={<ProductMain />}
        />
        <Route path="/user/profile/address" element={<AddressMain />} />
        <Route path="/checkout" element={<CheckoutMain />} />

        <Route
          path="/product/:catgeory/:subcategory/:product"
          element={<Productdetailmain />}
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
