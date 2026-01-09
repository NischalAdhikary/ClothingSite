import { useState } from "react";
import OrderAddress from "./components/OrderAddress";

export default function Main() {
  const [userAddress, setUserAddress] = useState({
    fullname: "",
    phone: "",
    address1: "",
    address2: "",
    province: "",
    city: "",
    postalcode: "",
  });
  console.log(userAddress);

  return (
    <div className="w-full h-auto ">
      <div className="container md:p-10 flex items-center justify-center mx-auto">
        <OrderAddress userDeatil={userAddress} setDetail={setUserAddress} />
      </div>
    </div>
  );
}
