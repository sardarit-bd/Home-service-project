import { Poppins } from "next/font/google";
import Header from "./componnent/Header";
import "./globals.css";

const geistSans = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "Custom team Card Designer",
  description: "Design your own custom cards with ease.",
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
