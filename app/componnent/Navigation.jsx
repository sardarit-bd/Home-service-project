

"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navigation = ({ isOpen, setisOpen }) => {
    const pathname = usePathname();
    const [hoveredMain, setHoveredMain] = useState(null);
    const [hoveredSub, setHoveredSub] = useState(null);

    const navItems = [
        { name: "Home", link: "/", nested: false },
        { name: "About", link: "/about", nested: false },
        {
            name: "Services",
            nested: true,
            link: "/services",
            sub: [
                {
                    name: "Handyman",
                    nested: true,
                    link: "/services/handyman",
                    sub: [
                        "Carpentry",
                        "Doors",
                        "Electrical",
                        "Plumbing",
                        "Appliances",
                        "Furniture Assembly",
                        "TV Mounting",
                        "Drywall",
                        "Windows",
                        "Landscaping",
                        "Air Conditioning System",
                        "Interior Painting",
                        "Exterior Painting",
                        "Siding",
                        "Moving Help",
                        "Other"
                    ]
                },
                {
                    name: "Landscaping",
                    nested: true,
                    link: "/services/landscaping",
                    sub: [
                        "Install or Design Landscaping",
                        "Lawn Care (Mowing, Clean-up, or Sod)",
                        "Trees and Shrubs (Trim, Removal)",
                        "Install Curbing or Edging",
                        "Patios / Walkways / Outdoor Living",
                        "Yard Drainage / Land Grading",
                        "Fence Installation / Repair",
                        "Other"
                    ]
                },
                {
                    name: "Plumbing",
                    nested: true,
                    link: "/services/plumbing",
                    sub: [
                        "Faucets / Fixtures / Drains / Pipes",
                        "Water Heater",
                        "Septic System / Sewer / Water Main",
                        "Other"
                    ]
                },
                {
                    name: "Electrical",
                    nested: true,
                    link: "/services/electrical",
                    sub: [
                        "Lights / Outlets / Switches",
                        "Electrical Wiring / Panel",
                        "Addition / Remodel Electrical",
                        "EV Charger Installation",
                        "Generator",
                        "Fan Installation",
                        "Smart Home System",
                        "Lightning Rod / Protection",
                        "Other"
                    ]
                },
                {
                    name: "Remodeling",
                    nested: true,
                    link: "/services/remodeling",
                    sub: [
                        "Bathroom Remodel",
                        "Kitchen Remodel",
                        "Building an Addition",
                        "Basement Remodel",
                        "Garage Remodel",
                        "Decks & Porches",
                        "Other Remodeling Projects",
                        "Other"
                    ]
                },
                {
                    name: "Roofing",
                    nested: true,
                    link: "/services/roofing",
                    sub: [
                        "Install / Repair Roof",
                        "Install / Replace Gutters",
                        "Siding",
                        "Clean Roof / Gutters",
                        "Chimney Work",
                        "Other"
                    ]
                },
                {
                    name: "Painting & Flooring",
                    nested: true,
                    link: "/services/painting-flooring",
                    sub: [
                        "Interior Painting",
                        "Exterior Painting",
                        "Specialty Finishes",
                        "Carpeting",
                        "Wood / Vinyl / Laminate / Tile Flooring",
                        "Other"
                    ]
                },
                {
                    name: "Cleaning",
                    nested: true,
                    link: "/services/cleaning",
                    sub: [
                        "General Cleaning / Housekeeping",
                        "Carpets / Rugs",
                        "Furniture / Upholstery",
                        "Windows",
                        "Professional Organizer",
                        "Duct / Ventilation Cleaning",
                        "Junk Removal / Disposal",
                        "Other"
                    ]
                },
                {
                    name: "HVAC",
                    nested: true,
                    link: "/services/hvac",
                    sub: [
                        "Air Conditioning",
                        "Heating (Furnace / Water Heater)",
                        "Thermostat & Accessories",
                        "Other HVAC Services"
                    ]
                },
                {
                    name: "Windows & Doors",
                    nested: true,
                    link: "/services/windows-doors",
                    sub: [
                        "Window Installation",
                        "Repair Windows",
                        "Door Installation",
                        "Window & Door Accessories",
                        "Other"
                    ]
                },
                {
                    name: "Concrete",
                    nested: true,
                    link: "/services/concrete",
                    sub: [
                        "Patio / Walkway / Steps",
                        "Driveway",
                        "Foundation",
                        "Floors",
                        "Walls",
                        "Swimming Pool",
                        "Other"
                    ]
                },
                {
                    name: "Other Home Services",
                    nested: true,
                    link: "/services/other",
                    sub: [
                        "Pest Control",
                        "Cabinet Work",
                        "Glass & Mirrors",
                        "Stone Work",
                        "Demolition",
                        "Decoration",
                        "Moving",
                        "Solar Panel Installation",
                        "Asbestos / Lead Removal",
                        "Other"
                    ]
                }
            ]
        },
        { name: "Contact Us", link: "/contact", nested: false },
    ];

    return (
        <nav
            className={`${isOpen ? "flex" : "hidden"
                } lg:flex flex-col lg:flex-row lg:items-center absolute lg:static top-[75px] left-0 bg-white border lg:border-0 w-full lg:w-auto h-screen lg:h-auto z-50`}
        >
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-7 px-4 lg:px-0 py-6 lg:py-0 w-full text-gray-600">
                {navItems.map((item, i) =>
                    item.nested ? (
                        <div
                            key={i}
                            className="relative group"
                            onMouseEnter={() => setHoveredMain(i)}
                            onMouseLeave={() => {
                                setHoveredMain(null);
                                setHoveredSub(null);
                            }}
                        >
                            <button
                                className={`font-semibold text-md px-3 py-2 rounded-md hover:bg-sky-50 transition-all ${pathname === item.link ? "bg-sky-100 text-sky-600" : ""
                                    }`}
                            >
                                {item.name}
                            </button>

                            {/* First Level Dropdown */}
                            {hoveredMain === i && (
                                <div className="absolute top-full left-0 mt-0 bg-white border border-gray-200 rounded-lg shadow-lg w-60">
                                    {item.sub.map((subItem, j) => (
                                        <div
                                            key={j}
                                            className="relative group"
                                            onMouseEnter={() => setHoveredSub(j)}
                                            onMouseLeave={() => setHoveredSub(null)}
                                        >
                                            <div className="flex justify-between items-center px-4 py-2 font-medium hover:bg-sky-50 cursor-pointer">
                                                <span className="text-md">{subItem.name}</span>
                                                <ChevronRight size={16} className="text-gray-400" />
                                            </div>

                                            {/* Second Level Dropdown */}
                                            {hoveredSub === j && subItem.sub?.length > 0 && (
                                                <div className="absolute top-0 left-full ml-0 bg-white border border-gray-200 rounded-lg shadow-lg w-60">
                                                    {subItem.sub.map((subName, k) => (
                                                        <Link
                                                            key={k}
                                                            href={`${subItem.link}/${subName
                                                                .toLowerCase()
                                                                .replace(/\s+/g, "-")}`}
                                                            className="block px-4 py-2 text-md text-gray-700 hover:bg-sky-50"
                                                            onClick={() => setisOpen(false)}
                                                        >
                                                            {subName}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            key={i}
                            href={item.link}
                            onClick={() => setisOpen(false)}
                            className={`font-semibold text-md px-3 py-2 rounded-md hover:bg-sky-50 transition-all ${pathname === item.link ? "bg-sky-100 text-sky-600" : ""
                                }`}
                        >
                            {item.name}
                        </Link>
                    )
                )}
            </div>
        </nav>
    );
};

export default Navigation;











