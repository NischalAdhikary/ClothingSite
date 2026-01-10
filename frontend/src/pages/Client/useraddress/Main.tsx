import { useRef, useState } from "react";
import OrderAddress from "./components/OrderAddress";
import useUserDetailsMutate from "@/hooks/useUserDetailsMutate";
const dataBaseMatch = {
  fullname: "fullname",
  phone: "phone",
  address1: "address_line_1",
  address2: "address_line_2",
  city: "city",
  province: "province",
  postalcode: "postal_code",
};
export default function Main({ onClose, data, edit = false }) {
  const [userAddress, setUserAddress] = useState({
    fullname: data?.fullname || "",
    phone: data?.phone || "",
    address1: data?.address1 || "",
    address2: data?.address2 || "",
    province: data?.province || "",
    city: data?.city || "",
    postalcode: data?.postalcode || "",
  });
  const originalAddress = useRef(
    data
      ? {
          fullname: data?.fullname,
          phone: data?.phone,
          address1: data?.address1,
          address2: data?.address2,
          province: data?.province,
          city: data?.city,
          postalcode: data?.postalcode,
        }
      : null
  );
  const EMPTY_ADDRESS = {
    fullname: "",
    phone: "",
    address1: "",
    address2: "",
    province: "",
    city: "",
    postalcode: "",
  };

  const { createUserDetail, updatedUserDetail } = useUserDetailsMutate();
  console.log("changable", userAddress);
  console.log("constant ", originalAddress.current);
  const onSubmit = () => {
    if (edit) {
      const updatedField = {};
      for (const key in userAddress) {
        if (userAddress[key] !== originalAddress.current[key]) {
          updatedField[dataBaseMatch[key]] = userAddress[key];
        }
      }
      if (Object.keys(updatedField).length === 0) {
        console.log("No Changes Made To update");
        return;
      }
      updatedUserDetail.mutate(updatedField, {
        onSuccess: () => {
          setUserAddress(EMPTY_ADDRESS);
          onClose();
        },
        onError: () => {
          console.log("Unable to update");
        },
      });
    } else {
      if (
        !userAddress.fullname ||
        !userAddress.address1 ||
        !userAddress.city ||
        !userAddress.province ||
        !userAddress.phone
      ) {
        console.log("you must fill the required filled");
        return;
      }
      createUserDetail.mutate(userAddress, {
        onSuccess: () => {
          onClose();
          setUserAddress(EMPTY_ADDRESS);
        },
        onError: (e) => {
          alert(e);
        },
      });
    }
  };
  return (
    <div className="fixed bg-black/50 inset-0 z-50 flex items-center justify-center">
      <div className="container md:p-10 flex items-center justify-center mx-auto">
        <OrderAddress
          onSubmit={onSubmit}
          userDetail={userAddress}
          setDetail={setUserAddress}
          onClose={() => {
            onClose();
            setUserAddress(EMPTY_ADDRESS);
          }}
        />
      </div>
    </div>
  );
}
