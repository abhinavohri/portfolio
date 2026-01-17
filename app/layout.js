import { JetBrains_Mono } from "next/font/google";
import "./globals.css";


const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Abhinav Ohri | Developer",
  description: "Full-stack developer portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>

        {children}
      </body>
    </html>
  );
}
