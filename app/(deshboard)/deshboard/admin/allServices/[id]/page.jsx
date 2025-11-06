"use client";

import getCookie from "@/utilis/helper/cookie/gettooken";
import { ArrowLeft, CheckCircle, Loader2, Trash2, XCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  // Approve / Reject handler
  const handleStatusUpdate = async (status) => {
    setUpdating(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/updateProduct/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(
          `✅ Service ${status === "published" ? "approved" : "rejected"} successfully`
        );
        router.push("/deshboard/admin/allServices");
      } else toast.error("❌ Failed to update service status.");
    } catch {
      toast.error("⚠️ Something went wrong.");
    } finally {
      setUpdating(false);
    }
  };

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
          <span
            className={`px-4 py-1 text-sm font-semibold rounded-full ${
              service.status === "published"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {service.status}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 grid md:grid-cols-2 gap-8">
          {/* Left - Images */}
          <div>
            <img
              src={service.serviceImageUrls?.[0] || service.license}
              alt={service.name}
              className="rounded-lg shadow-sm mb-4"
            />
            <div className="grid grid-cols-3 gap-3">
              {service.serviceImageUrls?.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="gallery"
                  className="h-24 w-full object-cover rounded-md border"
                />
              ))}
            </div>
          </div>

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
                <strong>Category:</strong> {service.category}
              </p>
              <p>
                <strong>Subcategory:</strong> {service.subcategory}
              </p>
              <p>
                <strong>Price:</strong> ${service.price}
              </p>
              <p>
                <strong>Discount:</strong> {service.discount}%
              </p>
              <p>
                <strong>About:</strong> {service.about}
              </p>
              <p>
                <strong>Areas:</strong>{" "}
                {service.areas?.join(", ") || "Not specified"}
              </p>
              <p>
                <strong>Categories:</strong>{" "}
                {service.categories?.join(", ") || "Not specified"}
              </p>
            </div>

            {/* License & Insurance */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1 font-semibold">
                  License
                </p>
                <img
                  src={service.license}
                  alt="License"
                  className="h-32 w-full object-cover rounded-md border"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 font-semibold">
                  Insurance
                </p>
                <img
                  src={service.insurance}
                  alt="Insurance"
                  className="h-32 w-full object-cover rounded-md border"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              {service.status !== "published" ? (
                <>
                  <button
                    onClick={() => handleStatusUpdate("published")}
                    disabled={updating}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold transition"
                  >
                    {updating ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <CheckCircle size={18} />
                    )}
                    Approve
                  </button>

                  <button
                    onClick={() => handleStatusUpdate("rejected")}
                    disabled={updating}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition"
                  >
                    {updating ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <XCircle size={18} />
                    )}
                    Reject
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
        </div>
      </div>
    </section>
  );
}
