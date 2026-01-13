import useProductClient from "@/hooks/useProductClient";
import ProductMain from "./components/ProductMain";
import { useParams } from "react-router-dom";

export default function Main() {
  const { category, subcategory } = useParams();
  const categoryId = category?.split("-").slice(1).join("-");
  const subCategoryId = subcategory?.split("-").slice(1).join("-");
  const { getProductClient } = useProductClient(categoryId, subCategoryId);
  console.log(categoryId, subCategoryId);
  const cardData = getProductClient?.data?.data;

  return (
    <div className="w-full h-full">
      <div className="container mx-auto p-10">
        <ProductMain cardData={cardData} />
      </div>
    </div>
  );
}
