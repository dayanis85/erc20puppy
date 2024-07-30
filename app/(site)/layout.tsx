"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
import { Web3Provider } from "../../components/connect-button/connectKit.config";
const inter = Inter({ subsets: ["latin"] });

import ToasterContext from "../context/ToastContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Web3Provider>
      <html lang="en" suppressHydrationWarning>
        <body className={`dark:bg-black ${inter.className}`}>
          <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="dark"
          >
            <Lines />
            <Header />
            <ToasterContext />
            {children} 
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </body>
      </html>
    </Web3Provider>
  );
}
