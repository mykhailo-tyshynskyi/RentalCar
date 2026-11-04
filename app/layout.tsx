import type { Metadata } from "next";
import { Manrope} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanstackProvider from "@/components/TanStackProvider/TanStackProvider";

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
        <Header/>
        <main>
          <TanstackProvider>
          {children}
          </TanstackProvider>
          </main>
      </body>
    </html>
  );
}
