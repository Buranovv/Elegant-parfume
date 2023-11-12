import request from "@/server";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { create } from "zustand";
import Cookies from "js-cookie";
import { TOKEN, ROLE } from "@/constants";
import { toast } from "react-toastify";

interface initialState {
  loading: boolean;
  isAuth: boolean;
  role: string | null;
  login: (values: object, router: AppRouterInstance) => void;
  signUp: (values: object, router: AppRouterInstance) => void;
  logout: (router: AppRouterInstance) => void;
}

const useAuth = create<initialState>()((set) => ({
  loading: false,
  isAuth: Boolean(Cookies.get(TOKEN)),
  role: Cookies.get(ROLE) || null,
  login: async (values, router) => {
    try {
      set({ loading: true });
      const { data } = await request.post("auth/login", values);

      Cookies.set(ROLE, data?.user?.role);
      Cookies.set(TOKEN, data?.accesstoken);

      if (data.user.role === "0") {
        router.push("/");
        toast.success("Successfully logged in!");
      } else {
        router.push("/dashboard");
      }
    } finally {
      set({ loading: false });
    }
  },
  signUp: async (values, router) => {
    try {
      set({ loading: true });
      const { data } = await request.post("auth/register", values);

      Cookies.set(ROLE, data?.user?.role);
      Cookies.set(TOKEN, data?.accesstoken);

      router.push("/");
      toast.success("Successfully registered!");
    } finally {
      set({ loading: false });
    }
  },
  logout: (router) => {
    Cookies.remove(ROLE);
    Cookies.remove(TOKEN);

    router.push("/");
  },
}));

export default useAuth;
