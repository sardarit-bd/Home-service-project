import { motion } from "framer-motion";
import Image from "next/image";

const DetailsPageSideImageWrper = ({ serviceImageUrls }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="self-start sticky top-[100px] space-y-4"
        >

            {
                serviceImageUrls?.map((url, index) => {
                    return (
                        <div key={index} className="rounded-xl overflow-hidden shadow-md">
                            <Image
                                src={url}
                                alt="gallery-1"
                                width={1000}
                                height={1000}
                                className="w-full h-[200px] md:h-[280px] object-cover overflow-hidden"
                            />
                        </div>
                    )
                })
            }

        </motion.div>
    )
}

export default DetailsPageSideImageWrper;