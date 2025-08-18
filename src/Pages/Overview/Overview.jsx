import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Loader from "../Loader/Loader";
import { FaUsers, FaHome, FaDollarSign, FaUserTie } from "react-icons/fa";

const Overview = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Data
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: properties = [], isLoading: propertiesLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/propertys");
      return res.data;
    },
  });

  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const { data: topAgent, isLoading: topAgentLoading } = useQuery({
    queryKey: ["topAgent"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-agent");
      return res.data;
    },
  });

  if (usersLoading || propertiesLoading || paymentsLoading || topAgentLoading)
    return <Loader />;

  // Calculations & Insights
  const totalUsers = users.length;
  const totalAgents = users.filter((u) => u.role === "agent").length;
  const totalProperties = properties.length;
  const soldProperties = payments.length;
  const totalRevenue = payments.reduce(
    (sum, p) => sum + (p.offerAmount || 0),
    0
  );

  const verificationData = [
    {
      name: "Verified",
      value: properties.filter((p) => p.verificationStatus === "verified")
        .length,
    },
    {
      name: "Pending",
      value: properties.filter((p) => p.verificationStatus === "pending")
        .length,
    },
    {
      name: "Rejected",
      value: properties.filter((p) => p.verificationStatus === "rejected")
        .length,
    },
  ];

  const COLORS = ["#4f46e5", "#fbbf24", "#ef4444"];

  const propertiesPerAgent = properties.reduce((acc, p) => {
    const agent = acc.find((a) => a.agentEmail === p.agentEmail);
    if (agent) agent.count += 1;
    else
      acc.push({
        name: p.agentName,
        count: 1,
        agentEmail: p.agentEmail,
      });
    return acc;
  }, []);

  return (
    <section className="my-25  max-w-7xl mx-auto space-y-10">
      {/* Main Title & Subtitle */}
      <div className="text-center mb-15">
        <h1 className="text-3xl font-bold ">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">
          Summary of users, properties, and sales performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-secondary shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <FaUsers className="text-4xl text-primary mb-2" />
          <p className="text-2xl font-bold">{totalUsers}</p>
          <p className="text-gray-500 mt-1">Total Users</p>
          <p className="text-sm text-gray-400 mt-1">
            All registered users including agents and customers.
          </p>
        </div>

        <div className="bg-secondary shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <FaUserTie className="text-4xl text-primary mb-2" />
          <p className="text-2xl font-bold">{totalAgents}</p>
          <p className="text-gray-500 mt-1">Total Agents</p>
          <p className="text-sm text-gray-400 mt-1">
            Agents who manage and list properties.
          </p>
        </div>

        <div className="bg-secondary shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <FaHome className="text-4xl text-primary mb-2" />
          <p className="text-2xl font-bold">{totalProperties}</p>
          <p className="text-gray-500 mt-1">Total Properties</p>
          <p className="text-sm text-gray-400 mt-1">
            Properties listed on the platform (verified/pending/rejected).
          </p>
        </div>

        <div className="bg-secondary shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <FaDollarSign className="text-4xl text-primary mb-2" />
          <p className="text-2xl font-bold">{soldProperties}</p>
          <p className="text-gray-500 mt-1">Sold Properties</p>
          <p className="text-sm text-gray-400 mt-1">
            Total Revenue: ${totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Top Agent */}
      {topAgent && (
        <div className="bg-secondary shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">Top Agent</h3>
          <p className="text-lg text-gray-500 font-bold">{topAgent.name}</p>
          <p className="text-gray-500">{topAgent.email}</p>
          <p className="text-gray-400 mt-1">
            Total Properties Managed: {topAgent.totalProperties}
          </p>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pie Chart - Verification Status */}
        <div className="bg-secondary shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">Property Verification</h3>
          <p className="text-sm text-gray-400 mb-2">
            Distribution of properties by verification status.
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={verificationData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {verificationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Properties per Agent */}
        <div className="bg-secondary shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">Properties per Agent</h3>
          <p className="text-sm text-gray-400 mb-2">
            Number of properties each agent manages.
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={propertiesPerAgent}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Users Growth */}
        <div className="bg-secondary shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">User Growth</h3>
          <p className="text-sm text-gray-400 mb-2">
            Shows the trend of new user registrations.
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={users.map((u, i) => ({ name: `User ${i + 1}`, value: 1 }))}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f59e0b"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Overview;
