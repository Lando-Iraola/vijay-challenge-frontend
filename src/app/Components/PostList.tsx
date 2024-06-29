"use client";
import * as React from "react";
import {
  Link,
  Pagination,
  PaginationItem,
  Stack,
  Skeleton,
  Box,
  Grid
} from "@mui/material";
import Post from "./Post";

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

  const knownItemsPerPage = 6;
  postData["pages"] = Math.ceil(postData.count / knownItemsPerPage);

  return postData;
}

export default function PostList({
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
  return (
    <Stack spacing={2}>
      {(posts && posts?.results?.length >= 1 && (
        <>
          <Grid container spacing={2} padding={0} margin={0}>
            {posts.results.map((post) => (
              <Grid item xs={6} key={post.id}>
                <Post>{post}</Post>
              </Grid>
            ))}
          </Grid>
          <Box>
            {posts && posts?.results?.length >= 1 && (
              <Pagination count={posts.pages} page={1}></Pagination>
            )}
          </Box>
        </>
      )) ||
        (posts?.error === "404" && notFound()) || (
          <>
            <Grid container spacing={2} padding={0} margin={0}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <Grid item xs={6} key={num}>
                  <Skeleton variant="rectangular" height={120} />{" "}
                </Grid>
              ))}
            </Grid>
            <Box px={2} mx={0}>
              <Stack direction="row" spacing={2} p={0} padding={0} margin={0}>
                <Skeleton variant="circular" width={20} />
                <Skeleton variant="rectangular" width={60} />
                <Skeleton variant="circular" width={20} />
              </Stack>
            </Box>
          </>
        )}
    </Stack>
  );
}
