import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Scanline from "@/components/Scanline";
import data from "@/data/data.json";
import favicon from "@/data/assets/favicon.png";
import { isPreview, siteUrl } from "@/lib/site";


const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${data.name} | ${data.role}`,
    template: `%s | ${data.name}`,
  },
  description: data.description,
  applicationName: `${data.name} Portfolio`,
  authors: [{ name: data.name, url: '/' }],
  creator: data.name,
  category: 'technology',
  alternates: { canonical: '/' },
  icons: {
    icon: favicon.src,
    apple: favicon.src,
  },
  openGraph: {
    type: 'profile',
    url: '/',
    title: `${data.name} | ${data.role}`,
    description: data.description,
    siteName: `${data.name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.name} | ${data.role}`,
    description: data.description,
  },
  robots: {
    index: !isPreview,
    follow: !isPreview,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>
        <Scanline />

        {children}
        <Analytics />
      </body>
    </html>
  );
}
