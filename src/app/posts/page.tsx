import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import PostList from "../Components/PostList";

export default async function Blog({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
       <PostList searchParams={searchParams}></PostList>
      </main>
    </React.Fragment>
  );
}
