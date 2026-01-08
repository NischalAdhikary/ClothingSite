import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useCartStore = create(
  persist(
    (set) => ({
      carts: [],
      addToCart: (item) =>
        set((state) => {
          const exist = state.carts.find(
            (c) => c.variantid === item.variantid && c.id === item.id
          );
          if (exist) {
            return {
              carts: state.carts.map((c) =>
                c.variantid === item.variantid
                  ? {
                      ...c,
                      quantity: c.quantity + 1,
                      price: c.price + item.price,
                    }
                  : c
              ),
            };
          } else {
            return {
              carts: [...state.carts, { ...item, quantity: 1 }],
            };
          }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          carts: state.carts.filter((c) => c.id !== id),
        })),
    }),
    {
      name: "cart",
    }
  )
);
