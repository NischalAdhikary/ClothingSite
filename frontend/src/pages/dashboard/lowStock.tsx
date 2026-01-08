import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const lowStockProducts = [
  {
    id: 1,
    name: "Men's Hoodie",
    size: "M",
    color: "Red",
    stock: 3,
  },
  {
    id: 2,
    name: "Women's Jeans",
    size: "32",
    color: "Blue",
    stock: 2,
  },
  {
    id: 3,
    name: "T-shirt",
    size: "XL",
    color: "Black",
    stock: 0,
  },
  {
    id: 4,
    name: "Sneakers",
    size: "9",
    color: "White",
    stock: 4,
  },
  {
    id: 5,
    name: "Winter Jacket",
    size: "L",
    color: "Grey",
    stock: 1,
  },
];

export default function LowStockTable() {
  return (
    <Table>
      <TableCaption>Low Stock Products</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lowStockProducts.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.size}</TableCell>
            <TableCell>{item.color}</TableCell>
            <TableCell className={"text-red-500 font-semibold"}>
              {item.stock}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
