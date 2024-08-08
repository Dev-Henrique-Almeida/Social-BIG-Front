import { useRouter, usePathname } from "next/navigation";

const useMarketNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isMarketPage = pathname === "/market";

  const handlePickMarket = (id: string) => {
    router.push(`/marketplace/${id}`);
  };

  return { isMarketPage, handlePickMarket };
};

export default useMarketNavigation;
