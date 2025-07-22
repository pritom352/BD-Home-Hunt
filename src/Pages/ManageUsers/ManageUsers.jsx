import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxiosSecure from "../hooks/useAxiosSecure";

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
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const fraudMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.patch(`http://localhost:3000/user/${id}/fraud`),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`http://localhost:3000/user/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading users...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700">
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
                className="bg-white border-b hover:bg-gray-50 transition"
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
