import { getCanonicalUrl } from "@/utils";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Easy SEll - Upload",
  description:
    "Upload your products easily using Easy Sell",
  // openGraph: {
  //   images: [`${getCanonicalUrl()}/assets/og-image.png`],
  // },
  alternates: {
    canonical: `/products/upload`,
  },
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default Layout;
