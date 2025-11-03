"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, Leaf, Droplets } from "lucide-react";

const services = [
  {
    id: "handyman",
    title: "Handyman",
    description:
      "Expert help for carpentry, doors, electrical, plumbing, furniture assembly, TV mounting, drywall, windows, and more.",
    icon: <Wrench size={40} />,
    subcategories: [
      "Carpentry",
      "Electrical",
      "Doors & Windows",
      "Furniture Assembly",
      "TV Mounting",
      "Drywall & Painting",
      "Moving Help",
      "Other",
    ],
  },
  {
    id: "landscaping",
    title: "Landscaping",
    description:
      "From lawn care and tree trimming to patio design — transform your outdoors with top-rated landscaping professionals.",
    icon: <Leaf size={40} />,
    subcategories: [
      "Lawn Care",
      "Tree Trimming & Removal",
      "Patios & Walkways",
      "Fence Installation",
      "Yard Drainage",
      "Outdoor Living",
      "Other",
    ],
  },
  {
    id: "plumbing",
    title: "Plumbing",
    description:
      "Trusted plumbers for faucets, drains, water heaters, and full system repairs — available across the Chicago area.",
    icon: <Droplets size={40} />,
    subcategories: [
      "Faucets & Fixtures",
      "Drain Cleaning",
      "Water Heater",
      "Pipes & Leaks",
      "Septic & Sewer Systems",
      "Water Main Repair",
      "Other",
    ],
  },
];

export default function ServicesPage() {
  return (
    <section className="py-20 bg-gray-50 text-black">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl font-bold mb-3">
            Our <span className="text-[var(--brandColor)]">Home Services</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our verified service categories and find trusted
            professionals for every part of your home.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white rounded-[var(--radius-card)] shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="p-8 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--brandBg)] text-white">
                  {service.icon}
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-600 text-sm mb-5">
                  {service.description}
                </p>

                <div className="text-left mb-6">
                  <h3 className="font-semibold mb-2 text-gray-800">
                    Subcategories:
                  </h3>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {service.subcategories.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/services/${service.id}`}
                  className="inline-block mt-2 px-5 py-2 rounded-md bg-[var(--brandBg)] text-white font-semibold hover:opacity-90 transition"
                >
                  Explore {service.title}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
