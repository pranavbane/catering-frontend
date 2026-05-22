import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CaterQuest – Find Your Perfect Caterer",
  description: "Discover top catering services for your events. Search by name, cuisine, and budget.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen relative">
        {children}
      </body>
    </html>
  );
}
