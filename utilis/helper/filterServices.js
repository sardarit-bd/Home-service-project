function filterServices(services, { area, category, sub }) {
    return services.filter(service => {

        let matchArea = true;
        let matchCategory = true;
        let matchSub = true;

        // --- Filter by Area ---
        if (area) {
            // If area is a string
            if (typeof service.area === "string") {
                matchArea = service.area.toLowerCase() === area.toLowerCase();
            }
            // If area is an array
            else if (Array.isArray(service.area)) {
                matchArea = service.area
                    .map(a => a.toLowerCase())
                    .includes(area.toLowerCase());
            }
        }

        // --- Filter by Category ---
        if (category) {
            matchCategory =
                service.category?.toLowerCase() === category.toLowerCase();
        }

        // --- Filter by Sub Category ---
        if (sub) {
            // If subCategory is string
            if (typeof service.subCategory === "string") {
                matchSub =
                    service.subCategory.toLowerCase() === sub.toLowerCase();
            }
            // If subCategory is array
            else if (Array.isArray(service.subCategory)) {
                matchSub = service.subCategory
                    .map(s => s.toLowerCase())
                    .includes(sub.toLowerCase());
            }
        }

        return matchArea && matchCategory && matchSub;
    });
}

export default filterServices;