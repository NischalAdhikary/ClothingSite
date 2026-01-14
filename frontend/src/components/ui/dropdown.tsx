import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const items = [
  {
    label: "Price low to high",
    value: "price_asc",
  },
  {
    label: "Price high to low",
    value: "price_desc",
  },
  {
    label: "Date old to new",
    value: "date_asc",
  },
  {
    label: "Date new to old",
    value: "date_desc",
  },
];
export default function Dropdown({ value, setValue }) {
  const [open, setOpen] = useState(false);
  const divRef = useRef(null);
  const onToggle = () => {
    setOpen(!open);
  };
  const handleClickOutside = (e) => {
    if (divRef.current && !divRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={divRef}
      onClick={onToggle}
      className="w-[250px] relative  cursor-pointer  p-2 border border-black rounded flex justify-between items-center"
    >
      <span>
        {value && items.length > 0
          ? items?.find((i) => i.value === value)?.label
          : "Filter By"}
      </span>
      <span
        className={`transition-rotate duration-300 ${open ? "rotate-180" : ""}`}
      >
        <ChevronDown />
      </span>
      {open && (
        <div className="absolute z-50 bg-white  top-full overflow-hidden mt-1 rounded left-0 border border-black w-full h-auto">
          <ul className="border-black">
            {items && items.length > 0 ? (
              items.map((item) => (
                <li
                  key={item.label}
                  onClick={() => {
                    setValue(item.value);
                    setOpen(false);
                  }}
                  className={`p-2 border-b transiotion-all duration-300 ease-in-out hover:bg-gray-100 ${
                    item.value === value ? "bg-gray-200 font-medium" : ""
                  }`}
                >
                  {item.label}
                </li>
              ))
            ) : (
              <li className="p-2">No items found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
