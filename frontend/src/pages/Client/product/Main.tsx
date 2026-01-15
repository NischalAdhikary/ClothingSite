import useProductClient from "@/hooks/useProductClient";
import ProductMain from "./components/ProductMain";
import { useParams } from "react-router-dom";
import BreadCrum from "@/components/layers/BreadCrum";
import Dropdown from "@/components/ui/dropdown";
import { useEffect, useState } from "react";

export default function Main() {
  const { category, subcategory } = useParams();
  const categoryId = category?.split("-").slice(1).join("-");
  const subCategoryId = subcategory?.split("-").slice(1).join("-");
  const [filter, setFilter] = useState(null);
  console.log(filter);
  const { getProductClient } = useProductClient(
    categoryId,
    subCategoryId,
    filter
  );
  const cardData = getProductClient?.data?.data;
  useEffect(() => {
    setFilter(null);
  }, [category, subcategory]);

  return (
    <div className="w-full h-full">
      <div className="container mx-auto p-10 space-y-4">
        <div className="h-14 flex items-center justify-between">
          <BreadCrum category={category} subcategory={subcategory} />
          <Dropdown value={filter} setValue={setFilter} />
        </div>
        <ProductMain cardData={cardData} />
      </div>
    </div>
  );
}
