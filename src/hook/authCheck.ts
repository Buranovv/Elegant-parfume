import { useEffect } from "react";
import useAuth from "@/zustand/auth";
import { usePathname, useRouter } from "next/navigation";
import ROLES from "@/types/roles";

const useAuthCheck = () => {
  const { isAuth, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuth) {
      if (
        pathname.startsWith("/admin") && role ? +role === ROLES.USER : false
      ) {
        router.push("/auth/login");
      }
    } else {
      router.push("/auth/login");
    }
  }, [isAuth, router, role, pathname]);
};

export default useAuthCheck;
