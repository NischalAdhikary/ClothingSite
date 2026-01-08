import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChevronDown, Loader2, Pencil, Trash } from "lucide-react";
import DeleteModal from "@/components/ui/deleteModal";

import useProductById from "@/hooks/useProductbyId";
import useDeleteProduct from "@/hooks/useDeleteProduct";
import AddProduct from "@/features/products/addproduct";
import { useVariant } from "@/hooks/useVariant";

export default function ProductTable({ data, loading }) {
  const [expandedId, setExpandedId] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteVariantModal, setDleteVariantModal] = useState(false);
  const [deleteVariantId, setDeleteVariantId] = useState(null);
  const { getProductById } = useProductById(deleteId, deleteModal, "product");
  const { getProductVariantById } = useProductById(
    deleteVariantId,
    deleteVariantModal,
    "productvariant"
  );
  const { deleteProductMutation, deleteProductVariantMutation } =
    useDeleteProduct();
  const { fetchAllColors, fetchAllSizes } = useVariant();
  const sizes = fetchAllSizes.data?.data;
  const colors = fetchAllColors.data?.data;

  const getColorsName = (id: string) => {
    return colors.find((color) => color.id === id)?.name;
  };
  const getSizeName = (id: string) => {
    return sizes.find((size) => size.id === id)?.name;
  };
  const onDeleteClick = (checkType: string) => {
    if (checkType === "product" && deleteId) {
      deleteProductMutation.mutate(deleteId, {
        onSuccess: () => {
          setDeleteModal(false);
          setDeleteId(null);
        },
      });
    } else if (checkType === "productvariant" && deleteVariantId) {
      deleteProductVariantMutation.mutate(deleteVariantId, {
        onSuccess: () => {
          setDleteVariantModal(false);
          setDeleteVariantId(null);
        },
      });
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      {loading ? (
        <div className="h-[40vh] w-full flex items-center justify-center">
          <Loader2 />
        </div>
      ) : !data || data.length === 0 ? (
        <Table>
          <TableCaption>No Data Available</TableCaption>
        </Table>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-2">Name</TableHead>
              <TableHead className="p-2">Price</TableHead>
              <TableHead className="p-2">Description</TableHead>
              <TableHead className="p-2">Variants</TableHead>
              <TableHead className="p-2">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <>
                <TableRow key={item.productid}>
                  <TableCell className="p-2">{item.product_name}</TableCell>

                  <TableCell className="p-2">Rs.{item.price}</TableCell>
                  <TableCell className="p-2  max-w-[150px]">
                    {item.description || "-"}
                  </TableCell>

                  <TableCell
                    className="p-2 flex gap-1 cursor-pointer select-none"
                    onClick={() => toggleExpand(item.productid)}
                  >
                    {item.variants?.length ?? 0}
                    <ChevronDown
                      className={`transition-transform ${
                        expandedId === item.productid ? "rotate-180" : ""
                      }`}
                    />
                  </TableCell>

                  <TableCell className="p-2">
                    <Pencil
                      onClick={() => {
                        setEditProductId(item);
                        setEditModal(true);
                      }}
                      size={18}
                      className="inline-block cursor-pointer mr-2"
                    />
                    <Trash
                      size={18}
                      onClick={() => {
                        setDeleteModal(true);
                        setDeleteId(item.productid);
                      }}
                      className="inline-block cursor-pointer text-red-500"
                    />
                  </TableCell>
                </TableRow>

                {expandedId === item.productid && (
                  <TableRow className="bg-gray-50 ">
                    <TableCell colSpan={4} className="p-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Color</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody className="w-full">
                          {item.variants.map((v, index) => (
                            <TableRow key={v.variant_id}>
                              <TableCell>{getColorsName(v.color_id)}</TableCell>
                              <TableCell>{getSizeName(v.size_id)}</TableCell>
                              <TableCell>{v.quantity}</TableCell>
                              <TableCell className="flex gap-1">
                                <Pencil size={18} />
                                <Trash
                                  onClick={() => {
                                    setDleteVariantModal(true);
                                    setDeleteVariantId(v.variant_id);
                                  }}
                                  size={18}
                                  className="text-red-500"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      )}
      {deleteModal && (
        <DeleteModal
          isOpen={deleteModal}
          confirm={() => onDeleteClick("product")}
          onClose={() => setDeleteModal(false)}
          loading={getProductById.isLoading}
          deleteloading={deleteProductMutation.isPending}
        />
      )}
      {deleteVariantModal && (
        <DeleteModal
          isOpen={deleteVariantModal}
          confirm={() => onDeleteClick("productvariant")}
          onClose={() => setDleteVariantModal(false)}
          loading={getProductVariantById.isLoading}
          deleteloading={deleteProductVariantMutation.isPending}
        />
      )}
      {editModal && (
        <AddProduct
          onClose={() => {
            setEditModal(false);
            setEditProductId(null);
          }}
          product={editProductId}
        />
      )}
    </>
  );
}
