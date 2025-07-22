import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: role,
    isLoading: isRoleLoading,
    error,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const { data } = await axiosSecure.get(`/user/role/${user.email}`);
      return data?.role || null;
    },
    enabled: !!user?.email,
  });

  if (error) {
    console.error("Failed to fetch role:", error);
  }

  return [role, isRoleLoading];
};

export default useRole;
