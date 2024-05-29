import { Inter, Playfair_Display, Dosis, Nunito_Sans } from "next/font/google";
import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-playfair'
});
const dosis = Dosis({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-dosis'
});
const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-nunito'
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair_display.variable} ${dosis.variable} ${nunito_sans.variable} bg-background w-screen h-screen font-nunito`}>{children}</body>
    </html>
  );
}
