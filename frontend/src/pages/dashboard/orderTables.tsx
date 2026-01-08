import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
const recentOrders = [
  {
    id: "ORD-1001",
    customer: "Nischal Adhikari",
    amount: 2500,
    status: "Pending",
    date: "2025-12-02",
    items: [
      { product: "Men's Hoodie", size: "M", color: "Red", quantity: 1 },
      { product: "T-shirt", size: "XL", color: "Black", quantity: 2 },
    ],
  },
  {
    id: "ORD-1002",
    customer: "Sita Sharma",
    amount: 1800,
    status: "Processing",
    date: "2025-12-02",
    items: [
      { product: "Women's Jeans", size: "32", color: "Blue", quantity: 1 },
    ],
  },
  {
    id: "ORD-1003",
    customer: "Ramesh Thapa",
    amount: 3200,
    status: "Shipped",
    date: "2025-12-02",
    items: [
      { product: "Sneakers", size: "9", color: "White", quantity: 1 },
      { product: "Winter Jacket", size: "L", color: "Grey", quantity: 1 },
    ],
  },
  {
    id: "ORD-1005",
    customer: "Ramesh Thapa",
    amount: 3200,
    status: "Shipped",
    date: "2025-12-02",
    items: [
      { product: "Sneakers", size: "9", color: "White", quantity: 1 },
      { product: "Winter Jacket", size: "L", color: "Grey", quantity: 1 },
    ],
  },
  {
    id: "ORD-1004",
    customer: "Ramesh Thapa",
    amount: 3200,
    status: "Shipped",
    date: "2025-12-02",
    items: [
      { product: "Sneakers", size: "9", color: "White", quantity: 1 },
      { product: "Winter Jacket", size: "L", color: "Grey", quantity: 1 },
    ],
  },
];

export default function RecentOrdersTable() {
  return (
    <Table className="w-full ">
      <TableCaption>Recent Orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <span>{item.product}</span>
                  <span className="text-sm text-gray-500">
                    ({item.size}/{item.color}) x{item.quantity}
                  </span>
                </div>
              ))}
            </TableCell>
            <TableCell
              className={
                order.status === "Pending"
                  ? "text-yellow-600"
                  : order.status === "Processing"
                  ? "text-blue-600"
                  : order.status === "Shipped"
                  ? "text-purple-600"
                  : "text-green-600"
              }
            >
              {order.status}
            </TableCell>
            <TableCell>₹{order.amount}</TableCell>
            <TableCell>{order.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
