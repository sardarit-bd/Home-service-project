"use client";

import getCookie from "@/utilis/helper/cookie/gettooken";
import { Loader2, Search, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserListPage() {
  const token = getCookie();
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterRole, setFilterRole] = useState("all");

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/allusers`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) {
        setUsers(data.data || []);
        setFiltered(data.data || []);
      } else toast.error("❌ Failed to fetch users.");
    } catch {
      toast.error("⚠️ Network or server error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search and Filter logic
  useEffect(() => {
    let result = [...users];
    if (filterRole !== "all")
      result = result.filter((u) => u.role === filterRole);
    if (search.trim())
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    setFiltered(result);
  }, [search, filterRole, users]);

  return (
    <section className="">
      <div className=" bg-white shadow-lg rounded-2xl p-8 border-t-4 border-[var(--brandBg)]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Users className="text-[var(--brandColor)]" size={26} />
            <h2 className="text-2xl font-bold text-[var(--brandColor)]">
              All Registered Users
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-full pl-10 pr-4 py-2 w-full sm:w-64 focus:ring-2 focus:ring-[var(--brandColor)]"
              />
            </div>

            {/* Role Filter */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-[var(--brandColor)]"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        {/* Table or Loader */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2
              className="animate-spin text-[var(--brandColor)]"
              size={40}
            />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[var(--brandBg)] text-white">
                  <th className="py-3 px-4 rounded-tl-lg">#</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4 text-center">Role</th>
                  <th className="py-3 px-4 text-right rounded-tr-lg">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="py-3 px-4 text-gray-700 font-semibold">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {user.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        <Shield size={14} />
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Responsive Card View */}
            <div className="grid grid-cols-1 md:hidden gap-4 mt-4">
              {filtered.map((user, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-[var(--brandColor)]">
                      {user.name}
                    </h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                  <p className="text-xs text-gray-400">
                    Created: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
