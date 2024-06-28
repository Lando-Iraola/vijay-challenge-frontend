import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../Components/Header";
import Main from "../Components/Main";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

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

async function getPostData()
{
  const postRequest = await fetch(`http://localhost:8000/api/posts`, {next:{revalidate: 60}});
  const postData = await postRequest.json();
  return postData;
}


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
// const defaultTheme = createTheme();

export default async function Blog() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog challenge" sections={sections} />
        <main>
          <Grid container spacing={5} sx={{ mt: 3 }} key={"the-main-container"}>
            <Grid item key={"the-main-items"}>
              <Grid container spacing={5} sx={{ mt: 3 }} >
                <Main title="Vijay Challenging blog" posts={await getPostData()} />
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
    </React.Fragment>
  );
}
