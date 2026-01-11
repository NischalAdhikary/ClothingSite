import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/combo-box";
import { Input } from "@/components/ui/input";
const provinces = {
  "Province 1": [
    "Bhojpur",
    "Dhankuta",
    "Ilam",
    "Jhapa",
    "Khotang",
    "Morang",
    "Okhaldhunga",
    "Sankhuwasabha",
    "Solukhumbu",
    "Sunsari",
    "Taplejung",
    "Terhathum",
    "Udayapur",
  ],
  "Province 2": [
    "Bara",
    "Dhanusha",
    "Mahottari",
    "Parsa",
    "Rautahat",
    "Saptari",
    "Sarlahi",
    "Siraha",
  ],
  Bagmati: [
    "Bhaktapur",
    "Chitwan",
    "Dhading",
    "Dolakha",
    "Kabhrepalanchok",
    "Kathmandu",
    "Lalitpur",
    "Makwanpur",
    "Ramechhap",
    "Rasuwa",
    "Sindhuli",
    "Sindhupalchok",
  ],
  Gandaki: [
    "Baglung",
    "Gorkha",
    "Kaski",
    "Lamjung",
    "Manang",
    "Mustang",
    "Myagdi",
    "Nawalpur",
    "Syangja",
    "Tanahun",
  ],
  Lumbini: [
    "Arghakhanchi",
    "Banke",
    "Bardiya",
    "Dang",
    "Gulmi",
    "Kapilvastu",
    "Nawalparasi West",
    "Palpa",
    "Pyuthan",
    "Rolpa",
    "Rukum West",
    "Rupandehi",
  ],
};

export default function OrderAddress({
  userDetail,
  setDetail,
  onClose,
  onSubmit,
}) {
  const provincelist = Object.keys(provinces);
  const cityList = !!userDetail.province ? provinces[userDetail.province] : [];

  return (
    <div className=" w-full md:w-1/2 md:min-w-[400px] p-8 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Add Shipping Address
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Fields marked with * are required
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="fullName"
              value={userDetail.fullname}
              placeholder="Full Name"
              onChange={(e) =>
                setDetail({ ...userDetail, fullname: e.target.value })
              }
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <Input
              id="phone"
              value={userDetail.phone}
              type="tel"
              onChange={(e) =>
                setDetail({ ...userDetail, phone: e.target.value })
              }
              placeholder="+977 98XXXXXXXX"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="address1"
              className="block text-sm font-medium text-gray-700"
            >
              Address 1 (City/Tole) <span className="text-red-500">*</span>
            </label>
            <Input
              id="address1"
              value={userDetail.address1}
              onChange={(e) =>
                setDetail({ ...userDetail, address1: e.target.value })
              }
              placeholder="e.g.,City,Tole"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address2"
              className="block text-sm font-medium text-gray-700"
            >
              Address 2 (City/Tole)
            </label>
            <Input
              id="address2"
              onChange={(e) =>
                setDetail({ ...userDetail, address2: e.target.value })
              }
              value={userDetail.address2}
              placeholder="Optional"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700"
            >
              Province <span className="text-red-500">*</span>
            </label>
            <ComboboxDemo
              value={userDetail.province}
              items={provincelist}
              setValue={(val) =>
                setDetail({ ...userDetail, province: val, city: "" })
              }
              notfound={"No province found"}
              placeholder="Select province"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City <span className="text-red-500">*</span>
            </label>
            <ComboboxDemo
              value={userDetail.city}
              items={cityList}
              setValue={(val) => setDetail({ ...userDetail, city: val })}
              placeholder="Select city"
              notfound={"No city found"}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700"
          >
            Postal Code
          </label>
          <Input
            id="postalCode"
            onChange={(e) =>
              setDetail({ ...userDetail, postalcode: e.target.value })
            }
            value={userDetail.postalcode}
            placeholder="e.g., 44600"
            className="w-full max-w-xs"
          />
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <Button onClick={() => onSubmit()} className="px-6">
            Save Address
          </Button>
          <Button onClick={() => onClose()} className="bg-gray-200 text-black">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
