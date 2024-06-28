import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Post from "./Post.tsx";
import { Container } from "@mui/material";

interface PostsInterface {
  id: Number;
  title: String;
  content: String;
  author: String;
  created_at: Date;
}

interface MainProps {
  posts: ReadonlyArray<PostsInterface>;
  title: string;
}

export default function Main(props: MainProps) {
  const { posts, title } = props;
  
  return (
    <>
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom key={123}>
          {title}
        </Typography>
      </Grid>
      {posts.map((post) => (
        <Grid item xs={12} md={8} key={post}>
          <Post className="markdown">
            {post}
          </Post>
        </Grid>
      ))}
    </>
  );
}
