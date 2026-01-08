import { Button } from "@/components/ui/button";
import { useState } from "react";
import GeneralForm from "./generalForm";
import VariantForm from "./variantForm";

import { useCategory } from "@/hooks/useCategory";
import useProductMutation from "@/hooks/useProductMutation";

const productLabel = [
  {
    label: "General",
    value: "general",
  },
  {
    label: "Variants",
    value: "variants",
  },
];

export default function AddProduct({ onClose, product }) {
  const { createProductMutation } = useCategory();
  const { updateProductMutation } = useProductMutation();

  const isEditable = product ? true : false;
  console.log(isEditable);

  const [currentTab, setcurrentTab] = useState("general");
  const [visitedTab, setVisitedTab] = useState(
    product
      ? {
          general: true,
          variant: true,
          inventory: true,
        }
      : {
          general: true,
          variant: false,
          inventory: false,
        }
  );

  const [generalDetails, setgeneraDetails] = useState(
    product
      ? {
          id: product.productid,
          name: product.product_name,
          category: product.category_id,
          subcategory: product.subcategory_id,
          base_price: product.base_price,
          price: product.price,
          description: product.description,
        }
      : {
          name: "",
          category: "",
          subcategory: "",
          base_price: 0,
          price: 0,
          description: "",
        }
  );
  const originalGeneralData = product
    ? {
        id: product.productid,
        name: product.product_name,
        category: product.category_id,
        subcategory: product.subcategory_id,
        base_price: product.base_price,
        price: product.price,
        description: product.description,
      }
    : null;
  const originalVariantData = product ? product.variants : null;

  const [variant, setVariant] = useState(
    product
      ? product.variants.map((v) => ({
          ...v,
          isNew: false,
          isEdited: false,
          isDeleted: false,
        }))
      : []
  );

  const onClick = async () => {
    const currentIndex = productLabel.findIndex(
      (item) => item.value === currentTab
    );

    const nextIndex = currentIndex + 1;
    if (nextIndex < productLabel.length) {
      setcurrentTab(productLabel[nextIndex].value);

      setVisitedTab({ ...visitedTab, [productLabel[nextIndex].value]: true });
    } else {
      try {
        await createProductMutation.mutateAsync({
          product: generalDetails,
          variant,
        });
        setgeneraDetails({
          name: "",
          category: "",
          subcategory: "",
          base_price: 0,
          price: 0,
          description: "",
        });
        setVariant([]);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const onEditClick = async () => {
    const generalUpdated = {};

    console.log(generalUpdated);
    const currentTabIndex = productLabel.findIndex(
      (i) => i.value === currentTab
    );
    if (generalDetails.name !== originalGeneralData?.name) {
      generalUpdated.name = generalDetails.name;
    }
    if (generalDetails.category !== originalGeneralData?.category) {
      generalUpdated.category = generalDetails.category;
    }
    if (generalDetails.subcategory !== originalGeneralData?.subcategory) {
      generalUpdated.subcategory = generalDetails.subcategory;
    }
    if (generalDetails.base_price !== originalGeneralData?.base_price) {
      generalUpdated.base_price = generalDetails.base_price;
    }
    if (generalDetails.price !== originalGeneralData?.price) {
      generalUpdated.price = generalDetails.price;
    }
    if (generalDetails.description !== originalGeneralData?.description) {
      generalUpdated.description = generalDetails.description;
    }

    const nextIndex = currentTabIndex + 1;
    if (nextIndex < productLabel.length) {
      console.log("from inside nextindex");

      setcurrentTab(productLabel[nextIndex].value);
    } else {
      const payload = {
        productid: product?.productid,
        product: generalUpdated,
        variants: {
          newAdded: variant
            .filter((v) => v.isNew)
            .map((i) => {
              return {
                variant_id: i.variant_id,
                color_id: i.color_id,
                size_id: i.size_id,
                stock: i.quantity,
              };
            }),
          edited: variant
            .filter((v) => v.isEdited)
            .map((i) => ({
              variant_id: i.variant_id,
              color_id: i.color_id,
              size_id: i.size_id,
              stock: i.quantity,
            })),
          deleted: variant
            .filter((v) => v.isDeleted && !v.isNew)
            .map((i) => ({ variant_id: i.variant_id })),
        },
      };
      console.log("Final payload", payload);

      try {
        const res = updateProductMutation.mutateAsync(payload);
        console.log("Update response", res);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const isCurrentTabValid = () => {
    if (product) return true;
    switch (currentTab) {
      case "general":
        return (
          generalDetails.name.trim() !== "" &&
          generalDetails.category.trim() !== "" &&
          generalDetails.subcategory.trim() !== "" &&
          generalDetails.price > 0 &&
          generalDetails.base_price > 0
        );
      case "variants":
        return variant.length > 0;

      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-white/50 h-screen w-full  z-50 flex justify-between items-center  ">
      <div className="container bg-white  mx-auto max-w-4xl min-h-[70vh] max-h-[80vh] border  h-auto rounded flex gap-2  ">
        <div className="bg-white basis-1/4 flex flex-col">
          {productLabel.map((item) => {
            return (
              <Button
                onClick={() => setcurrentTab(item.value)}
                className={`bg-gray-200 rounded-none text-black w-full ${
                  currentTab === item.value
                    ? "border-b border-blue-600"
                    : "border-none"
                } `}
                disabled={!visitedTab[item.value]}
                variant={"default"}
                key={item.value}
              >
                {item.label}
              </Button>
            );
          })}
        </div>
        <div className="p-2 flex-1  flex flex-col gap-4">
          <div className=" w-full h-full max-h-[90%]">
            {currentTab === "general" && (
              <GeneralForm
                product={generalDetails}
                setProdcuts={setgeneraDetails}
              />
            )}
            {currentTab === "variants" && (
              <VariantForm
                product={generalDetails.name}
                isEditable={isEditable}
                variants={variant}
                setVariants={setVariant}
              />
            )}
          </div>

          <div className="w-full h-8 flex justify-end gap-2 items-center">
            <Button
              disabled={!isCurrentTabValid()}
              onClick={product ? onEditClick : onClick}
              className="h-full"
            >
              {createProductMutation.isPending ? "Saving ..." : "Next"}
            </Button>
            <Button
              onClick={onClose}
              variant={"destructive"}
              className="h-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
