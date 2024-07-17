import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";

const useProfileNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthContext();

  const isProfilePage = pathname !== "/home";

  const handlePickPerfil = (id: string) => {
    if (user!.id === id) {
      router.push(`/perfil/`);
    } else {
      if (!isProfilePage) {
        router.push(`/perfil/${id}`);
      }
    }
  };

  return { isProfilePage, handlePickPerfil };
};

export default useProfileNavigation;
