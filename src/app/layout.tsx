import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import UserProvider from "./context/UserContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Key Vault",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased lg:ml-2`}
            >
                <UserProvider>
                    <Providers>{children}</Providers>
                </UserProvider>
            </body>
        </html>
    );
}
