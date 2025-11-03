import domtoimage from "dom-to-image-more";

const CaptureScreenshort = async (nodeRef, state, seterState) => {
    try {
        const dataUrl = await domtoimage.toPng(nodeRef.current);
        seterState([...state, dataUrl]);
    } catch (err) {
        console.error("Screenshot failed:", err);
    }
}


export default CaptureScreenshort;