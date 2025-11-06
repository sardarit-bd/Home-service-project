const MakePost = async (endpoint, data, token) => {
  try {
    const isFormData = data instanceof FormData;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`,
      {
        method: "POST",
        headers: {
          ...(isFormData
            ? { Authorization: `Bearer ${token}`,
            "Context-Type": "multipart/form-data"
         } // no Content-Type for FormData
            : {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              }),
        },
        body: isFormData ? data : JSON.stringify(data),
      }
    );

    console.log("Response status:", response);

    if (!response.ok) {
      console.error(`Request failed with status: ${response.status}`);
      return false;
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Request error:", error);
    return false;
  }
};

export default MakePost;
