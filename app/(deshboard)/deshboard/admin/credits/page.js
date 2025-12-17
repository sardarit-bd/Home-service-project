"use client";

import getCookie from "@/utilis/helper/cookie/gettooken";
import { Loader2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UserListPage() {
    const token = getCookie();
    const [credit, setcredit] = useState([]);
    const [loading, setLoading] = useState(false);


    // Fetch Users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/allcredits`);
            const data = await res.json();
            if (data.success) {
                setcredit(data.data || []);
            } else toast.error("Failed to fetch users.");
        } catch {
            toast.error("Network or server error.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);



    return (
        <section className="">
            <div className=" bg-white shadow-lg rounded-2xl p-8 border-t-4 border-[var(--brandBg)]">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <Users className="text-[var(--brandColor)]" size={26} />
                        <h2 className="text-2xl font-bold text-[var(--brandColor)]">
                            Ganeral Users Credit Point
                        </h2>
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
                ) : credit.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">No users found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-[var(--brandBg)] text-white">
                                    <th className="py-3 px-4 rounded-tl-lg">#</th>
                                    <th className="py-3 px-4">Name</th>
                                    <th className="py-3 px-4">Email</th>
                                    <th className="py-3 px-4 text-center">
                                        Credit Point
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {credit.map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className="border-b hover:bg-gray-50 transition-all duration-200"
                                    >
                                        <td className="py-3 px-4 text-gray-700 font-semibold">
                                            {index + 1}
                                        </td>
                                        <td className="py-3 px-4 font-medium text-gray-800">
                                            {user.fname} {user.mname} {user.lname}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                                        <td className="py-3 px-4 text-center text-sm text-gray-500">
                                            {user?.point}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
