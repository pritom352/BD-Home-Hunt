import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";

const fetchUsers = async (axiosSecure) => {
  const { data } = await axiosSecure.get("http://localhost:3000/users");
  return data;
};

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(axiosSecure),
  });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }) =>
      axiosSecure.patch(`/user/${id}/role`, { role }),
    onSuccess: () => {
      toast.success("✅ Role updated successfully");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      console.error(err);
      toast.error("❌ Failed to update role");
    },
  });

  const fraudMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/user/${id}/fraud`),
    onSuccess: () => {
      toast.success("⚠️ User marked as fraud");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      console.error(err);
      toast.error("❌ Failed to mark as fraud");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/user/${id}`),
    onSuccess: () => {
      console.log("🟢 Delete success triggered");
      toast.success("🗑️ User deleted");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      console.error(err);
      toast.error("❌ Failed to delete user");
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto my-25">
      <h2 className="text-4xl font-bold mb-15 text-center">Manage Users</h2>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-secondary text-gray-700">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="bg-secondary border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {u.status === "fraud" ? (
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded">
                        Fraud
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            roleMutation.mutate({ id: u._id, role: "admin" })
                          }
                          className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded shadow"
                        >
                          Make Admin
                        </button>
                        <button
                          onClick={() =>
                            roleMutation.mutate({ id: u._id, role: "agent" })
                          }
                          className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
                        >
                          Make Agent
                        </button>
                        {u.role === "agent" && (
                          <button
                            onClick={() => fraudMutation.mutate(u._id)}
                            className="px-3 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow"
                          >
                            Mark as Fraud
                          </button>
                        )}
                      </>
                    )}
                    <button
                      onClick={() => deleteMutation.mutate(u._id)}
                      className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded shadow"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
