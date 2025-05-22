import type { Metadata } from "next";
import { Ubuntu, DM_Sans } from "next/font/google";
import { Provider } from "@/chakra/provider";
import "./globals.css";
import Header from "@/components/layout/Header";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tom Pillet-Gaulon",
  description:
    "Bienvenue sur mon portfolio ! Je suis Tom Pillet-Gaulon, développeur web fullstack et ingénieur informatique à Besançon, en France.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ubuntu.className} ${dmSans.className} antialiased`}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
