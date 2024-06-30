"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@mui/material";

export default function Blog() {
  const router = useRouter();
  React.useEffect(() => {
    sessionStorage.removeItem("jwt");
    router.push("/");
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <main><Typography>Cerrando sesion</Typography></main>
    </React.Fragment>
  );
}
