"use client";
import TradingCardApplicationSkelaton from "@/app/componnent/TradingCardApplicationSkelaton";
import TradingCardSidebar from "@/app/componnent/TradingCardSidebar";
import useTradingFinalPreview from "@/store/useTradingFinalPreview";
import CaptureScreenshort from "@/utilis/helper/CaptureScreenshort";
import generateUserId from "@/utilis/helper/generateUserId";
import ImageLinkMaker from "@/utilis/helper/ImageLinkMaker";
import { pdfGanarator } from "@/utilis/helper/pdfGanarator";
import MakeGet from "@/utilis/requestrespose/get";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { CiCirclePlus } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Rnd } from "react-rnd";
import { toast, ToastContainer } from "react-toastify";
import ViewCard from "../../../../componnent/ViewCard";

const fonts = ["Arial", "Poppins", "Times New Roman", "Courier New", "Comic Sans MS"];

export default function ProductCustomizer() {


    const { slug } = useParams();

    const previewCardNodeRef = useRef(null);

    // replace these with real image URLs or keep as keys and map to your assets
    const [frontImages, setfrontImages] = useState(null);
    const [backImages, setbackImages] = useState(null);

    const [baseFront, setBaseFront] = useState(null);
    const [baseBack, setBaseBack] = useState(null);
    const [uploads, setUploads] = useState([]); // {id, url, x, y, width, height}
    const [texts, setTexts] = useState([]); // {id, text, font, size, color, x, y, width}

    const [activeText, setActiveText] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [workingcard, setworkingcard] = useState("front");
    const [fetchingData, setfetchingData] = useState(null);
    const [fetchingDataLoading, setfetchingDataLoading] = useState(false);

    const [cards, setCards] = useState([]);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [editmood, seteidtmood] = useState(true);
    const [spinloading, setspinloading] = useState(false);
    const router = useRouter();
    const [doneloading, setdoneloading] = useState(false);
    const { addToCart, clearCart } = useTradingFinalPreview();





    const getBaseTrading = useCallback(async (slug) => {
        setfetchingDataLoading(true);
        const res = await MakeGet(`api/shop/${slug}`);
        setfrontImages(res?.data?.customizations?.trading_fronts);
        setbackImages(res?.data?.customizations?.trading_backs);
        setBaseFront(ImageLinkMaker(res?.data?.customizations?.trading_fronts?.[0]?.image));
        setBaseBack(ImageLinkMaker(res?.data?.customizations?.trading_backs?.[0]?.image));
        setfetchingData(res?.data);
        setfetchingDataLoading(false);
    })


    useEffect(() => {
        getBaseTrading(slug);
    }, [slug]);







    /******** Upload Image ********/
    function handleUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        const item = {
            id: Date.now(),
            url,
            x: 20,
            y: 20,
            width: 120,
            height: 120,
        };
        setUploads((s) => [...s, item]);
        // make the newly uploaded image active
        setActiveImage(item.id);
        setActiveText(null);
    }

    /******** Add New Text ********/
    function addText() {
        const id = Date.now();
        const item = {
            id,
            text: "Edit me",
            font: "Arial",
            size: 20,
            color: "#000000",
            x: 40,
            y: 40,
            width: 180,
        };
        setTexts((s) => [...s, item]);
        setActiveText(id);
        setActiveImage(null);
    }

    /******** Update Active Text ********/
    function updateActiveText(field, value) {
        setTexts((prev) =>
            prev.map((t) => (t.id === activeText ? { ...t, [field]: value } : t))
        );
    }

    /******** Helpers to update positions & sizes ********/
    function updateUploadPosition(id, x, y) {
        setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, x, y } : u)));
    }
    function updateUploadSize(id, width, height) {
        setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, width, height } : u)));
    }
    function updateTextPosition(id, x, y) {
        setTexts((prev) => prev.map((t) => (t.id === id ? { ...t, x, y } : t)));
    }
    function updateTextSize(id, width) {
        setTexts((prev) => prev.map((t) => (t.id === id ? { ...t, width } : t)));
    }

    function deleteActive() {
        if (activeText) {
            setTexts((p) => p.filter((t) => t.id !== activeText));
            setActiveText(null);
        }
        if (activeImage) {
            setUploads((p) => p.filter((u) => u.id !== activeImage));
            setActiveImage(null);
        }
    }





    // start from here

    const activeCard = cards[activeCardIndex];

    /******* Selected Layer Image Function ********/
    const selectLayerImage = (layer, url) => {
        setCards(prev =>
            prev.map((card, i) => {
                if (i !== activeCardIndex) return card;
                const updatedLayers = { ...card.selectedLayers };
                if (updatedLayers[layer] === url) delete updatedLayers[layer];
                else updatedLayers[layer] = url;
                return { ...card, selectedLayers: updatedLayers };
            })
        );
    };



    /******* Add New Card Function ********/
    const addNewCard = () => {

        const basebartwo = data?.customizations?.base_cards?.[0];
        const baseTwo = ImageLinkMaker(basebartwo?.image);
        const initialLayersTwo = {};
        layers.forEach(layer => {
            if (layer === "beards") return;
            const items = product?.customizations?.[layer];

            console.log(items);

            if (items.length > 0) initialLayersTwo[layer] = ImageLinkMaker(items[0]?.image);
        });

        setCards([...cards, { baseImage: baseTwo, selectedLayers: initialLayersTwo }]);
        setActiveCardIndex(cards.length);

    };

    /******* Removed Card Function ********/
    const removeCard = (index) => {
        setCards(prev => {
            const updated = prev.filter((_, i) => i !== index);
            let newActive = activeCardIndex;
            if (updated.length === 0) newActive = 0;
            else if (index < activeCardIndex) newActive -= 1;
            else if (index === activeCardIndex) newActive = Math.min(activeCardIndex, updated.length - 1);
            setActiveCardIndex(newActive);
            return updated;
        });
    };


    /******* Selected Layer Image Function ********/
    const goToFinalView = async () => {


        if (cards.length < 1) {
            toast.warn('Please Customize at least one card');
            return;
        }


        clearCart();
        setspinloading(true);
        const product = {
            id: generateUserId(),
            productId: fetchingData?.id,
            productSlug: fetchingData?.slug,
            productName: fetchingData?.name,
            productType: fetchingData?.type,
            productUnitPrice: fetchingData?.offer_price > 0 ? fetchingData?.offer_price : fetchingData?.price,
            productQuantity: 1,
            productImage: fetchingData?.image,
            productGalary: fetchingData?.images,
            productDescription: fetchingData?.description,
            FinalProduct: cards,
            FinalPDf: await pdfGanarator(cards)
        };


        addToCart(product);

        setTimeout(() => {
            setspinloading(false);
            router.push("/final/trading");
        }, 900);
    };
    // end from here








    const Done = async () => {
        setdoneloading(true);
        await CaptureScreenshort(previewCardNodeRef, cards, setCards);
        setTimeout(() => {
            setdoneloading(false);
        }, [600])
    }




    if (fetchingDataLoading) return <TradingCardApplicationSkelaton />



    return (
        <div className="grid grid-cols-12 grid-rows-12 gap-0 lg:gap-2 h-screen w-screen fixed bg-gray-100">
            {/* Left Sidebar (kept simple as in your last snippet) */}
            <div className="col-span-12 row-span-2 lg:row-span-12 lg:col-span-2 w-full h-full bg-white">
                {/* replace this with <CardSidebar /> when available */}
                <div className="w-full h-full">

                    <TradingCardSidebar cards={cards} addCard={addNewCard} Done={Done} removeCard={removeCard} editmood={editmood} seteidtmood={seteidtmood} doneloading={doneloading} />

                </div>
            </div>

            {/* Middle area (contains canvas and right-panel inside it like your original layout) */}
            <div className="col-span-12 row-span-10 lg:row-span-12 lg:col-span-10 h-full lg:h-screen w-full">
                <div className="grid grid-cols-10 grid-rows-10 h-full w-full mt-2 lg:mt-0">
                    {/* Canvas column (middle) */}
                    <div className="col-span-10 row-span-4 lg:row-span-10 lg:col-span-6 flex items-center justify-center lg:-translate-y-[50px] w-screen lg:w-full h-full lg:h-full">
                        <div ref={previewCardNodeRef} className="border border-gray-200 rounded-md bg-white w-[140px] md:w-[190px] lg:w-[390px] h-[200px] md:h-[300px] lg:h-[570px] relative overflow-hidden">
                            {/* Uploaded images (zIndex:1) - draggable & resizable */}
                            {uploads.map((img) => (
                                <Rnd

                                    resizeHandleStyles={{
                                        topLeft: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                        topRight: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                        bottomLeft: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                        bottomRight: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                    }}
                                    style={{
                                        border: activeText === img.id || activeImage === img?.id ? "2px dashed #3b82f6" : "none",
                                        borderRadius: "4px",
                                    }}


                                    key={img.id}
                                    bounds="parent"
                                    size={{ width: img.width, height: img.height }}
                                    position={{ x: img.x, y: img.y }}
                                    onDragStop={(_, d) => updateUploadPosition(img.id, d.x, d.y)}
                                    onResizeStop={(_, __, ref, ___, pos) => {
                                        updateUploadSize(img.id, parseInt(ref.style.width, 10), parseInt(ref.style.height, 10));
                                        updateUploadPosition(img.id, pos.x, pos.y);
                                    }}
                                    onMouseDown={() => {
                                        setActiveImage(img.id);
                                        setActiveText(null);
                                    }}
                                    style={{ zIndex: 1 }}
                                >
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={img.url}
                                        alt="upload"
                                        className="w-full h-full object-contain rounded"
                                        draggable={false}
                                    />
                                </Rnd>
                            ))}

                            {/* Front base (zIndex:2) */}
                            {baseFront && workingcard === "front" && (
                                <Image
                                    src={baseFront}
                                    width={1000}
                                    height={1000}
                                    alt="front-base"
                                    className="absolute inset-0 object-cover w-full h-full"
                                    style={{ zIndex: 2, pointerEvents: "none" }}
                                />
                            )}

                            {/* Back base (zIndex:2) */}
                            {baseBack && workingcard === "back" && (
                                <Image
                                    src={baseBack}
                                    height={1000}
                                    width={1000}
                                    alt="back-base"
                                    className="absolute inset-0 object-cover w-full h-full"
                                    style={{ zIndex: 2, pointerEvents: "none" }}
                                />
                            )}

                            {/* Text layers (zIndex:4) */}
                            {/* Texts draggable */}
                            {texts?.map((t) => (
                                <Rnd


                                    resizeHandleStyles={{
                                        topLeft: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                        topRight: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                        bottomLeft: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                        bottomRight: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                    }}
                                    style={{
                                        border: activeText === t.id ? "2px dashed #3b82f6" : "none",
                                        borderRadius: "4px",
                                        padding: "0px 1px",
                                        zIndex: 99
                                    }}

                                    key={t.id}
                                    default={{
                                        x: t.x,
                                        y: t.y,
                                        width: "fit-content", // give a default width so dragging works
                                        height: "auto",
                                    }}
                                    bounds="parent"
                                    enableResizing={false} // disable resize if you only want dragging
                                    onClick={() => setActiveText(t.id)}
                                    onDragStop={(e, d) => {
                                        // update position in state
                                        setTexts((prev) =>
                                            prev.map((item) =>
                                                item.id === t.id ? { ...item, x: d.x, y: d.y } : item
                                            )
                                        );
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: `${t.size}px`,
                                            fontFamily: t.font,
                                            color: t.color,
                                            cursor: "move",
                                            whiteSpace: "nowrap",
                                            zIndex: 99
                                        }}
                                    >
                                        {t.text}
                                    </div>
                                </Rnd>
                            ))}

                            {/* small helper overlay when nothing selected */}
                            {!uploads.length && !baseFront && !baseBack && !texts.length && (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">Preview area</div>
                            )}
                        </div>
                    </div>

                    {/* Right Controls column (inside the middle wrapper as your original) */}
                    <div className="col-span-10 row-span-6 lg:row-span-10 lg:col-span-4 w-screen lg:w-full h-full bg-white border-t lg:border-l border-gray-200 px-2 md:px-6 lg:px-6 mt-2 lg:mt-0">
                        <div className="h-full lg:h-[83vh] overflow-y-scroll mt-2 space-y-4">

                            <div>
                                <label className="block text-gray-700 mb-1">Select Base Card *</label>
                                <select onChange={(e) => { setworkingcard(e.target.value) }} value={workingcard} className="w-full border border-gray-200 rounded-md p-2 text-gray-500 focus:outline-none" name="baseCard" id="">
                                    <option value="front">Front</option>
                                    <option value="back">Back</option>
                                </select>
                            </div>


                            {/* Front Base Card */}
                            {
                                workingcard === "front" && <div>
                                    <label className="block text-gray-700 mb-1">Front Base Card *</label>
                                    <div className="flex flex-wrap gap-2">
                                        {frontImages?.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={ImageLinkMaker(img?.image)}
                                                width={1000}
                                                height={1000}
                                                alt={`front-${idx}`}
                                                onClick={() => setBaseFront(ImageLinkMaker(img?.image))}
                                                className={`w-16 h-20 cursor-pointer rounded ${baseFront === ImageLinkMaker(img?.image) ? "border-3 border-sky-700" : "border-2 border-gray-200"}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                            }




                            {/* Back Base Card */}
                            {
                                workingcard === "back" && <div>
                                    <label className="block text-gray-700 mb-1">Back Base Card *</label>
                                    <div className="flex flex-wrap gap-2">
                                        {backImages?.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={ImageLinkMaker(img?.image)}
                                                width={1000}
                                                height={1000}
                                                alt={`back-${idx}`}
                                                onClick={() => setBaseBack(ImageLinkMaker(img?.image))}
                                                className={`w-16 h-20 cursor-pointer rounded ${baseBack === ImageLinkMaker(img?.image) ? "border-3 border-sky-700" : "border-2 border-gray-200"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            }

                            {/* Upload Image */}
                            <div>
                                <label className="block text-gray-700 mb-1">Upload Image *</label>
                                <label htmlFor="uploadImage">
                                    <div className=" w-[80px] h-[80px] lg:w-full lg:h-[150px] bg-gray-100 rounded-md flex items-center justify-center cursor-pointer">
                                        <CiCirclePlus className="text-8xl text-gray-300" />
                                    </div>
                                </label>
                                <input onChange={handleUpload} id="uploadImage" type="file" className="hidden" accept="image/*" />
                            </div>


                            {/* Add Text */}
                            <div className="flex items-center justify-between">
                                <label className="block text-gray-700 mb-1">Add Text</label>
                                <div>
                                    <button onClick={addText} className="px-2 py-2 bg-sky-400 text-white rounded">
                                        <FaPlus />
                                    </button>
                                    {/* Delete button for active item */}
                                    <button onClick={deleteActive} className="ml-2 px-2 py-2 bg-red-400 text-white rounded" disabled={!activeText && !activeImage}>
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>


                            {/* Text Controls */}
                            {activeText && (
                                <div className="space-y-2 pt-3 mt-3 text-gray-700">
                                    <label className="block text-sm">Text</label>
                                    <input
                                        type="text"
                                        value={texts.find((t) => t.id === activeText)?.text || ""}
                                        onChange={(e) => updateActiveText("text", e.target.value)}
                                        className="border border-gray-200 rounded w-full px-2 py-1"
                                    />

                                    <label className="block text-sm">Font</label>
                                    <select
                                        value={texts.find((t) => t.id === activeText)?.font || ""}
                                        onChange={(e) => updateActiveText("font", e.target.value)}
                                        className="border border-gray-200 rounded w-full px-2 py-1"
                                    >
                                        {fonts.map((f) => (
                                            <option key={f} value={f}>
                                                {f}
                                            </option>
                                        ))}
                                    </select>

                                    <label className="block text-sm">Size</label>
                                    <input
                                        type="number"
                                        value={texts.find((t) => t.id === activeText)?.size || ""}
                                        onChange={(e) => updateActiveText("size", parseInt(e.target.value || "0", 10) || 0)}
                                        className="border border-gray-200 rounded w-full px-2 py-1"
                                    />

                                    <label className="block text-gray-700 mb-1 mt-3">Color</label>
                                    <HexColorPicker color={texts.find((t) => t.id === activeText)?.color || "#000"} onChange={(c) => updateActiveText("color", c)} />
                                </div>
                            )}





                            {/* Image controls (when an upload is active) */}
                            {activeImage && (
                                <div className="space-y-2 text-gray-700 border-t pt-3 mt-3">
                                    <div className="text-sm font-medium">Image selected</div>
                                    <div className="text-sm">You can drag / resize directly on canvas</div>
                                </div>
                            )}

                        </div>

                        {/* Bottom Button */}
                        <ViewCard isLoading={spinloading} goToFinalView={goToFinalView} />
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-center" />
        </div>
    );
}

