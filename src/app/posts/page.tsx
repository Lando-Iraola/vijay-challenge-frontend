import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import Main from "@/app/Components/Main";
import Sidebar from "@/app/Components/Sidebar";
import { Box } from "@mui/material";

async function getPostData() {
  const postRequest = await fetch(`http://localhost:8000/api/posts`, {
    next: { revalidate: 60 },
  });
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

export default async function Blog() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{padding: "1rem 0 1rem 0"}}>
        <main>
          <Grid container spacing={5} key={"the-main-container"}>
            <Grid item key={"the-main-items"}>
              <Grid container spacing={5} sx={{ mt: 3 }}>
                <Main
                  title="Vijay Challenging blog"
                  posts={await getPostData()}
                />
              </Grid>
            </Grid>
          </Grid>
        </main>
      </Box>
    </React.Fragment>
  );
}
