import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/Auth/AuthContext";

const useProtectedRoute = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
};

export default useProtectedRoute;
