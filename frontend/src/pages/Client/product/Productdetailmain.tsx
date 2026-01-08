import ProductDetails from "./components/productdetails";
import { useParams } from "react-router-dom";
import { useProductDetails } from "@/hooks/useProductdetails";
import { useEffect, useState } from "react";

export default function Productdetailmain() {
  const [selectedSizeAndColor, setSelectedSizeAndColor] = useState({
    size: null,
    color: null,
  });

  const { product } = useParams();
  const splitproduct = product?.indexOf("-");
  const productId = product?.slice(splitproduct + 1);
  const { getProductDetails } = useProductDetails(productId || null);
  const variants = getProductDetails?.data?.variants;

  const colors = getProductDetails?.data?.variants?.map((v) => v.color) ?? [];
  const uniqueColors = [...new Map(colors.map((c) => [c.id, c])).values()];
  const sizes = getProductDetails?.data?.variants?.map((v) => v.size) ?? [];
  const uniqueSizes = [...new Map(sizes.map((c) => [c.id, c])).values()];

  const selectedVariant =
    !selectedSizeAndColor.size || !selectedSizeAndColor.color
      ? null
      : variants?.find(
          (v) =>
            v.color.id === selectedSizeAndColor.color &&
            v.size.id === selectedSizeAndColor.size
        );

  useEffect(() => {
    setSelectedSizeAndColor({
      size: null,
      color: null,
    });
  }, [productId]);

  return (
    <ProductDetails
      loading={getProductDetails.isLoading}
      size={uniqueSizes}
      color={uniqueColors}
      selectedColor={selectedSizeAndColor.color}
      selectedSize={selectedSizeAndColor.size}
      variant={selectedVariant}
      setSizeAndColor={setSelectedSizeAndColor}
      variants={variants}
      data={getProductDetails.data}
    />
  );
}
