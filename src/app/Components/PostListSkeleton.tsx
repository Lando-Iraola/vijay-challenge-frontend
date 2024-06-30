import * as React from "react";
import { Stack, Skeleton, Box, Grid } from "@mui/material";

export default function PostListSkeleton() {
  return (
    <Stack spacing={2}>
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
    </Stack>
  );
}
