"use client";

export default function ProfileSkeleton() {
    return (
        <div className="container mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT SECTION */}
            <div className="lg:col-span-2 space-y-6">

                {/* Name + Rating + Bio */}
                <div className="bg-white p-6 rounded-xl shadow animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>

                    {/* Stars + reviews */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                    </div>

                    {/* Bio text */}
                    <div className="space-y-3">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-6 rounded-xl shadow animate-pulse space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-40"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>

                {/* Services Offered */}
                <div className="bg-white p-6 rounded-xl shadow animate-pulse space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-40"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded w-3/4"></div>
                        ))}
                    </div>
                </div>

                {/* Customer Reviews */}
                <div className="bg-white p-6 rounded-xl shadow animate-pulse space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-48"></div>

                    {/* Single review skeleton */}
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="space-y-3 pt-4 border-t">
                            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDEBAR IMAGES */}
            <div className="space-y-6">

                {/* Image 1 */}
                <div className="w-full h-64 bg-gray-300 rounded-xl animate-pulse"></div>

                {/* Image 2 */}
                <div className="w-full h-72 bg-gray-300 rounded-xl animate-pulse"></div>

                {/* Stats Image */}
                <div className="w-full h-72 bg-gray-300 rounded-xl animate-pulse"></div>
            </div>

        </div>
    );
}
