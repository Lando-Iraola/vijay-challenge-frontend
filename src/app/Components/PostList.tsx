"use client";
import * as React from "react";
import { Pagination, Stack, Box, Grid } from "@mui/material";
import Post from "./Post";
import EmptyPostList from "./EmptyPostList";
import { useRouter, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import PostListSkeleton from "./PostListSkeleton";

interface PostItem {
  id: number;
  author: string;
  title: string;
  content: string;
  created_at: Date;
}

interface PostData {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: ReadonlyArray<PostItem>;
  pages?: number | null;
  error?: string | null;
}

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

  const postData: PostData = await postRequest.json();

  const knownItemsPerPage: number = 6;
  postData.pages = Math.ceil(postData.count! / knownItemsPerPage);

  return postData;
}

export default function PostList({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const [posts, setPosts] = React.useState<PostData>();
  const [page, setPage] = React.useState<number>(
    Number(searchParams?.page) || 1
  );
  const router = useRouter();
  const sP = useSearchParams();

  React.useEffect(() => {
    router.push(`/posts?page=${page}`);
  }, [page]);

  React.useEffect(() => {
    const currentPage: number = Number(sP.get("page")) || 1;
    setPage(currentPage);
    getPostData(currentPage).then((data) => setPosts(data));
  }, [sP]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (!posts) {
    return <PostListSkeleton></PostListSkeleton>;
  }

  if (posts && posts.results!.length === 0) {
    return <EmptyPostList />;
  }

  if (posts && posts.error && posts.error === "404") {
    return notFound();
  }

  return (
    <Stack spacing={2}>
      <Grid container spacing={2} padding={0} margin={0}>
        {posts.results!.map((post) => (
          <Grid item xs={6} key={post.id}>
            <Post>{post}</Post>
          </Grid>
        ))}
      </Grid>
      <Box>
        {posts && posts.results && posts.results.length >= 1 && (
          <Pagination
            count={posts.pages!}
            page={page}
            onChange={handleChange}
          ></Pagination>
        )}
      </Box>
    </Stack>
  );
}
