import { useCartStore } from "@/store/cart";
export function useCart() {
  const carts = useCartStore((state) => state.carts);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  return {
    carts,
    addToCart,
    removeFromCart,
  };
}
