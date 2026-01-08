import { ComboboxDemo } from "@/components/ui/combo-box";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCategory } from "@/hooks/useCategory";

export default function GeneralForm({ product, setProdcuts }) {
  const { getAllCategory } = useCategory(null);

  const categoty = getAllCategory?.data?.data;
  console.log("Edit console category", product.category);
  const { getSubcategoryByCategoryId } = useCategory(product?.category || null);

  const subcategory = getSubcategoryByCategoryId?.data?.data;

  console.log("Edit subcategory list", subcategory);

  return (
    <div className="w-full h-full ">
      <form className="w-full h-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2">
          <label className="text-md font-primary font-semibold">
            Name
            <span className="text-red-500"> *</span>
          </label>
          <Input
            onChange={(e) => setProdcuts({ ...product, name: e.target.value })}
            value={product.name}
            type="text"
            placeholder="Tshirt"
          />
        </div>

        <div className="w-full flex gap-8">
          <div className="w-full flex flex-col gap-2">
            <label className="text-md font-primary font-semibold">
              Category
              <span className="text-red-500"> *</span>
            </label>
            <ComboboxDemo
              loading={getAllCategory.isLoading}
              placeholder={"Select Category"}
              value={product.category}
              setValue={(val) => setProdcuts({ ...product, category: val })}
              notfound={"No category found"}
              items={categoty}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="text-md font-primary font-semibold">
              Subcategory
              <span className="text-red-500"> *</span>
            </label>
            <ComboboxDemo
              loading={getSubcategoryByCategoryId.isLoading}
              value={product.subcategory}
              setValue={(val) => setProdcuts({ ...product, subcategory: val })}
              placeholder={"Select subcategory"}
              notfound={"No subcategory found"}
              items={subcategory}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-md  font-primary font-semibold">
              Base Price
              <span className="text-red-500"> *</span>
            </label>
            <Input
              onChange={(e) =>
                setProdcuts({ ...product, base_price: e.target.value })
              }
              value={product.base_price}
              type="number"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-md font-primary font-semibold">
              Price
              <span className="text-red-500"> *</span>
            </label>
            <Input
              value={product.price}
              onChange={(e) =>
                setProdcuts({ ...product, price: e.target.value })
              }
              type="number"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-md font-primary font-semibold">
            Description
          </label>
          <Textarea
            value={product.description}
            onChange={(e) =>
              setProdcuts({ ...product, description: e.target.value })
            }
            className="h-[50px] max-h-[100px]"
          />
        </div>
      </form>
    </div>
  );
}
