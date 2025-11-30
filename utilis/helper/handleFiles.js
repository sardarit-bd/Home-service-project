// Allowed file types
const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];

function handleFiles(event, stateArray, setStateArray) {
    const files = Array.from(event.target.files);
    let updatedList = [...stateArray];

    // Don't allow more than 5 files total
    if (updatedList.length + files.length > 5) {
        alert("You can upload maximum 5 files.");
        return;
    }

    files.forEach((file) => {
        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            alert(`File ${file.name} is not allowed. Only PNG, JPG, JPEG, PDF are accepted.`);
            return;
        }

        // Convert file → Base64
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            const base64String = reader.result;

            // Add to state array
            updatedList.push({
                name: file.name,
                size: file.size,
                type: file.type,
                base64: base64String,
            });

            // Save to state
            setStateArray([...updatedList]);
        };

        reader.onerror = () => {
            alert(`Failed to read file: ${file.name}`);
        };
    });
}



export default handleFiles;