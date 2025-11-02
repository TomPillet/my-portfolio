import type { Metadata } from "next";
import { Ubuntu, DM_Sans } from "next/font/google";
import { Provider } from "@/chakra/provider";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

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
  title: "Tom Pillet-Gaulon - Développeur web à Besançon",
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
      <head>
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      </head>
      <body className={`${ubuntu.className} ${dmSans.className} antialiased`}>
        <Provider>
          <Header />
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  );
}
