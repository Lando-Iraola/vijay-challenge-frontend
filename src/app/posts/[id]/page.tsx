import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "@/app/Components/Header";
import Footer from "@/app/Components/Footer";
import { Block } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { notFound } from "next/navigation";

// TODO remove, this demo shouldn't need to reset the theme.
interface PostsInterface {
  id: Number;
  title: String;
  content: String;
  author: String;
  created_at: Date;
}

export default async function PostById({ params }: { params: { id: string } }) {
  try {
    const postDetails = await fetch(
      `http://localhost:8000/api/posts/${params.id}`
    );

    const postDetailData = await postDetails.json();

    if (postDetails.status === 404) {
      throw "Not found";
    }

    return (
      <main>
        <Typography component="h2" variant="h5">
          {postDetailData.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {postDetailData.author}{" "}
          {new Date(postDetailData.created_at).toLocaleString()}
        </Typography>
        <Typography>{postDetailData.content}</Typography>
      </main>
    );
  } catch (Exception) {
    return notFound();
  }
}
