import ImageLinkMaker from "@/utilis/helper/ImageLinkMaker";
import Image from "next/image";

const BaseSelector = ({ product, activeCard, selectBase }) => (
  <div style={{ marginBottom: "1.5rem" }}>
    <h3 className="text-gray-500 text-lg pt-5 pb-2">Base Card Image</h3>
    <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
      {(product.customizations?.base_cards)?.map((image, idx) => {
        return (
          <Image
            width={1000}
            height={1000}
            key={idx}
            src={ImageLinkMaker(image?.image)}
            alt={`Base ${idx + 1}`}
            className={`w-[60px] h-[80px] object-cover cursor-pointer rounded-lg p-1 ${activeCard?.baseImage === ImageLinkMaker(image?.image) ? "border border-2 border-sky-500 bg-sky-200" : "border border-2 border-gray-300"}`}
            onClick={() => selectBase(ImageLinkMaker(image?.image))}
          />
        );
      })}
    </div>
  </div>
);


export default BaseSelector;