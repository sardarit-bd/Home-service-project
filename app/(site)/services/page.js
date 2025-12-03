"use client";

import SkeletonList from "@/app/componnent/skelaton/SkeletonList";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



export default function FeaturedProvidersSection() {


  const [Services, setServices] = useState([]);
  const [Loading, setLoading] = useState(false);



  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/allproducts`, {
        method: "GET"
      });
      const data = await res.json();
      console.log(data);
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




  //console.log(Services);




  if (Loading) return <SkeletonList />


  return (
    <section className="py-8 bg-white text-black relative">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">


        {/* Providers Grid */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">

          {Services?.length < 1 ? <span className=" h-[40vh] pl-6 text-center text-2xl">No Data Found</span> : ""}

          {Services?.map((provider, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bg-white rounded-[var(--radius-card)] overflow-hidden shadow-md hover:shadow-xl transition group"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={provider?.serviceImages?.[0] ? provider?.serviceImages?.[0] : "/imagenotfound.png"}
                  alt={provider?.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {provider.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {provider.selectedCategories}
                </p>
                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.round(provider?.reviews?.analytics?.average) ? "currentColor" : "none"}
                      strokeWidth={1.5}
                    />
                  ))}
                  <span className="text-gray-600 text-sm ml-1">
                    ({provider?.reviews?.total} reviews)
                  </span>
                </div>

                <Link
                  href={`/services/handyman/carpentry/${provider._id}`}
                  className="inline-block mt-2 px-4 py-2 text-sm font-semibold rounded-md bg-[var(--brandBg)] text-white hover:opacity-90 transition"
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
