import request from "@/server";
import UniversalData from "@/types/universalData";
import { create } from "zustand";

interface initialState {
  latestProducts: UniversalData[];
  categories: UniversalData[];
  loading: boolean;
  getLatestProducts: () => void;
  getAllCategories: () => void;
}

const useGetData = create<initialState>()((set) => ({
  latestProducts: [],
  categories: [],
  loading: false,
  getLatestProducts: async () => {
    try {
      set({ loading: true });
      const { data } = await request.get<UniversalData[]>("last-products");
      set({ latestProducts: data });
    } finally {
      set({ loading: false });
    }
  },
  getAllCategories: async () => {
    try {
      set({ loading: true });
      const { data } = await request.get<UniversalData[]>("category");
      set({ categories: data });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useGetData;
