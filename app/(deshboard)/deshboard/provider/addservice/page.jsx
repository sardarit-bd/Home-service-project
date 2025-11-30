"use client";

import AreaSelector from "@/app/componnent/AreaSelector";
import Loading from "@/app/componnent/Loading";
import getCookie from "@/utilis/helper/cookie/gettooken";
import handleFiles from "@/utilis/helper/handleFiles";
import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import CategorySelector from "../../../../componnent/CategorySelector";

export default function AddServicePage() {
  const token = getCookie();
  const [loading, setLoading] = useState(false);
  //   Handyman: [
  //     "Carpentry",
  //     "Electrical",
  //     "Plumbing",
  //     "Painting",
  //     "Furniture Assembly",
  //   ],
  //   Plumbing: ["Faucets", "Pipes", "Water Heater", "Drain Cleaning"],
  //   Electrical: [
  //     "Lights",
  //     "Wiring",
  //     "Fan Installation",
  //     "Switches",
  //     "Generator",
  //   ],
  //   Landscaping: [
  //     "Lawn Care",
  //     "Tree Trimming",
  //     "Garden Design",
  //     "Fence Installation",
  //   ],
  //   HVAC: ["Air Conditioning", "Heating", "Thermostat", "Other HVAC Services"],
  // };

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

  const [name, setname] = useState('');
  const [experience, setexperience] = useState('');
  const [promotiondis, setpromotiondis] = useState('');
  const [promotionalpriod, setpromotionalpriod] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [description, setdescription] = useState('');
  const [license, setlicense] = useState([]);
  const [insurance, setinsurance] = useState([]);
  const [serviceImages, setserviceImages] = useState([]);



  const [categoryInput, setCategoryInput] = useState("");
  const [areaInput, setAreaInput] = useState("");
  const [showCatSuggestions, setShowCatSuggestions] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [Areas, setAreas] = useState([]);


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






  /******************* handle remove function is here ***********************/
  function handleRemoveFile(index, serviceImages, setServiceImages) {
    const updated = serviceImages.filter((_, i) => i !== index);
    setServiceImages(updated);
  }






  /************** handle serviecess added funciton is here ******************/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);




    const passedData = {
      name: name,
      experience: experience,
      promotiondis: promotiondis,
      promotionalpriod: promotionalpriod,
      email: email,
      phone: phone,
      description: description,
      selectedCategories: selectedCategories,
      selectedAreas: selectedAreas,
      selectedSubcategories: selectedSubcategories,
      selectedSubareas: selectedSubareas,
      license: license,
      insurance: insurance,
      serviceImages: serviceImages,
    };



    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/createProduct`,
        {
          method: "POST",
          // ❗ DO NOT SET CONTENT-TYPE when using FormData
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(passedData),
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        toast.error("⚠️ Request failed");
      } else {
        toast.success("Product created!");
      }

    } catch (err) {
      console.log(err);
      toast.error("⚠️ Network error.");
    } finally {
      setLoading(false);
    }
  };






  return (
    <section className="">

      {loading && <Loading />}

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
              value={name}
              onChange={(e) =>
                setname(e.target.value)
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
              value={experience}
              onChange={(e) =>
                setexperience(e.target.value)
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
              value={promotiondis}
              onChange={(e) =>
                setpromotiondis(e.target.value)
              }
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Promotio Expiration Date</label>
            <input
              name="Expiration"
              type="date"
              value={promotionalpriod}
              onChange={(e) =>
                setpromotionalpriod(e.target.value)
              }
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>




          <div>
            <label className="block text-sm font-semibold mb-1">Email Address</label>
            <input
              name="Expiration"
              type="email"
              value={email}
              onChange={(e) =>
                setemail(e.target.value)
              }
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>


          <div>
            <label className="block text-sm font-semibold mb-1">Phone Number</label>
            <input
              name="Expiration"
              type="phone"
              value={phone}
              onChange={(e) =>
                setphone(e.target.value)
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
              value={description}
              onChange={(e) =>
                setdescription(e.target.value)
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
              multiple
              onChange={(e) => { handleFiles(e, license, setlicense) }}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
            {license.length > 0 && (


              license?.map((item, index) => {
                return (

                  <div key={index}>
                    {
                      item?.type === 'application/pdf' ? (

                        <div
                          className="flex items-center gap-3 mt-3 bg-sky-100 p-2 rounded-lg relative"
                        >
                          <div className="w-[40px] h-[40px] flex items-center justify-center object-cover rounded-lg bg-red-600 text-white">
                            pdf
                          </div>

                          <span>{item?.name}</span>

                          <div>
                            <button
                              onClick={() => { handleRemoveFile(index, license, setlicense) }}
                              className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white cursor-pointer"
                            >
                              <RxCross2 className="text-white text-lg" />
                            </button>
                          </div>
                        </div>

                      ) : (
                        <div
                          className="flex items-center gap-3 mt-3 bg-sky-100 p-2 rounded-lg relative"
                        >
                          <img
                            src={item?.base64}
                            alt="Image"
                            className="w-[60px] h-[60px] object-cover rounded-lg"
                          />
                          <span>{item?.name}</span>
                          <div>
                            <button
                              onClick={() => { handleRemoveFile(index, license, setlicense) }}
                              className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white cursor-pointer"
                            >
                              <RxCross2 className="text-white text-lg" />
                            </button>
                          </div>
                        </div>
                      )
                    }

                  </div>

                )
              })
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Insurance File <span className="text-xs text-gray-500 bg-red-100 px-1 rounded-lg">Only Png,jpg,jpeg and pdf</span>
            </label>
            <input
              type="file"
              name="insurance"
              multiple
              onChange={(e) => { handleFiles(e, insurance, setinsurance) }}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />









            {insurance.length > 0 && (


              insurance?.map((item, index) => {
                return (

                  <div key={index}>
                    {
                      item?.type === 'application/pdf' ? (

                        <div
                          className="flex items-center gap-3 mt-3 bg-sky-100 p-2 rounded-lg relative"
                        >
                          <div className="w-[40px] h-[40px] flex items-center justify-center object-cover rounded-lg bg-red-600 text-white">
                            pdf
                          </div>

                          <span>{item?.name}</span>

                          <div>
                            <button
                              onClick={() => { handleRemoveFile(index, insurance, setinsurance) }}
                              className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white cursor-pointer"
                            >
                              <RxCross2 className="text-white text-lg" />
                            </button>
                          </div>
                        </div>

                      ) : (
                        <div
                          className="flex items-center gap-3 mt-3 bg-sky-100 p-2 rounded-lg relative"
                        >
                          <img
                            src={item?.base64}
                            alt="Image"
                            className="w-[60px] h-[60px] object-cover rounded-lg"
                          />
                          <span>{item?.name}</span>

                          <div>
                            <button
                              onClick={() => { handleRemoveFile(index, insurance, setinsurance) }}
                              className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white cursor-pointer"
                            >
                              <RxCross2 className="text-white text-lg" />
                            </button>
                          </div>
                        </div>
                      )
                    }

                  </div>

                )
              })
            )}






          </div>









          {/* Service Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">
              Service Images <span className="text-xs text-gray-500 bg-red-100 px-1 rounded-lg">Only Png,jpg,jpeg</span>
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[var(--brandColor)] transition bg-gray-50"
            >
              <UploadCloud className="mx-auto text-gray-400" size={36} />
              <p className="text-sm text-gray-500 mb-2">
                Drag & drop or click to upload images
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => { handleFiles(e, serviceImages, setserviceImages) }}
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


            {serviceImages.length > 0 && (


              serviceImages?.map((item, index) => {
                return (

                  <div key={index}>

                    <div
                      className="flex items-center gap-3 mt-3 bg-sky-100 p-2 rounded-lg relative"
                    >
                      <img
                        src={item?.base64}
                        alt="Image"
                        className="w-[60px] h-[60px] object-cover rounded-lg"
                      />
                      <span>{item?.name}</span>

                      <div>
                        <button
                          onClick={() => { handleRemoveFile(index, serviceImages, setserviceImages) }}
                          className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white cursor-pointer"
                        >
                          <RxCross2 className="text-white text-lg" />
                        </button>
                      </div>
                    </div>

                  </div>

                )
              })
            )}






          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-8">
            <button
              onClick={(e) => { handleSubmit(e) }}
              disabled={loading}
              className="bg-[var(--brandBg)] hover:bg-sky-600 text-white font-semibold py-3 px-12 rounded-full transition-all shadow-md cursor-pointer"
            >
              {loading ? "Submitting..." : "Add Service"}
            </button>
          </div>
        </div>
      </div>
    </section >
  );
}
