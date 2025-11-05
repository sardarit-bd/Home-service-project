import Link from "next/link";
import { FaFacebookF, FaInstagram, FaPhone, FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="bg-white border-0 border-t border-gray-200 h-fit z-20 relative w-scrren">

            <div className="w-full flex items-center justify-center">
                <div className="w-full max-w-7xl px-2 md:px-7 grid grid-cols-4 items-start justify-center gap-5 my-10 z-20">
                    <div className="w-full col-span-4 md:col-span-2 lg:col-span-1">
                        <h3 className="font-bold text-2xl text-gray-600">About</h3>
                        <p className="text-gray-500 text-md pt-5">
                            We’re on a mission to simplify how Chicago homeowners find trusted, qualified professionals for every home service — from plumbing to painting, and everything in between.
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <Link className="z-30" href={'/'}>
                                <FaFacebookF className="text-2xl text-sky-500" />
                            </Link>
                            <Link className="z-30" href={'/'}>
                                <FaInstagram className="text-2xl text-sky-500" />
                            </Link>
                            <Link className="z-30" href={'/'}>
                                <FaTwitter className="text-2xl text-sky-500" />
                            </Link>
                        </div>
                    </div>
                    <div className="w-full col-span-4 md:col-span-2 lg:col-span-1 mt-5 md:mt-0">
                        <h3 className="font-bold text-2xl text-gray-600">Quick Links</h3>
                        <div className="mt-5">
                            <ul className="flex flex-col gap-3">
                                <Link href={'/about'} className="text-gray-500 text-md z-30">About</Link>
                                <Link href={'/services'} className="text-gray-500 text-md z-30">Service</Link>
                                <Link href={'/contact'} className="text-gray-500 text-md z-30">Contact Us</Link>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full col-span-4 md:col-span-2 lg:col-span-1 mt-5 lg:mt-0">
                        <h3 className="font-bold text-2xl text-gray-600">Category</h3>
                        <div className="mt-5">
                            <ul className="flex flex-col gap-3">
                                <Link href={'/services/handyman/carpentry'} className="text-gray-500 text-md z-30">Carpentry</Link>
                                <Link href={'/services/handyman/electrical'} className="text-gray-500 text-md z-30">Electrical</Link>
                                <Link href={'/services/handyman/plumbing'} className="text-gray-500 text-md z-30">Plumbing</Link>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full col-span-4 md:col-span-2 lg:col-span-1 mt-5 lg:mt-0">
                        <h3 className="font-bold text-2xl text-gray-600">Get In Touch</h3>
                        <div className="mt-5">
                            <ul className="flex flex-col gap-3">
                                <Link href={'/about'} className="text-gray-500 text-md z-30 flex gap-2">
                                    <FaLocationDot className="text-sky-500" />
                                    <span>123 Main Street New York, NY 10001</span>
                                </Link>
                                <Link href={'/about'} className="text-gray-500 text-md z-30 flex gap-2">
                                    <MdEmail className="text-sky-500" />
                                    <span>contact@homeservice.com</span>
                                </Link>
                                <Link href={'/about'} className="text-gray-500 text-md z-30 flex gap-2">
                                    <FaPhone className='text-sky-500' />
                                    <span>123-456-7890</span>
                                </Link>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-sky-500 text-lg text-center text-white py-2 z-20">
                © 2025 Home Service. All Rights Reserved ||  Developed by<Link className="cursor-pointer text-red-300 z-20" target="blank" href={'https://sardaritbd.com'}> Sardar IT</Link>
            </div>
        </footer>
    )
}

export default Footer;