import type { Metadata } from "next";
import { Manrope} from "next/font/google";
import "./globals.css";

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentalCar",
  description: "Easy way to rent a car"
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manropeSans.variable}`}>
      <body>
        <header></header>
        <main>{children}</main>
      </body>
    </html>
  );
}
