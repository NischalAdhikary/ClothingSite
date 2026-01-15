import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/combo-box";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVariant } from "@/hooks/useVariant";
import { Edit, Plus, Save, Trash } from "lucide-react";
import { useState } from "react";

export default function VariantForm({
  product,
  variants,
  setVariants,
  isEditable,
}) {
  const { fetchAllColors, fetchAllSizes } = useVariant();
  const sizes = fetchAllSizes.data?.data;
  const colors = fetchAllColors.data?.data;

  const getColorsName = (id: string) => {
    return colors.find((color: string) => color.id === id)?.name;
  };
  const getSizeName = (id: string) => {
    return sizes.find((size: string) => size.id === id)?.name;
  };

  const [solovariant, setSoloVariants] = useState({
    size_id: "",
    color_id: "",
    quantity: 0,
  });

  const [editIndex, setEditIndex] = useState(null);

  const onAddClick = () => {
    const { color_id, size_id, quantity } = solovariant;
    const exist = variants?.some((v) => {
      if (v.color_id === color_id && v.size_id === size_id) {
        return true;
      } else {
        return false;
      }
    });
    if (exist) {
      console.log("cant procced this variant already exists");
      return;
    }

    if (color_id && size_id && quantity > 0) {
      setVariants((prev) => [
        ...prev,
        isEditable
          ? { ...solovariant, isNew: true, isEdited: false, isDeleted: false }
          : { ...solovariant },
      ]);
      setSoloVariants({
        color_id: "",
        quantity: 0,
        size_id: "",
      });
    }
  };
  const onDelete = (index: number) => {
    if (isEditable) {
      setVariants((prev) =>
        prev.map((v, i) => (i === index ? { ...v, isDeleted: true } : v))
      );
    } else {
      setVariants((prev) => prev.filter((v, i) => i !== index));
    }
  };
  const onEdit = (index) => {
    setEditIndex(index);

    const editVariant = variants[index];
    if (editVariant) {
      setSoloVariants(editVariant);
    }
  };

  const onSave = () => {
    setVariants((prev) => {
      const updated = [...prev];
      if (isEditable) {
        updated[editIndex] = {
          ...solovariant,
          isNew: false,
          isEdited: true,
          isDeleted: false,
        };
        return updated;
      }
      updated[editIndex] = {
        ...solovariant,
      };

      return updated;
    });

    setSoloVariants({ size_id: "", color_id: "", quantity: 0 });
    setEditIndex(null);
  };

  return (
    <div className="w-full h-full flex flex-col gap-3  text-black">
      <h1 className="text-xl font-bold font-primary">
        Select Variants For{" "}
        <span className="text-2xl text-blue-500">{product}</span>
      </h1>
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <label className="text-sm font-semibold font-primary" htmlFor="">
            Size
          </label>
          <ComboboxDemo
            value={solovariant.size_id}
            setValue={(val) =>
              setSoloVariants({ ...solovariant, size_id: val })
            }
            notfound={"Size Unaavailable"}
            placeholder={"Select size ...."}
            items={fetchAllSizes.data?.data}
            loading={fetchAllSizes.isLoading}
          />
        </div>
        <div className="flex-1">
          <label className="text-sm font-semibold font-primary" htmlFor="">
            Color
          </label>
          <ComboboxDemo
            value={solovariant.color_id}
            setValue={(val) =>
              setSoloVariants({ ...solovariant, color_id: val })
            }
            placeholder={"Select colour ....."}
            items={fetchAllColors.data?.data}
            notfound={"Color unavailable"}
            loading={fetchAllColors.isLoading}
          />
        </div>
        <div>
          <label className="text-sm font-semibold font-primary" htmlFor="">
            Stock
          </label>
          <Input
            value={solovariant.quantity}
            onChange={(e) =>
              setSoloVariants({ ...solovariant, quantity: e.target.value })
            }
            type="number"
          />
        </div>
        {!editIndex && editIndex !== 0 ? (
          <Button onClick={onAddClick} className="mt-5">
            <Plus />
          </Button>
        ) : (
          <Button onClick={onSave} className="mt-5">
            <Save />
          </Button>
        )}
      </div>
      {variants && variants.length > 0 && (
        <div className="w-auto overflow-x-auto h-auto overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Color</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants
                .filter((v) => !v.isDeleted)
                .map((item, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{product}</TableCell>
                    <TableCell className="font-medium ">
                      {getSizeName(item.size_id)}
                    </TableCell>
                    <TableCell className="font-medium ">
                      {getColorsName(item.color_id)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Edit size={16} onClick={() => onEdit(index)} />
                      <Trash
                        className="text-red-600"
                        size={16}
                        onClick={() => onDelete(index)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
