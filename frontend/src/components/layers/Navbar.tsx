import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Input } from "../ui/input";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import { useEffect, useState } from "react";
import Cart from "@/features/cart/Cart";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import OptionMenu from "../ui/option-menu";
import { Button } from "../ui/button";
import { useNavItems } from "@/hooks/useNavItems";

export const MobileView = ({ isSticky }: { isSticky: boolean }) => {
  const [toggleMenu, setToggleMenu] = useState(true);

  const handleClick = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div
      className={`w-full relative h-20 border-b flex md:hidden items-center transition-all duration-900 ease-in-out ${
        isSticky ? "sticky top-0 left-0 bg-white z-50 shadow-md" : ""
      }`}
    >
      <div className="w-full mx-auto max-w-7xl px-4 flex justify-between items-center gap-5 ">
        <div className="w-24 bg-red-500 h-14"></div>
        <Input type="text" placeholder="Search" />
        <div onClick={handleClick}>{toggleMenu ? <Menu /> : <X />}</div>
      </div>
      {!toggleMenu && (
        <div className=" bg-red-50 flex flex-col absolute bottom-[-50px] h-auto  w-full"></div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [toggleCart, setToggleCart] = useState(false);
  const { user, logout } = useAuth();
  const { getNavItems } = useNavItems();
  const loading = getNavItems.isLoading;
  const clothesData = getNavItems?.data?.data?.category;
  const navList = getNavItems?.data?.data?.categoryList;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const onToggleCart = () => {
    setToggleCart(!toggleCart);
  };
  const closeCart = () => {
    setToggleCart(false);
  };
  const handleUserClick = () => {
    if (!user) {
      navigate("/login");
      return;
    } else {
      setIsOpen(true);
    }
  };
  const handleLogOut = () => {
    logout();
    setIsOpen(false);
  };
  const onNavBarClick = (id) => {
    const slug = id.label + "-" + id.id;

    console.log(id);
    console.log(slug);
    navigate(`/product/${slug}`);
  };
  const onNavBarSubCategoryClick = (id) => {
    const { item, sub: cat } = id;
    console.log(id);
    const catgeorySlug = item.label + "-" + item.id;
    const subCategorySlug = cat.label + "-" + cat.id;
    console.log(catgeorySlug, subCategorySlug);
    navigate(`/product/${catgeorySlug}/${subCategorySlug}`);
  };
  const onProductClick = (obj) => {
    const { item, sub: cat, prod: product } = obj;
    const catgeorySlug = item.label + "-" + item.id;
    const subCategorySlug = cat.label + "-" + cat.id;
    const productSlug = product.name + "-" + product.id;
    navigate(`/product/${catgeorySlug}/${subCategorySlug}/${productSlug}`);
  };
  return (
    <>
      <MobileView isSticky={isSticky} />
      <div
        className={`w-full hidden md:flex h-24 bg-white relative z-50 transition-all duration-900 ease-in-out ${
          isSticky
            ? "sticky top-0 left-0 shadow-md border-b-0"
            : "border-b border-gray-200"
        }`}
      >
        <div
          className={`w-full mx-auto md:max-w-full flex gap-4  justify-between items-center  px-10 h-full `}
        >
          <div className="flex  basis-[600px]  items-center gap-8 md:gap-16">
            <div className="w-20 relative h-20  ">
              <img src="/clothinglogo.avif" className="absolute inset-0 " />
            </div>
            <ul className="flex w-full cursor-pointer h-full flex-1 justify-between  text-xl font-primary font-semibold ">
              {loading ? (
                <ul className="flex w-full flex-1 justify-between gap-4">
                  <li className="w-full h-6 rounded bg-gray-200 animate-pulse"></li>
                  <li className="w-full h-6 rounded bg-gray-200 animate-pulse"></li>
                  <li className="w-full  h-6 rounded bg-gray-200 animate-pulse"></li>
                  <li className="w-full  h-6 rounded bg-gray-200 animate-pulse"></li>
                </ul>
              ) : (
                navList?.map((item) => (
                  <li className="relative group" key={item.id}>
                    <HoverCard>
                      <HoverCardTrigger onClick={() => onNavBarClick(item)}>
                        {item.label}
                      </HoverCardTrigger>
                      <HoverCardContent className="absolute h-[300px] min-w-[500px] w-auto left-[-100px] bottom-[-335px]  bg-white shadow-xl rounded-lg">
                        {(() => {
                          const matchedCategory = clothesData?.find(
                            (cat) => cat.Category === item.label
                          );

                          if (!matchedCategory)
                            return <p className="text-center">No data found</p>;

                          return (
                            <div className="flex gap-8 ">
                              {matchedCategory.subCategory.map((sub) => (
                                <div
                                  key={sub.label}
                                  className="mb-4 gap-4 min-w-[100px]  flex flex-col"
                                >
                                  <h3
                                    onClick={() =>
                                      onNavBarSubCategoryClick({ item, sub })
                                    }
                                    className="font-semibold text-xl"
                                  >
                                    {sub.label}
                                  </h3>
                                  <ul className="space-y-1 text-gray-700">
                                    {sub.products.map((prod) => (
                                      <li
                                        key={prod.id}
                                        onClick={() =>
                                          onProductClick({ item, sub, prod })
                                        }
                                        className="text-sm hover:text-black"
                                      >
                                        {prod.name}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </HoverCardContent>
                    </HoverCard>

                    <span
                      className={`w-0 bg-blue-500 h-0.5 absolute left-0 bottom-[-35px] transition-all duration-300 group-hover:w-full`}
                    ></span>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="flex items-center flex-1   cursor-pointer   h-full gap-6 min-w-[150px]  max-w-lg">
            <Input type="text" placeholder="Search" />
            <div className="relative">
              {" "}
              <User size={26} onClick={handleUserClick} />
              {isOpen && (
                <OptionMenu onClose={() => setIsOpen(false)}>
                  <Button
                    onClick={handleLogOut}
                    className="rounded-none bg-gray-100 hover:bg-ggray-300 text-black shadow-md"
                  >
                    Logout
                  </Button>
                </OptionMenu>
              )}
            </div>
            <ShoppingCart onClick={onToggleCart} size={26} />
          </div>
        </div>
        {toggleCart && <Cart closeCart={closeCart} isOpen={toggleCart} />}
      </div>
    </>
  );
}
