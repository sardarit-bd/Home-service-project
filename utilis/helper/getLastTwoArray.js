function getLastTwoArray(path) {
    const parts = path.split("/").filter(Boolean); // remove empty
    return parts.slice(-2); // return last 2 as array
}


export default getLastTwoArray;