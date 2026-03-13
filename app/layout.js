import { Geist } from "next/font/google";
import "./globals.css";
import { Agentation } from "agentation";

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
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}