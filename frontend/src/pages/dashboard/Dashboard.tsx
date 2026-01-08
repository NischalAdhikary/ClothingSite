import { Card } from "@/components/ui/card";
import { BadgeDollarSign, ShoppingBag, Package, Users } from "lucide-react";
import Dashboardtable from "./dashboardtable";
import LineChartExample from "@/charts/Line";
import LowStockTable from "./lowStock";
import RecentOrdersTable from "./orderTables";

export default function Dashboard() {
  const stats = [
    {
      title: "Today's Sale",
      value: "₹4,000",
      icon: <BadgeDollarSign size={28} />,
      iconBg: "bg-green-100 text-green-700",
    },
    {
      title: "Today's Orders",
      value: "12",
      icon: <ShoppingBag size={28} />,
      iconBg: "bg-blue-100 text-blue-700",
    },
    {
      title: "Total Products",
      value: "140",
      icon: <Package size={28} />,
      iconBg: "bg-orange-100 text-orange-700",
    },
    {
      title: "Total Customers",
      value: "320",
      icon: <Users size={28} />,
      iconBg: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="w-full h-full p-4 flex flex-col  gap-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <Card
            key={index}
            className="p-4 min-h-[130px] h-[140px] flex items-center gap-4 border rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.iconBg}`}
            >
              {item.icon}
            </div>

            <div>
              <p className="text-sm text-gray-600">{item.title}</p>
              <h1 className="text-2xl font-semibold">{item.value}</h1>
            </div>
          </Card>
        ))}
      </div>
      <div className="w-full h-[400px] flex ">
        <div className="h-full w-full  gap-4 flex flex-col md:flex-row">
          <div className="flex-1 ">
            <LineChartExample />
          </div>
          <div className="bg-white h-full basis-[500px]">
            <LowStockTable />
          </div>
        </div>
      </div>
      <RecentOrdersTable />
    </div>
  );
}
