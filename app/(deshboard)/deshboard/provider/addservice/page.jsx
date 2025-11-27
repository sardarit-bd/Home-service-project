"use client";

import AreaSelector from "@/app/componnent/AreaSelector";
import getCookie from "@/utilis/helper/cookie/gettooken";
import MakePost from "@/utilis/requestrespose/post";
import { UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategorySelector from "../../../../componnent/CategorySelector";

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
  const [Categories, setCategories] = useState([]);
  const [Areas, setAreas] = useState([]);
  const currentSubcategories = categoryOptions[formData.category] || [];

  const [selectedCategories, setSelectedCategories] = useState('');
  const [selectedAreas, setSelectedAreas] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedSubareas, setSelectedSubareas] = useState([]);




  // fetch the catagor and seub catagory here
  // --- Fetch All Categories ---
  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/allcatagory`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) setCategories(data.total || []);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };


  // --- Fetch All Areas ---
  const fetchAreas = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/allarea`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) setAreas(data.total || []);
    } catch (err) {
      console.error("Failed to load areas:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAreas();
  }, []);




  console.log(Areas);






























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










  console.log(selectedAreas);
  console.log(selectedCategories);


  console.log(selectedSubareas);
  console.log(selectedSubcategories);









  return (
    <section className="">
      <div className="">
        <h2 className="text-3xl font-bold text-[var(--brandColor)] mb-8 text-center">
          Add New Service
        </h2>

        <div
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
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>



          {/* Price */}
          <div className="">
            <label className="block text-sm font-semibold mb-1">Experience</label>
            <input
              name="Experience"
              type="number"
              placeholder="e.g. 2"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>







          {/* Category & Subcategory */}
          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>

            <CategorySelector Categories={Categories} selectedCategory={selectedCategories} selectedSubcategories={selectedSubcategories} setSelectedCategory={setSelectedCategories} setSelectedSubcategories={setSelectedSubcategories} />

          </div>

          <div>

            <label className="block text-sm font-semibold mb-1">Metropolitan</label>

            <AreaSelector Areas={Areas} selectedAreas={selectedAreas} selectedSubareas={selectedSubareas} setSelectedAreas={setSelectedAreas} setSelectedSubareas={setSelectedSubareas} />

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
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
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
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>




          <div>
            <label className="block text-sm font-semibold mb-1">Email Address</label>
            <input
              name="Expiration"
              type="email"
              value={formData.discount}
              onChange={(e) =>
                setFormData({ ...formData, discount: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>


          <div>
            <label className="block text-sm font-semibold mb-1">Phone Number</label>
            <input
              name="Expiration"
              type="phone"
              value={formData.discount}
              onChange={(e) =>
                setFormData({ ...formData, discount: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
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
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>






          {/* License & Insurance */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              License File <span className="text-xs text-gray-500 bg-red-100 px-1 rounded-lg">Only Png,jpg,jpeg and pdf</span>
            </label>
            <input
              type="file"
              name="license"
              onChange={handleFileChange}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
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
              Insurance File <span className="text-xs text-gray-500 bg-red-100 px-1 rounded-lg">Only Png,jpg,jpeg and pdf</span>
            </label>
            <input
              type="file"
              name="insurance"
              onChange={handleFileChange}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>







          {/* Service Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">
              Service Images <span className="text-xs text-gray-500 bg-red-100 px-1 rounded-lg">Only Png,jpg,jpeg</span>
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
              onClick={(e) => { handleSubmit(e) }}
              disabled={loading}
              className="bg-[var(--brandBg)] hover:bg-sky-600 text-white font-semibold py-3 px-12 rounded-full transition-all shadow-md"
            >
              {loading ? "Submitting..." : "Add Service"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
