import { motion } from "framer-motion";
import Image from "next/image";
import img2 from "../../public/about.jpg";
import img3 from "../../public/Electricals.jpg";
import img1 from "../../public/home-service-bg.jpg";

const DetailsPageSideImageWrper = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="self-start sticky top-[100px] space-y-4"
        >
            {/* Image 1 */}
            <div className="rounded-xl overflow-hidden shadow-md">
                <Image
                    src={img1}
                    alt="gallery-1"
                    width={1000}
                    height={1000}
                    className="w-full h-[200px] md:h-[280px] object-cover overflow-hidden"
                />
            </div>

            {/* Image 2 */}
            <div className="rounded-xl overflow-hidden shadow-md">
                <Image
                    src={img2}
                    alt="gallery-2"
                    width={1000}
                    height={1000}
                    className="w-full h-[200px] md:h-[280px] object-cover"
                />
            </div>

            {/* Image 3 */}
            <div className="rounded-xl overflow-hidden shadow-md">
                <Image
                    src={img3}
                    alt="gallery-3"
                    width={1000}
                    height={1000}
                    className="w-full h-[200px] md:h-[280px] object-cover"
                />
            </div>
        </motion.div>
    )
}

export default DetailsPageSideImageWrper;