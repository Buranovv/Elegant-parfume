import { Inter, Poppins, Space_Grotesk } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-space_grotesk",
});
export const poppins = Poppins({
  weight: ["500"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
export const inter = Inter({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-inter",
});
