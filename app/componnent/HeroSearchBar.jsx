"use client";

import useSearchStore from "@/store/useSearchStore";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeroSearchBar = () => {
    const router = useRouter();

    const { services, setservices, area, setarea } = useSearchStore();


    // Areas from API
    const [Areas, setAreas] = useState([]);

    // Category list for suggestions
    const categories = [
        "Handyman",
        "Landscaping",
        "Plumbing",
        "Electrical",
        "Remodeling",
        "Roofing",
        "Painting & Flooring",
        "Cleaning",
        "HVAC",
        "Windows & Doors",
        "Concrete",
        "Other home services",
    ];

    // Autocomplete state
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);

    // Suggestion filter
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const matches = categories.filter((cat) =>
                cat.toLowerCase().includes(value.toLowerCase())
            );

            setservices(matches[0]);
            setFiltered(matches);
        } else {
            setFiltered([]);
            setservices(value);

        }
    };

    const handleSelect = (value) => {
        setQuery(value);
        setFiltered([]);
    };

    // Fetch areas
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

    useEffect(() => {
        fetchAreas();
    }, []);





    //handle area selection
    const handleAreaSelect = (e) => {
        setarea(e.target.value.toLowerCase());
    };



    // Search handler
    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;

        router.push(`/services/${services}`);
    };




    return (
        <div className="w-full flex justify-center items-center">
            <motion.form
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="flex relative z-50 items-center justify-center bg-white/90 backdrop-blur-md rounded-full p-2 pl-4 w-full max-w-2xl mx-auto shadow-sm border border-gray-100"
            >
                {/* Search Icon */}
                <Search className="text-gray-600" size={38} />

                {/* Search Input with Autocomplete */}
                <div className="relative w-full">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="Search services or area"
                        className="flex-1 bg-transparent outline-none px-3 text-gray-800 placeholder-gray-500 w-full"
                    />

                    {filtered.length > 0 && (
                        <ul className="absolute left-0 right-0 top-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
                            {filtered.map((item, index) => (
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
                <select onChange={(e) => { handleAreaSelect(e) }} className="h-[42px] border border-gray-200 px-6 rounded-full mr-3 text-gray-600 outline-none bg-white">
                    <option value="">Select Area</option>
                    {Areas.map((area) => (
                        <option
                            className="capitalize"
                            key={area._id}
                            value={area.areaName}
                        >
                            {area.areaName.toLowerCase()}
                        </option>
                    ))}
                </select>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-[var(--brandColor,#00a6f4)] text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all"
                >
                    Search
                </button>
            </motion.form>
        </div>
    );
};

export default HeroSearchBar;
