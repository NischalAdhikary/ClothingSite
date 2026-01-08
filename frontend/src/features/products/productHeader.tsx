import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/combo-box";
import { Input } from "@/components/ui/input";
import { useCategory } from "@/hooks/useCategory";
import { Plus, RefreshCw } from "lucide-react";
import { useState } from "react";
import AddProduct from "./addproduct";
export default function ProductHeader({
  category,
  subcategory,
  query,
  setCategory,
  setSubCategory,
  setQuery,
  setPage,
}) {
  const [addProduct, setAddProduct] = useState(false);

  const { getAllCategory } = useCategory(null);

  const categoryItems = getAllCategory?.data?.data;
  const { getSubcategoryByCategoryId } = useCategory(category);
  const subCategoryItems = getSubcategoryByCategoryId?.data?.data;
  const CategoryLoading = getAllCategory.isLoading;
  const subCategoryLoading = getSubcategoryByCategoryId.isLoading;

  const handleCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  return (
    <div className="w-full h-auto md:h-20 p-4 flex flex-col gap-4 md:flex-row bg-gray-100 justify-between">
      <div className="flex md:flex-row flex-col flex-1 gap-2">
        <div className="flex gap-3">
          <Button
            onClick={() => setAddProduct(true)}
            className="bg-white border border-black"
          >
            <Plus className="text-black" size={26} />
          </Button>
          <Button className="bg-white border border-black">
            <RefreshCw className="text-black" size={26} />
          </Button>
        </div>

        <div className="flex md:flex-row  flex-col gap-4">
          <ComboboxDemo
            setValue={handleCategory}
            value={category}
            items={categoryItems}
            loading={CategoryLoading}
            placeholder={"Search Categories"}
            notfound={"Not Found"}
          />
          <ComboboxDemo
            setValue={setSubCategory}
            value={subcategory}
            items={subCategoryItems}
            loading={subCategoryLoading}
            placeholder={"Search subcategories"}
            notfound={"Not Found"}
          />
        </div>
      </div>

      <div className="w-full min-w-[100px] max-w-[400px]">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ..."
        />
      </div>
      {addProduct && <AddProduct onClose={() => setAddProduct(false)} />}
    </div>
  );
}
