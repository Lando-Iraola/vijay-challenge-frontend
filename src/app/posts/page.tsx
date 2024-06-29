"use client";
import * as React from "react";
import { notFound, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Post from "@/app/Components/Post";
import { Link, Pagination, PaginationItem, Stack } from "@mui/material";
import { Padding } from "@mui/icons-material";

async function getPostData(currentPage?: number | string) {
  const queryString = currentPage !== "" ? `/?page=${currentPage}` : "";
  const postRequest = await fetch(
    `http://localhost:8000/api/posts${queryString}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (postRequest.status === 404) {
    return { error: "404" };
  }

  if (postRequest.status !== 200) {
    return { error: "unknown" };
  }
  const postData = await postRequest.json();
  console.log(postData);
  postData["pages"] = Math.round(postData.count / postData.results.length);
  return postData;
}

export default function Blog({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const [posts, setPosts] = React.useState(null);
  const currentPage = Number(searchParams?.page) || "";
  React.useEffect(() => {
    getPostData(currentPage).then((data) => setPosts(data));
  }, []);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    React.navigate("/page");
  };
  console.log("works?", posts?.error === 404);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Stack spacing={2}>
          {(posts && posts?.results?.length >= 1 && (
            <Grid container spacing={5}>
              {posts.results.map((post) => (
                <Grid item xs={6} key={post.id}>
                  <Post className="markdown">{post}</Post>
                </Grid>
              ))}
            </Grid>
          )) ||
            (posts?.error === "404" && notFound()) || <p>{":)"}</p>}
          {posts && posts?.results?.length >= 1 && (
            <Pagination
              count={posts.pages}
              page={1}
            >
              <PaginationItem component={Link} to={"/posts?page=1"}></PaginationItem>
            </Pagination>
          )}
        </Stack>
      </main>
    </React.Fragment>
  );
}
