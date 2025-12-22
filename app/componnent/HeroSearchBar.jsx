"use client";

import useSearchStore from "@/store/useSearchStore";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Autocomplete from "./Autocomplete";

const HeroSearchBar = () => {
    const router = useRouter();
    const [Areas, setAreas] = useState([]);
    const [Categories, setCategories] = useState([]);
    const { services, setservices, area, setarea, subarea, setsubarea } = useSearchStore();








    /************** Fetch all areas here ******************/
    const fetchAreas = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/allarea`
            );
            const data = await res.json();
            if (data.success) setAreas(data.total || []);
        } catch (err) {
            console.error("Failed to load areas:", err);
        }
    };


    //************** Fetch all categories here ******************/
    const fetchCategories = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/allcatagory`,
            );
            const data = await res.json();
            if (data.success) setCategories(data.total || []);
        } catch (err) {
            console.error("Failed to load categories:", err);
        }
    };




    //************** useeffect call here for mount the component controlly ******************/
    useEffect(() => {
        fetchAreas();
        fetchCategories();

    }, []);









    /************** handle area selection here *******************/
    const handleAreaSelect = (e) => {

        if (e.target.value) {
            setarea(e.target.value.toLowerCase());
        } else {
            setarea(e.target.value.toLowerCase());
            setsubarea(e.target.value.toLowerCase());
        }

    };




    //currosponsing subarea filter here
    const filterArea = Areas?.filter((item, index) => {
        return item?.areaName.toLowerCase() === area.toLowerCase();
    })








    // Search handler
    const handleSearch = (e) => {
        e.preventDefault();


        if (services && area && subarea) {
            router.push(`/services/${services.toLowerCase()}`);
        } else {
            toast.warn("Please Select a Service and Metripoliton and Area");
        }
    };



    //Passding able categories for passing to autocomplete componnent
    const PassdingAbleCategories = [];
    Categories.map(cat => PassdingAbleCategories.push(cat?.categoryName));

    return (
        <div className="w-full flex justify-center items-center px-3 md:px-0">
            <motion.form
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="flex relative z-50 items-center justify-center bg-white/90 backdrop-blur-md rounded-full p-2 pl-4 w-full max-w-3xl mx-auto shadow-sm border border-gray-100"
            >
                {/* Search Icon */}
                <Search className="text-gray-600 hidden md:bloclk" size={38} />

                {/* Search Input with Autocomplete */}
                <div className="relative w-full">
                    <Autocomplete
                        suggestions={PassdingAbleCategories}
                        placeholder="Search countries..."
                        onSelect={(value) => console.log("Selected:", value)}
                        inputValue={services}
                        setInputValue={setservices}
                    />

                    {[]?.length === 0 && (
                        <ul className="hidden absolute left-0 right-0 top-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
                            {[]?.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(item)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Area Dropdown */}
                <div className="flex items-center gap-1 mr-3">
                    {/* <select onChange={(e) => { handleAreaSelect(e) }} className="h-fit  px-2 rounded-full text-gray-600 outline-none bg-white cursor-pointer" value={area.toLowerCase()}>
                        <option className="text-gray-500 font-extralight" value="">Select Metropolitan</option>
                        {Areas.map((area) => (
                            <option
                                className="capitalize"
                                key={area._id}
                                value={area.areaName.toLowerCase()}
                            >
                                {area.areaName.toLowerCase()}
                            </option>
                        ))}
                    </select> */}

                    <select onChange={(e) => { setsubarea(e.target.value.toLocaleLowerCase()) }} value={subarea.toLowerCase()} className="h-fit w-[100px] md:w-fit px-1 md:px-2 rounded-full text-gray-600 outline-none bg-white cursor-pointer text-sm md:text-base">
                        <option value="" className="text-gray-500 font-extralight text-sm md:text-base">Select Area</option>
                        {filterArea?.[0]?.subareas?.map((area, index) => (
                            <option
                                className="capitalize text-sm md:text-base"
                                key={index}
                                value={area?.toLowerCase()}
                            >
                                {area?.toLowerCase()}
                            </option>
                        ))}
                    </select>

                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-[var(--brandColor,#00a6f4)] text-white px-2 md:px-6 py-1 text-md md:py-2 rounded-full font-semibold hover:opacity-90 transition-all cursor-pointer"
                >
                    Search
                </button>
            </motion.form>
        </div>
    );
};

export default HeroSearchBar;
