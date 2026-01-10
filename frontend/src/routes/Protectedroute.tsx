import { useAuth } from "@/hooks/useAuth";
import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  // useEffect(() => {
  //   if (!user || user.role !== "admin") {
  //     navigate("/");
  //   }
  // }, [navigate, user]);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
