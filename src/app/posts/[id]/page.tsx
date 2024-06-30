import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@mui/material";
import { notFound } from "next/navigation";

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
      <>
        <CssBaseline />
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
      </>
    );
  } catch (Exception) {
    return notFound();
  }
}
