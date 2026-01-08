import LowStockTable from "./lowStock";
import RecentOrdersTable from "./orderTables";

export default function Dashboardtable() {
  return (
    <div className="w-full h-[400px] flex ">
      <div className="h-full w-full overflow-y-auto gap-4 flex">
        <div className="bg-white h-full  basis-[500px]">
          <LowStockTable />
        </div>

        <div className=" flex-1 h-full">
          <RecentOrdersTable />
        </div>
      </div>
    </div>
  );
}
