import { useAuth } from "@/hooks/useAuth";
import HeroSection from "./HeroSection";

import { Navigate } from "react-router-dom";

import ProductMain from "../Client/product/components/ProductMain";

export default function Home() {
  const { user } = useAuth();

  if (user && user.role === "admin") {
    return <Navigate to={"/admin/dashboard"} />;
  }
  return (
    <>
      <HeroSection />
      <ProductMain />
    </>
  );
}
