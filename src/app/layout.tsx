import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

// Load fonts using next/font
const geistSans = Geist({
  subsets: ["latin"],
  display: "swap", // recommended for better UX
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recipe Viewer",
  description: "A simple recipe viewer with favorites using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className} antialiased bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}
