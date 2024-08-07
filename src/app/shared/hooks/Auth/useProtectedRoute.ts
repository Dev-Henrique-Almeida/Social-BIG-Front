import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "../../contexts/Auth/AuthContext";

const useProtectedRoute = () => {
  const { user } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();

  const unprotectedRoutes = ["/login", "/register"];

  useEffect(() => {
    const pathIsProtected = !unprotectedRoutes.includes(pathname);

    if (!user && pathIsProtected) {
      router.push("/login");
    }
  }, [user, pathname, router]);

  const isProtectedRoute = !user && !unprotectedRoutes.includes(pathname);

  return { isProtectedRoute };
};

export default useProtectedRoute;
