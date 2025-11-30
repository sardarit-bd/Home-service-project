import { Star } from "lucide-react";
import { useState } from "react";

function Ratings({ rating, setRating }) {
    const [hovered, setHovered] = useState(0);

    // Tooltip messages
    const messages = [
        "Very bad, avoid at all",
        "Not good, not recommended",
        "It's OK, acceptable",
        "Good, recommend",
        "Excellent, highly recommend"
    ];

    const activeValue = hovered || rating;

    return (
        <div className="flex flex items-start gap-2 relative">
            {/* Stars */}
            <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => {
                    const value = i + 1;

                    return (
                        <Star
                            key={i}
                            size={38}
                            className="cursor-pointer transition-all"
                            onClick={() => setRating(value)}
                            onMouseEnter={() => setHovered(value)}
                            onMouseLeave={() => setHovered(0)}
                            fill={
                                value <= activeValue
                                    ? "currentColor"
                                    : "none"
                            }
                            strokeWidth={1.5}
                        />
                    );
                })}
            </div>

            {/* Tooltip text */}
            {activeValue > 0 && (
                <div className="text-md text-gray-900 pl-1 bg-sky-100 border-2 border-sky-200 py-2 px-4 rounded-md">
                    {messages[activeValue - 1]}
                </div>
            )
            }
        </div >
    );
}

export default Ratings;
