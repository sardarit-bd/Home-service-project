"use client";

export default function SkeletonList() {
    return (
        <div className="container mx-auto my-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="border rounded-md shadow-sm p-4 animate-pulse"
                    >
                        {/* Image Placeholder */}
                        <div className="w-full h-48 bg-gray-300 rounded-md mb-4" />

                        {/* Name */}
                        <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>

                        {/* Subtitle */}
                        <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <div
                                    key={j}
                                    className="h-3 w-3 bg-gray-200 rounded-full"
                                ></div>
                            ))}
                        </div>

                        {/* Button */}
                        <div className="w-24 h-8 bg-gray-300 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
