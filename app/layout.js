import "./globals.css";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const poppins = localFont({
  src: [
    {
      path: "../public/fonts/poppins/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/poppins/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/poppins/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/poppins/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "Kenya Film School",
  description: `Student's Portal for Kenya Film School`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
