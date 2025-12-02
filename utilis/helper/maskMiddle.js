function maskMiddle(str) {
    if (!str || str.length < 5) return str; // Too short — skip masking

    const len = str.length;
    const maskLength = Math.floor(len * 0.40);

    // Ensure at least 1 char masked
    const maskCount = maskLength > 0 ? maskLength : 1;

    const start = Math.floor((len - maskCount) / 2);
    const end = start + maskCount;

    const masked =
        str.slice(0, start) +
        "*".repeat(maskCount) +
        str.slice(end);

    return masked;
}
export default maskMiddle;