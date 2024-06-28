import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Container } from "@mui/material";

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
      <Container maxWidth="lg"><Header title="Blog challenge" sections={sections} /></Container>
        <Container maxWidth="lg">{children}</Container>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </body>
    </html>
  );
}
