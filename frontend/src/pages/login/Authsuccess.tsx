import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
export default function Authsuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        localStorage.setItem("token", token as string);

        const res = await axios.get(
          "http://localhost:4000/api/v1/auth/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const user = res.data?.data;
        setIsLoading(false);

        if (user) {
          setUser(user);
          if (user.role === "admin") {
            navigate("/admin/dashboard", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    verifyUser();
  }, [token, setUser, navigate]);
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader size={30} />
      </div>
    );
  }
}
