import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Container, Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

const sections = [
  { title: "Posts", url: "/posts" },
  { title: "New post", url: "/posts/create" },
];

export const metadata: Metadata = {
  title: "Vijay Challenging blog",
  description: "Next.js MUI as per request",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        
          <Header title="Blog challenge" sections={sections} />
        
        
          <Box py={1} m='auto' maxWidth={1200}>{children}</Box>
        
        <Footer
          title="Challenging Blog"
          description="Backend in Django rest framework. Frontend in Next.js and MUI"
        />
      </body>
    </html>
  );
}
