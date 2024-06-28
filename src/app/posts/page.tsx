import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import Main from "@/app/Components/Main";
import Sidebar from "@/app/Components/Sidebar";
import Post from "@/app/Components/Post";
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
  const posts = await getPostData();
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ padding: "1rem 0 1rem 0" }}>
        <main>
          <Grid container spacing={5}>
            {posts.map((post) => (
                <Grid item xs={12} md={8} key={post}>
                  <Post className="markdown">{post}</Post>
                </Grid>
              ))}
          </Grid>
        </main>
      </Box>
    </React.Fragment>
  );
}
