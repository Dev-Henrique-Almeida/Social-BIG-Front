import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";

const useProfileNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthContext();

  const isProfilePage = pathname === "/perfil";

  const handlePickPerfil = (id: string) => {
    if (user!.id === id) {
      router.push(`/perfil`);
    } else {
      router.push(`/perfil/${id}`);
    }
  };

  return { isProfilePage, handlePickPerfil };
};

export default useProfileNavigation;
