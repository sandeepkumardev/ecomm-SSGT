import type { ICart, IUser, IWishlist } from "@/types";
import { create } from "zustand";

interface IUserStore {
  loading: boolean;
  setLoading: (data: boolean) => void;

  user: IUser | null;
  setUser: (data: IUser | null) => void;

  cart: ICart[] | null;
  setCart: (data: ICart[] | null) => void;

  addCartItem: (item: ICart) => void;
  removeCartItem: (itemId: string) => void;

  wishlist: IWishlist[] | null;
  setWishlist: (data: IWishlist[] | null) => void;

  addWishlistItem: (item: IWishlist) => void;
  removeWishlistItem: (itemId: string) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  loading: true,
  setLoading: (data) => set({ loading: data }),

  user: null,
  setUser: (data) => set({ user: data }),

  cart: null,
  setCart: (data) => set({ cart: data }),

  addCartItem: (item) => set((state) => ({ cart: [...state.cart!, item] })),
  removeCartItem: (itemId) => set((state) => ({ cart: state.cart!.filter((item) => item.item._id !== itemId) })),

  wishlist: null,
  setWishlist: (data) => set({ wishlist: data }),

  addWishlistItem: (item) => set((state) => ({ wishlist: [...state.wishlist!, item] })),
  removeWishlistItem: (itemId) =>
    // @ts-ignore
    set((state) => ({ wishlist: state.wishlist!.filter((item) => (item.item._id || item.item) !== itemId) })),
}));

export default useUserStore;
