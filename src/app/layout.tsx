import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Regentia Health & Research | Advancing Medical Science",
    template: "%s | Regentia Health & Research"
  },
  description: "REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED is a premier healthcare research organization established in 2024. We are dedicated to advancing evidence-based medicine, innovative clinical research, and collaborative scientific investigations.",
  keywords: ["Healthcare Research", "Medical Research", "Clinical Investigation", "Evidence-Based Medicine", "Scientific Collaboration", "Regentia Health", "Regentia Research"],
  authors: [{ name: "Regentia Health and Research Private Limited" }],
  metadataBase: new URL("https://regentiahealth.com"),
  openGraph: {
    title: "Regentia Health & Research | Advancing Medical Science",
    description: "Advancing evidence-based healthcare through clinical investigation, research methodology, and medical innovation. Established 2024.",
    url: "https://regentiahealth.com",
    siteName: "Regentia Health and Research",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regentia Health & Research | Advancing Medical Science",
    description: "Advancing evidence-based healthcare through clinical investigation, research methodology, and medical innovation.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans selection:bg-regentia-light selection:text-regentia-navy">
        <CartProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

