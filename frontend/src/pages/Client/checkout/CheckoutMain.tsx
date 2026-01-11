import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CartCard from "@/features/cart/CartCard";
import { MapPin } from "lucide-react";
import { useCart } from "@/hooks/useCarts";
import useGetUserDetails from "@/hooks/useGetUserDeatails";
import Main from "../useraddress/Main";
import { useState } from "react";
import Loading from "@/components/layers/Loading";

export default function CheckoutMain() {
  const { carts } = useCart();
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const { getUserDetail } = useGetUserDetails();
  const userDetailLoading = getUserDetail.isLoading;
  if (userDetailLoading) {
    return <Loading />;
  }

  const userdetails = getUserDetail.data.data;

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
                  {userdetails.fullname}, {userdetails.phone}
                </span>
              </h1>
              <Button onClick={() => setEditModal(true)}>Edit</Button>
            </div>
            <p className="text-sm font-medium font-primary">
              {userdetails.address1},{userdetails.province},{userdetails.city}
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
            <Button onClick={() => setAddModal(true)}>Add</Button>
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
        {editModal && (
          <Main
            edit={true}
            data={userdetails}
            onClose={() => setEditModal(false)}
          />
        )}
        {addModal && (
          <Main
            edit={false}
            data={userdetails}
            onClose={() => {
              setAddModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
