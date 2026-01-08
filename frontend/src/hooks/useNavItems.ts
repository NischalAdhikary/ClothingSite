import { fetchNavItems } from "@/api/nav";
import { useQuery } from "@tanstack/react-query";
export function useNavItems() {
  const getNavItems = useQuery({
    queryKey: ["Navitems"],
    queryFn: fetchNavItems,
  });
  return {
    getNavItems,
  };
}
