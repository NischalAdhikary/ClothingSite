import { useQuery } from "@tanstack/react-query";
import { fetchSizes, fetchColors } from "@/api/vairants";
export const useVariant = () => {
  const fetchAllSizes = useQuery({
    queryKey: ["sizes"],
    queryFn: fetchSizes,
  });
  const fetchAllColors = useQuery({
    queryKey: ["colors"],
    queryFn: fetchColors,
  });
  return {
    fetchAllColors,
    fetchAllSizes,
  };
};
