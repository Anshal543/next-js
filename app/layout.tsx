import type { Metadata } from "next";
import localFont from "next/font/local";
import {Nunito, Josefin_Sans} from 'next/font/google'
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getCanonicalUrl } from "@/utils";

const nunitoDEfaultFont = Nunito({subsets:['latin']})
const cuteFont = Josefin_Sans({subsets:['latin']})

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Easy SEll",
  description:
    "Discover the power of simplicity with Easy Sell – the ultimate solution for effortless selling products. Unlock convenience and boost your sales.",
    openGraph: {
      images: [`${getCanonicalUrl()}/assets/og-image.png`],
    },
    alternates:{
      canonical: getCanonicalUrl(),
    }
    
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={nunitoDEfaultFont.className}
      >
        <Header font={cuteFont.className} />
        <div className="bg-gray-951 py-12">{children}</div>
        <Footer font={cuteFont.className} />
      </body>
    </html>
  );
}
