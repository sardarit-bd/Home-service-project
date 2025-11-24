"use client";

import getCookie from "@/utilis/helper/cookie/gettooken";
import MakePost from "@/utilis/requestrespose/post";
import { UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddServicePage() {
  const token = getCookie();
  const [loading, setLoading] = useState(false);

  const categoryOptions = {
    Handyman: [
      "Carpentry",
      "Electrical",
      "Plumbing",
      "Painting",
      "Furniture Assembly",
    ],
    Plumbing: ["Faucets", "Pipes", "Water Heater", "Drain Cleaning"],
    Electrical: [
      "Lights",
      "Wiring",
      "Fan Installation",
      "Switches",
      "Generator",
    ],
    Landscaping: [
      "Lawn Care",
      "Tree Trimming",
      "Garden Design",
      "Fence Installation",
    ],
    HVAC: ["Air Conditioning", "Heating", "Thermostat", "Other HVAC Services"],
  };

  const suggestedTags = [
    "Carpentry",
    "Electrical",
    "Painting",
    "Landscaping",
    "Plumbing",
    "Renovation",
    "Maintenance",
    "Cleaning",
    "HVAC",
    "Roofing",
  ];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    discount: "",
    about: "",
    license: null,
    insurance: null,
    categories: [],
    areas: [],
    serviceImages: [],
  });

  const [categoryInput, setCategoryInput] = useState("");
  const [areaInput, setAreaInput] = useState("");
  const [showCatSuggestions, setShowCatSuggestions] = useState(false);

  const currentSubcategories = categoryOptions[formData.category] || [];

  // --- Category & Area logic ---
  const addCategory = (tag) => {
    if (!formData.categories.includes(tag)) {
      setFormData((p) => ({ ...p, categories: [...p.categories, tag] }));
    }
    setCategoryInput("");
    setShowCatSuggestions(false);
  };

  const removeCategory = (tag) => {
    setFormData((p) => ({
      ...p,
      categories: p.categories.filter((t) => t !== tag),
    }));
  };

  const addArea = (area) => {
    if (area && !formData.areas.includes(area)) {
      setFormData((p) => ({ ...p, areas: [...p.areas, area] }));
      setAreaInput("");
    }
  };

  const removeArea = (area) => {
    setFormData((p) => ({
      ...p,
      areas: p.areas.filter((a) => a !== area),
    }));
  };

  // --- File handling ---
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((p) => ({ ...p, [name]: files[0] }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((p) => ({
      ...p,
      serviceImages: [...p.serviceImages, ...files],
    }));
  };

  const removeImage = (idx) => {
    setFormData((p) => ({
      ...p,
      serviceImages: p.serviceImages.filter((_, i) => i !== idx),
    }));
  };

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "serviceImages") {
        formData.serviceImages.forEach((f) => fd.append("serviceImages", f));
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((v) => fd.append(key, v));
      } else {
        fd.append(key, formData[key]);
      }
    });

    console.log("Submitting FormData:", [...fd.entries()]);

    try {
      const res = await MakePost("createproduct", fd, token);
      toast.success(
        res?.success
          ? "✅ Service created successfully!"
          : "❌ Failed to create service."
      );
    } catch {
      toast.success("⚠️ Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <div className="">
        <h2 className="text-3xl font-bold text-[var(--brandColor)] mb-8 text-center">
          Add New Service
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Company Name (or Personal Name if not Company)
            </label>
            <input
              name="name"
              placeholder="Enter service name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-[var(--brandColor)]"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold mb-1">Price</label>
            <input
              name="price"
              type="number"
              placeholder="e.g. 3000"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-semibold mb-1">Promotion Discount</label>
            <input
              name="Discount"
              type="text"
              placeholder="e.g. 20% or $100 per $1000 order"
              value={formData.discount}
              onChange={(e) =>
                setFormData({ ...formData, discount: e.target.value })
              }
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Promotio Expiration Date</label>
            <input
              name="Expiration"
              type="date"
              value={formData.discount}
              onChange={(e) =>
                setFormData({ ...formData, discount: e.target.value })
              }
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Short description about service"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>



          {/* Category & Subcategory */}
          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                  subcategory: "",
                })
              }
              className="w-full border rounded-md px-4 py-2"
            >
              <option value="">Select Category</option>
              {Object.keys(categoryOptions).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Subcategory
            </label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={(e) =>
                setFormData({ ...formData, subcategory: e.target.value })
              }
              disabled={!formData.category}
              className="w-full border rounded-md px-4 py-2"
            >
              <option value="">Select Subcategory</option>
              {currentSubcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* License & Insurance */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              License File
            </label>
            <input
              type="file"
              name="license"
              onChange={handleFileChange}
              className="w-full border rounded-md px-4 py-2"
            />
            {formData.license && (
              <div
                className="relative w-[100px] overflow-hidden mt-2 group"
              >
                <img
                  src={URL.createObjectURL(formData.license)}
                  alt="preview"
                  className="object-cover w-[100px]"
                />
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, license: null }))}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Insurance File
            </label>
            <input
              type="file"
              name="insurance"
              onChange={handleFileChange}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          {/* Categories Tags */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">
              Categories (Tags)
            </label>
            <div className="border rounded-md p-2 flex flex-wrap gap-2 items-center">
              {formData.categories.map((cat, i) => (
                <span
                  key={i}
                  className="bg-[var(--brandBg)] text-white px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {cat}
                  <button type="button" onClick={() => removeCategory(cat)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
              <input
                value={categoryInput}
                onChange={(e) => {
                  setCategoryInput(e.target.value);
                  setShowCatSuggestions(true);
                }}
                placeholder="Type to add category..."
                className="flex-grow border-none outline-none p-2"
              />
            </div>

            {showCatSuggestions && (
              <div className="mt-1 border rounded-md shadow bg-white max-h-40 overflow-y-auto">
                {suggestedTags
                  .filter((t) =>
                    t.toLowerCase().includes(categoryInput.toLowerCase())
                  )
                  .map((t) => (
                    <div
                      key={t}
                      onClick={() => addCategory(t)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {t}
                    </div>
                  ))}
                {suggestedTags.filter((t) =>
                  t.toLowerCase().includes(categoryInput.toLowerCase())
                ).length === 0 &&
                  categoryInput && (
                    <div
                      onClick={() => addCategory(categoryInput)}
                      className="px-3 py-2 text-[var(--brandColor)] cursor-pointer hover:bg-gray-50"
                    >
                      + Add “{categoryInput}”
                    </div>
                  )}
              </div>
            )}
          </div>

          {/* Areas */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Areas</label>
            <div className="border rounded-md p-2 flex flex-wrap gap-2 items-center">
              {formData.areas.map((area, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {area}
                  <button type="button" onClick={() => removeArea(area)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
              <input
                value={areaInput}
                onChange={(e) => setAreaInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addArea(areaInput))
                }
                placeholder="Type area and press Enter..."
                className="flex-grow border-none outline-none p-2"
              />
            </div>
          </div>

          {/* Service Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">
              Service Images
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[var(--brandColor)] transition bg-gray-50"
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files);
                setFormData((p) => ({
                  ...p,
                  serviceImages: [...p.serviceImages, ...files],
                }));
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <UploadCloud className="mx-auto text-gray-400" size={36} />
              <p className="text-sm text-gray-500 mb-2">
                Drag & drop or click to upload images
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="inline-block bg-[var(--brandBg)] text-white px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-sky-600"
              >
                Browse Files
              </label>
            </div>

            {formData.serviceImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                {formData.serviceImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative border rounded-lg overflow-hidden shadow-sm group"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="object-cover w-full h-28"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--brandBg)] hover:bg-sky-600 text-white font-semibold py-3 px-12 rounded-full transition-all shadow-md"
            >
              {loading ? "Submitting..." : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
