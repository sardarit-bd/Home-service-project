import { Poppins } from "next/font/google";
import Header from "./componnent/Header";
import "./globals.css";

const geistSans = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "Home Service Provider",
  description: "Compare trusted local professionals for plumbing, electrical, remodeling, cleaning, landscaping, and more — all reviewed by real Chicago homeowners.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <Header />
        <div className="pt-[75px] bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
}
