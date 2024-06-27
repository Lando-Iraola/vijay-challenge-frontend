import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

interface Post {
  id: Number;
  title: String;
  content: String;
  author: String;
  created_at: Date;
}

export default function Post(props: Post) {
  const { id, title, content, author, created_at } = props.children;

  return (
    <CardActionArea component="a" href="#">
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {new Date(created_at).toLocaleString()}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Ver más
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
