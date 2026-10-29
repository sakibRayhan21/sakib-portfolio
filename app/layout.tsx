import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sakib Rayhan | Full-Stack Developer Portfolio",
  description: "Personal portfolio and project showcase of Sakib Rayhan — Full-Stack Developer, Competitive Programmer & CSE Student.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-blue-600 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
