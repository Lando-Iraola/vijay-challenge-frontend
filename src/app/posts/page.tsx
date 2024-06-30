import * as React from "react";
import { notFound, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Post from "@/app/Components/Post";
import {
  Link,
  Pagination,
  PaginationItem,
  Stack,
  Skeleton,
  Box,
} from "@mui/material";
import { Block } from "@mui/icons-material";
import PostList from "../Components/PostList";

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

export default async function Blog({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  // const [posts, setPosts] = React.useState(null);
  // const currentPage = Number(searchParams?.page) || "";
  // React.useEffect(() => {
  //   getPostData(currentPage).then((data) => setPosts(data));
  // }, []);

  // const handlePagination = (
  //   event: React.ChangeEvent<unknown>,
  //   value: number
  // ) => {
  //   React.navigate("/page");
  // };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
       <PostList searchParams={searchParams}></PostList>
      </main>
    </React.Fragment>
  );
}
