'use client'

import getId from "@/utilis/helper/cookie/getid";
import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function MyServices() {


    const myID = getId();


    const [Services, setServices] = useState([]);
    const [Loading, setLoading] = useState(false);
    const router = useRouter();


    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/allproducts`, {
                method: "GET"
            });
            const data = await res.json();
            if (data.success) setServices(data.data || []);
            else toast.error("❌ Failed to fetch services.");
        } catch {
            toast.error("⚠️ Network or server error.");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchServices();
    }, []);





    const myServices = Services.filter((service) => service.userID === myID);





    console.log(myServices);




    return (
        <section className="">
            <div className="mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-[var(--brandColor)]">
                        All Services / Products
                    </h2>
                </div>

                {Loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-[var(--brandColor)]" size={40} />
                    </div>
                ) : myServices.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">No services found.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {myServices?.map((srv) => (
                            <div
                                key={srv._id}
                                onClick={() => router.push(`/deshboard/provider/myservices/${srv._id}`)}
                                className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-lg transition relative border-t-4 border-[var(--brandBg)] flex flex-col"
                            >
                                <div className="relative h-44 w-full">
                                    <img
                                        src={srv.serviceImages?.[0] || srv.license}
                                        alt={srv.name}
                                        className="object-cover w-full h-full rounded-t-2xl"
                                    />
                                    <span
                                        className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${srv.status === "published"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {srv.status}
                                    </span>
                                </div>

                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate">
                                        {srv.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                        {srv.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 text-xs mb-3">
                                        {srv.categories?.map((cat, i) => (
                                            <span
                                                key={i}
                                                className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-gray-600"
                                            >
                                                {cat}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto">
                                        <p className="text-xs text-gray-400">
                                            Added: {new Date(srv.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
