import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallButton from "@/components/InstallButton";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnHub - Learning Platform",
  description: "Your gateway to mastering technology",
  manifest: "/manifest.json",
  themeColor: "oklch(62.7% 0.265 303.9)",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LearnHub",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
      <Header />
      <main className="min-h-[70vh]">
        {children}
      </main>
      <Footer />
      <InstallButton />
      </body>
    </html>
  );
}
