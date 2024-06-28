import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Container } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
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
        <Container maxWidth="lg">{children}</Container>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </body>
    </html>
  );
}
