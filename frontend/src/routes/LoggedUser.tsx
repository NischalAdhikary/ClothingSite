import { useAuth } from "@/hooks/useAuth";

import { Navigate } from "react-router-dom";

export default function LoggedUser({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}
