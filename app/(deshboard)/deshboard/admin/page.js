"use client";
import { useEffect, useState } from "react";


export default function AdminDashboard() {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null);


    // Simulate fetching data from server
    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            try {
                // Replace with your actual API call
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/deshboard`);
                const data = await res.json();

                setStats(data?.data);

            } catch (error) {

                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);






    if (loading) return <DashboardSkeleton />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                        Total Users
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.userCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                        Total Reviews
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.reviewCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                        Total Services
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.productCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                        Total Category
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.categoryCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                        Total Areas
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.areaCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                        Total Contacted Submited
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats?.contactCount}</p>
                </div>
            </div>
        </div>
    );
}






























function DashboardSkeleton() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen animate-pulse">
            {/* Heading */}
            <div className="h-10 w-48 bg-gray-300 rounded mb-8"></div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {[1, 2, 3].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow"
                    >
                        <div className="h-4 w-32 bg-gray-300 rounded mb-4"></div>
                        <div className="h-8 w-20 bg-gray-300 rounded"></div>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-xl shadow">
                <div className="h-5 w-64 bg-gray-300 rounded mb-4"></div>
                <div className="h-80 w-full bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}