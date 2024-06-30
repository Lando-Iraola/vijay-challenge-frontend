"use client";
import * as React from "react";
import {
  Link,
  Pagination,
  PaginationItem,
  Stack,
  Skeleton,
  Box,
  Grid,
  Typography,
} from "@mui/material";

export default function EmptyPostList() {
  return (
    <Box>
      <Typography variant="h5">Blog vacio</Typography>
      <Typography variant="body1">
        Favor <Link href="/posts/create">crear</Link> una nueva entrada
      </Typography>
    </Box>
  );
}
