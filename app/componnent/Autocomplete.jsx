import { useEffect, useRef, useState } from "react";

export default function Autocomplete({ suggestions = [], onSelect, inputValue, setInputValue }) {


    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [showList, setShowList] = useState(false);

    const wrapperRef = useRef();

    // Handle click outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowList(false);
                setActiveIndex(-1);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter suggestions
    useEffect(() => {
        if (!inputValue) {
            setFilteredSuggestions([]);
            return;
        }
        const filtered = suggestions.filter((item) => {
            return item?.toLowerCase()?.startsWith(inputValue.toLowerCase())
        });
        setFilteredSuggestions(filtered);
        setShowList(true);
    }, [inputValue]);

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (!showList) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev < filteredSuggestions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : filteredSuggestions.length - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0) {
                const selected = filteredSuggestions[activeIndex];
                setInputValue(selected);
                setShowList(false);
                if (onSelect) onSelect(selected);
            }
        }
    };

    // Select a value
    const handleSelect = (value) => {
        setInputValue(value);
        setShowList(false);
        if (onSelect) onSelect(value);
    };



    return (
        <div className="relative w-full" ref={wrapperRef}>
            <input
                type="text"
                className="flex-1 bg-transparent outline-none px-3 text-gray-800 placeholder:text-gray-500 w-full"
                placeholder="Search services..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {showList && filteredSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full bg-white border border-gray-300 shadow-lg text-left max-h-40 w-fit overflow-y-auto rounded z-50">
                    {filteredSuggestions.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(item)}
                            className={`p-3 cursor-pointer ${index === activeIndex
                                ? "bg-sky-400 text-white"
                                : "hover:bg-gray-100"
                                }`}
                        >
                            <strong>{item.substring(0, inputValue.length)}</strong>
                            {item.substring(inputValue.length)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
