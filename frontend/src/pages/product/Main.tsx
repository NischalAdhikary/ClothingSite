import ProductHeader from "@/features/products/productHeader";

import ProductTable from "./components/table";
import useProduct from "@/hooks/useProduct";
import { useState } from "react";

import PaginationAdvanced from "@/components/layers/PaginationAdvance";

export default function Main() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [query, setQuery] = useState("");

  const { getProducts, getFilteredProducts, isFiltering } = useProduct(
    page,
    6,
    category,
    subCategory
  );
  const data = isFiltering
    ? getFilteredProducts?.data?.data
    : getProducts?.data?.data;
  const loading = isFiltering
    ? getFilteredProducts.isLoading
    : getProducts.isLoading;

  const totalPages = isFiltering
    ? getFilteredProducts?.data?.total
    : getProducts?.data?.totalPages;

  return (
    <>
      <ProductHeader
        category={category}
        subcategory={subCategory}
        setPage={setPage}
        query={query}
        setCategory={setCategory}
        setSubCategory={setSubCategory}
        setQuery={setQuery}
      />
      <ProductTable data={data} loading={loading} />

      {totalPages && totalPages > 0 && (
        <PaginationAdvanced
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        />
      )}
    </>
  );
}
