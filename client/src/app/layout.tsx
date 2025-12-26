import type { Metadata } from "next";
import Providers from "@/src/app/providers";  // import your provider here
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Suspense } from "react";
// Yeh thik hai
// Agar store bana hai toh neeche import kar lena, abhi nahi hai toh comment kar dena

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Vinayak LMS",
  description: "Scalable Learning Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   return (
    <ClerkProvider>
    <html lang="en">
      <body className={dmSans.className}>
        <Providers>
           <Suspense fallback={null}>
              <div className="root-layout">{children}</div>
            </Suspense>
            <Toaster richColors closeButton />
          
        </Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}