import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata: Metadata = {
    title: "Micspov - Photography Portfolio",
    description: "A photography portfolio showcasing my work",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Navigation />
                {children}
            </body>
        </html>
    );
}
