import SidePanel from "@/components/ui/side-panel";
import { X } from "lucide-react";
import CartCard from "./CartCard";
import { Button } from "@/components/ui/button";
import useLockBodyScroll from "@/hooks/useLockMainScroll";
import { useCart } from "@/hooks/useCarts";
export default function Cart({
  closeCart,
  isOpen,
}: {
  closeCart: () => void;
  isOpen: boolean;
}) {
  useLockBodyScroll(isOpen);
  const { carts } = useCart();

  return (
    <SidePanel>
      <div className="min-h-screen flex flex-col px-4 py-4 gap-3 justify-between">
        <div className="w-full h-full flex flex-col gap-4">
          <div className="flex  justify-between items-center">
            <h1 className="text-xl">Cart {carts.length}</h1>
            <X onClick={closeCart} className="cursor-pointer" />
          </div>
          <div className="h-auto overflow-y-auto flex flex-col gap-4  ">
            {carts && carts.length > 0 ? (
              carts.map((cart) => <CartCard key={cart.variantid} data={cart} />)
            ) : (
              <div className="text-xl text-center">Cart is Empty</div>
            )}
          </div>
        </div>
        <Button
          disabled={carts.length > 0 ? false : true}
          className="bg-blue-600"
        >
          Check Out
        </Button>
      </div>
    </SidePanel>
  );
}
