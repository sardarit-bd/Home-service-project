import { Check, ChevronDown } from 'lucide-react';

const AreaSelector = ({ Areas, selectedAreas, selectedSubareas, setSelectedAreas, setSelectedSubareas }) => {



    const handleCategoryChange = (e) => {
        setSelectedAreas(e.target.value);
        setSelectedSubareas([]);
    };

    const toggleSubcategory = (subcategory) => {
        if (selectedSubareas.includes(subcategory)) {
            setSelectedSubareas(selectedSubareas.filter(item => item !== subcategory));
        } else {
            setSelectedSubareas([...selectedSubareas, subcategory]);
        }
    };


    const corrospondingSubcategories = Areas?.filter((item) => {
        return item?.areaName === selectedAreas

    });



    return (
        <div className="">
            {/* Category Selection */}
            <div className="mb-8">
                <div className="relative">
                    <select
                        value={selectedAreas}
                        onChange={handleCategoryChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    >
                        <option value="">Choose a category...</option>
                        {Areas?.map((category, index) => (
                            <option key={index} value={category?.areaName}>
                                {category?.areaName}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
            </div>

            {/* Subcategory Selection */}
            {selectedAreas && (
                <div className="animate-fadeIn">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select Areas
                    </label>
                    <div className="grid grid-cols-2 gap-3">


                        {corrospondingSubcategories[0]?.subareas?.map((subcategory, index) => (
                            <button
                                key={subcategory, index}
                                onClick={() => toggleSubcategory(subcategory)}
                                className={`relative px-4 py-3 rounded-lg border-2 transition-all text-left ${selectedSubareas.includes(subcategory)
                                    ? 'bg-sky-500 border-sky-500 text-white shadow-md'
                                    : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
                                    }`}
                            >
                                <span className="flex items-center justify-between">
                                    <span className="font-medium">{subcategory}</span>
                                    {selectedSubareas.includes(subcategory) && (
                                        <Check size={18} className="ml-2" />
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Selected Items Display */}
            {selectedSubareas.length > 0 && (
                <div className="mt-8 p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Selected Items ({selectedSubareas.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedSubareas.map((item) => (
                            <span
                                key={item}
                                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-indigo-700 shadow-sm"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Clear Button */}
            {selectedAreas && (
                <button
                    onClick={() => {
                        setSelectedAreas('');
                        setSelectedSubareas([]);
                    }}
                    className="mt-6 w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                    Clear Selection
                </button>
            )}


            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div >
    );
};

export default AreaSelector;