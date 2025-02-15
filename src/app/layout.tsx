import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const JejuMyeongjo = localFont({
  src: [{ path: "./JejuMyeongjo-Regular.ttf" }],
  variable: "--font-jeju",
});

export const metadata: Metadata = {
  title: 'Techember Fest "2',
  description: "HNG STAGE 2 TASK",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${JejuMyeongjo.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
