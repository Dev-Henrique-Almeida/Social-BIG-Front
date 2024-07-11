import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/Auth/AuthContext";

export const useAuthenticatedUser = () => {
  const { user, token } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return { user, token };
};
