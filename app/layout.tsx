import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC" crossOrigin="anonymous" />
        <body className={`${inter.variable} ${playfair_display.variable} ${dosis.variable} ${nunito_sans.variable} bg-background`}>
          {children}
        </body>
      </body>
    </html>
  );
}
