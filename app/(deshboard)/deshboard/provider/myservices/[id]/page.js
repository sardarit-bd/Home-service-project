"use client";

import getCookie from "@/utilis/helper/cookie/gettooken";
import FileExtension from "@/utilis/helper/fileExtension";
import { ArrowLeft, Loader2, Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { toast } from "react-toastify";

export default function ServiceDetailsPage() {
    const { id } = useParams();
    const token = getCookie();
    const router = useRouter();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Fetch single service directly
    const fetchService = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/singleProduct/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const data = await res.json();
            if (data.success) setService(data.data);
            else toast.error("❌ Failed to load service details.");
        } catch {
            toast.error("⚠️ Network or server error.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchService();
    }, [id]);

    // Delete handler
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        setDeleting(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/deleteProduct/${id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const data = await res.json();
            if (data.success) {
                toast.success("🗑️ Service deleted successfully");
                router.push("/deshboard/admin/allServices");
            } else toast.error("❌ Failed to delete service.");
        } catch {
            toast.error("⚠️ Something went wrong while deleting.");
        } finally {
            setDeleting(false);
        }
    };



    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <Loader2 className="animate-spin text-[var(--brandColor)]" size={48} />
            </div>
        );
    }

    if (!service)
        return (
            <p className="text-center text-gray-500 mt-20">Service not found.</p>
        );


    return (
        <section>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[var(--brandBg)]">
                {/* Header */}
                <div className="flex justify-between items-center border-b px-6 py-4 bg-gray-50">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-[var(--brandColor)] transition"
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                    {/* Action Buttons */}
                    <div className="flex gap-4 items-center">
                        <span><strong>Current Status:</strong> {service.status} </span>
                        {service.status !== "published" ? (
                            <>
                                <button
                                    onClick={() => handleDelete()}
                                    disabled={updating}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition cursor-pointer"
                                >
                                    {updating ? (
                                        <Loader2 className="animate-spin" size={16} />
                                    ) : (
                                        <XCircle size={18} />
                                    )}
                                    Delete
                                </button>


                            </>
                        ) : (
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition"
                            >
                                {deleting ? (
                                    <Loader2 className="animate-spin" size={16} />
                                ) : (
                                    <Trash2 size={18} />
                                )}
                                Delete
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 grid md:grid-cols-2 gap-8">


                    {/* Right - Details */}
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--brandColor)] mb-2">
                            {service.name}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">
                            {service.description || "No description provided."}
                        </p>

                        <div className="space-y-2 text-sm">
                            <p>
                                <strong>Email:</strong> {service.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {service.phone}
                            </p>
                            <p>
                                <strong>Experience:</strong> {service.experience}
                            </p>

                            <p>
                                <strong>Category:</strong> {service.selectedCategories}
                            </p>
                            <p>
                                <strong>Subcategory:</strong> <span className="flex gap-3">
                                    {service.selectedSubcategories?.map((item, index) => {
                                        return <span key={index} className="text-gray-600 text-sm px-3 py-1 rounded-md mb-4 bg-sky-100">{item}</span>
                                    })}
                                </span>
                            </p>

                            <p>
                                <strong>Metropoliton:</strong> {service.selectedAreas}
                            </p>
                            <p>
                                <strong>Areas:</strong> <span className="flex gap-3">
                                    {service.selectedSubareas?.map((item, index) => {
                                        return <span key={index} className="text-gray-600 text-sm px-3 py-1 rounded-md mb-4 bg-sky-100">{item}</span>
                                    })}
                                </span>
                            </p>

                            <p>
                                <strong>Reviews:</strong> <span className="flex">
                                    <div className="flex flex-col mt-2">
                                        <span className="text-gray-600 text-sm px-3 py-1 rounded-md mb-4 bg-sky-100">
                                            <strong>Average:</strong> {Math.round(service.reviews?.analytics?.average)}
                                        </span>
                                        <span className="text-gray-600 text-sm px-3 py-1 rounded-md mb-4 bg-sky-100">
                                            <strong>Total:</strong> {service.reviews?.total}
                                        </span>
                                    </div>
                                </span>
                            </p>


                            <p>
                                <strong>Promotional Discount:</strong> {service.promotiondis}
                            </p>
                            <p>
                                <strong>Promotional Discount Period:</strong> {service.promotionalpriod}
                            </p>
                            <p>
                                <strong>Areas:</strong>{" "}
                                {service.areas?.join(", ") || "Not specified"}
                            </p>
                            <p>
                                <strong>Categories:</strong>{" "}
                                {service.categories?.join(", ") || "Not specified"}
                            </p>
                            <p className="">
                                <strong>Added on:</strong>{" "}
                                {new Date(service.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        {/* License & Insurance */}
                        <div className="mt-5">
                            <div>
                                <p className="text-md text-gray-900 mb-1 font-semibold">
                                    License
                                </p>
                                <div className="flex items-center gap-2">
                                    {
                                        service?.license?.map((item, index) => {
                                            const ext = FileExtension(item);

                                            if (ext !== "pdf") {
                                                return (
                                                    <div key={index} className="relative">
                                                        <Image
                                                            width={1000}
                                                            height={1000}
                                                            src={item}
                                                            alt="gallery"
                                                            className="h-full w-full object-cover rounded-md border"
                                                        />
                                                        {/* Download Button */}
                                                        <a
                                                            href={item}
                                                            target="_blank"
                                                            download
                                                            className="bg-red-800 text-white px-2 py-2 rounded-md text-sm absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                                                        >
                                                            <IoMdDownload />
                                                        </a>
                                                    </div>
                                                );
                                            }

                                            // If PDF
                                            return (
                                                <div
                                                    key={index}
                                                    className="bg-red-800 text-white px-4 py-4 rounded-md flex flex-col items-center justify-between gap-3 w-full h-full"
                                                >
                                                    <span>PDF</span>

                                                    {/* Download Button */}
                                                    <a
                                                        href={item}
                                                        target="_blank"
                                                        download
                                                        className="bg-white text-red-800 px-2 py-1 rounded-md text-sm"
                                                    >
                                                        Download
                                                    </a>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            <div className="mt-10">
                                <p className="text-md text-gray-900 mb-1 font-semibold">
                                    Insurance
                                </p>
                                <div className="flex items-center gap-2">
                                    {
                                        service?.insurance?.map((item, index) => {
                                            const ext = FileExtension(item);

                                            if (ext !== "pdf") {
                                                return (
                                                    <div key={index} className="relative">
                                                        <Image
                                                            width={1000}
                                                            height={1000}
                                                            src={item}
                                                            alt="gallery"
                                                            className="h-full w-full object-cover rounded-md border"
                                                        />
                                                        {/* Download Button */}
                                                        <a
                                                            href={item}
                                                            target="_blank"
                                                            download
                                                            className="bg-red-800 text-white px-2 py-2 rounded-md text-sm absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                                                        >
                                                            <IoMdDownload />
                                                        </a>
                                                    </div>
                                                );
                                            }

                                            // If PDF
                                            return (
                                                <div
                                                    key={index}
                                                    className="bg-red-800 text-white px-4 py-4 rounded-md flex flex-col items-center justify-between gap-3 w-full h-full"
                                                >
                                                    <span>PDF</span>

                                                    {/* Download Button */}
                                                    <a
                                                        href={item}
                                                        target="_blank"
                                                        download
                                                        className="bg-white text-red-800 px-2 py-1 rounded-md text-sm"
                                                    >
                                                        Download
                                                    </a>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Left - Images */}
                    <div>
                        {
                            service?.serviceImages?.map((item, index) => {
                                return (
                                    <div key={index} className="grid grid-cols-3 gap-6">
                                        <Image
                                            key={index}
                                            width={1000}
                                            height={1000}
                                            src={item}
                                            alt="gallery"
                                            className="h-full w-full object-cover rounded-md border"
                                        />
                                    </div>
                                )
                            })
                        }

                    </div>




                </div>
            </div>
        </section>
    );
}
