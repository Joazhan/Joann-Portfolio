import { Geist } from "next/font/google";
import "./globals.css";
import { Agentation } from "agentation";
import CustomCursor from "./components/CustomCursor";
import AnimatedFooter from "./components/AnimatedFooter";
import Navbar from "./components/Navbar";
import ChatWidget from "./components/ChatWidget";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "Joann Zhang",
  description: "Product Designer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <CustomCursor />
        <Navbar />
        {children}
        <AnimatedFooter />
        <ChatWidget />
{process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}