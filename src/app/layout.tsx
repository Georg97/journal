import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { I18nProvider } from "~/components/I18nProvider";
import { BetaBanner } from "~/components/BetaBanner";

export const metadata: Metadata = {
  title: "Winter Arc Journal",
  description: "Create your own printable journal pages in A5 format",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <BetaBanner />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
