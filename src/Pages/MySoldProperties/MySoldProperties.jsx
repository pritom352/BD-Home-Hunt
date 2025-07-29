import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const MySoldProperties = () => {
  const { user } = useContext(AuthContext); // assume agent is logged in

  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["soldProperties", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment12-server-lyart.vercel.app/sold-properties?email=${user?.email}`
      );
      return res.json();
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Sold Properties</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Title</th>
              <th className="p-2">Location</th>
              <th className="p-2">Buyer Name</th>
              <th className="p-2">Buyer Email</th>
              <th className="p-2">Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {soldProperties.map((item, index) => (
              <tr key={item._id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.propertyTitle}</td>
                <td className="p-2">{item.propertyLocation || "N/A"}</td>
                <td className="p-2">{item.buyerName || "Unknown"}</td>
                <td className="p-2">{item.buyerEmail}</td>
                <td className="p-2">${item.offerAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySoldProperties;
