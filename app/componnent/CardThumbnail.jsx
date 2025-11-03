import Image from "next/image";

const layers = [
  "dresses", "skin_tones", "hairs", "crowns",
  "beards", "eyes", "mouths", "noses"
];

const CardThumbnail = ({ finalCard, onClick }) => {

  return (
    <div
      className="w-[50px] h-full md:h-auto lg:w-full lg:h-[180px] xl:h-[200px] relative rounded-lg cursor-pointer"
      onClick={onClick}
    >

      <Image
        width={1000}
        height={1000}
        src={finalCard}
        alt="base"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain" }}
      />

    </div>
  )
};

export default CardThumbnail;