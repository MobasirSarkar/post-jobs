import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/_shared/nav-bar";
import Footer from "@/components/_shared/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Post Jobs", template: "%s | Post Jobs" },
  description: "Find Your Dreams Jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px]`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
