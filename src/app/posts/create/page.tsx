import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { TextareaAutosize, TextField, Typography } from "@mui/material";

export default async function Create() {
  return (
    <>
      <CssBaseline />

      <main>
        <TextField fullWidth label="Titulo" variant="standard"></TextField>
        <TextareaAutosize></TextareaAutosize>
      </main>
    </>
  );
}
