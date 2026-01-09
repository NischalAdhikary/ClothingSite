import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CartCard from "@/features/cart/CartCard";
import { MapPin } from "lucide-react";
import { useCart } from "@/hooks/useCarts";

export default function CheckoutMain() {
  const { carts } = useCart();

  const userdetails = true;
  const user = {
    fullname: "NischalAdhikari",
    province: "Koshi",
    city: "Biratnagar",
    phone: "9800000000",
    address1: "Bargachi,jamungachi",
  };
  return (
    <div className="w-full h-auto p-0 md:p-10 ">
      <div className="container mx-auto w-full md:max-w-5xl bg-gray-100 p-6 flex flex-col gap-8">
        {!!userdetails ? (
          <div className="w-full p-4 bg-white rounded">
            <div className="flex items-center justify-between">
              <h1 className=" text-lg md:text-xl flex items-center gap-3 font-semibold font-primary">
                <MapPin size={18} />
                <span>
                  {" "}
                  {user.fullname}, {user.phone}
                </span>
              </h1>
              <Button>Edit</Button>
            </div>
            <p className="text-sm font-medium font-primary">
              {user.address1},{user.province},{user.city}
            </p>
          </div>
        ) : (
          <div className="p-4 bg-white flex justify-between items-center rounded">
            <h1 className=" text-lg md:text-xl flex items-center gap-3 font-semibold font-primary">
              <span>
                <MapPin size={18} />
              </span>
              Add User Deatils For Shipping the Products
            </h1>
            <Button>Add</Button>
          </div>
        )}
        <div className="bg-white rounded shadow-sm space-y-8 p-4">
          <h1 className="text-lg md:text-xl font-semibold font-primary">
            Order Summary
          </h1>
          {carts.map((cart) => {
            return <CartCard key={cart.variantid} data={cart} />;
          })}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold font-primary">Subtotal</h1>
            <h1 className="text-xl font-semibold font-primary">Rs.3000</h1>
          </div>
          <div className="border-t-2  p-2  flex justify-between items-center">
            <h1 className="text-xl font-semibold font-primary">Total</h1>
            <h1 className="text-xl font-semibold font-primary">Rs.3000</h1>
          </div>
        </div>
        <div className="bg-white rounded shadow-sm space-y-8 p-4">
          <h1 className="text-xl font-semibold font-primary">
            Choose Payment Method
          </h1>
          <div className="flex gap-8">
            <Card className="p-6 shadow-md">COD</Card>
            <Card className="p-6 shadow-md">Esewa</Card>
          </div>
        </div>
        <Button>Procced</Button>
      </div>
    </div>
  );
}
