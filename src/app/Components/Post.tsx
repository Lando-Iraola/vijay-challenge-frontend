import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

export default function Post(props: any) {
  const { id, title, author, created_at } = props.children;
  const href = `/posts/${id}`;
  return (
    <CardActionArea component="a" href={href}>
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {author} {new Date(created_at).toLocaleString()}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Ver más
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
