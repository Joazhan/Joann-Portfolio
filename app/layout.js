import { Geist } from "next/font/google";
import "./globals.css";
import { Agentation } from "agentation";
import CustomCursor from "./components/CustomCursor";
import AnimatedFooter from "./components/AnimatedFooter";
import Navbar from "./components/Navbar";
const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Joann Zhang",
  description: "Product Designer Portfolio",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ overflowX: 'hidden', maxWidth: '100%' }}>
      <body className={geist.className} style={{ overflowX: 'hidden', maxWidth: '100%' }} suppressHydrationWarning>
        <CustomCursor />
        <Navbar />
        {children}
        <AnimatedFooter />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}