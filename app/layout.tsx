import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/Providers/modal-provider";
import { ToasterProvider } from "@/components/modals/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce with CMS",
  description: "Ecommerce with CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
