import { useAuthStore } from "@/store/useAuthStore";
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const setUser = useAuthStore((state) => state.setUser);
  return { user, logout, setUser };
}
