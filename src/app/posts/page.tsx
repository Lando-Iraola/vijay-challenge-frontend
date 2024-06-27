"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../Components/Header";
import MainFeaturedPost from "../Components/MainFeaturedPost";
import FeaturedPost from "../Components/FeaturedPost";
import Main from "../Components/Main";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import post1 from "./blog-post.1.md";
import post2 from "./blog-post.2.md";
import post3 from "./blog-post.3.md";

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

const myPosts = [
  {
    id: 3,
    title: "prueba postman",
    content: "a long or rather short test",
    author: "Lando",
    created_at: "2024-06-27T10:39:16.260020-04:00",
  },
  {
    id: 4,
    title: "prueba postman",
    content: "a long or rather short test",
    author: "Lando",
    created_at: "2024-06-27T10:39:45.325806-04:00",
  },
  {
    id: 5,
    title: "prueba postman",
    content: "a long or rather short test",
    author: "Lando",
    created_at: "2024-06-27T10:42:34.151728-04:00",
  },
  {
    id: 6,
    title: "prueba postman",
    content: "a long or rather short test",
    author: "Lando",
    created_at: "2024-06-27T10:43:05.803258-04:00",
  },
];

const sidebar = {
  title: "About",
  description: "SoloTodo?",
  archives: [],
  social: [
    {
      name: "GitHub",
      icon: GitHubIcon,
      href: "https://github.com/Lando-Iraola",
    },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog challenge" sections={sections} />
        <main>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Grid item>
            <Grid container spacing={5} sx={{ mt: 3 }}>
              <Main title="Vijay Challenging blog" posts={myPosts} />
            </Grid>
            </Grid>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
