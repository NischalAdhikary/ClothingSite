import ProductMain from "./components/ProductMain";
import { useParams } from "react-router-dom";

export default function Main() {
  const { category, subcategory } = useParams();

  const categoryId = category?.split("-").slice(1).join("-");
  const subCategoryId = subcategory?.split("-").slice(1).join("-");

  return (
    <>
      <ProductMain />
    </>
  );
}
