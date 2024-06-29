"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { title } from "process";

export default function Create() {
  const [formData, setFormData] = React.useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const create = await fetch("http://localhost:8000/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, author: "Lando" }),
    });

    if (create.status === 201) {
      const data = await create.json();
      window.location.replace(`/posts/${data.id}`);
    }
  };

  return (
    <>
      <CssBaseline />

      <main>
        <Box px={5}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth px={150}>
              <Stack direction="column" spacing={3}>
                <TextField
                  id="title"
                  name="title"
                  label="Titulo"
                  variant="standard"
                  required
                  onChange={handleChange}
                />
                <FormLabel htmlFor="content" required>
                  Contenido
                </FormLabel>

                <TextareaAutosize
                  id="content"
                  name="content"
                  onChange={handleChange}
                  maxLength={200}
                  minRows={5}
                />

                <Box justifyContent="end">
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
              </Stack>
            </FormControl>
          </form>
        </Box>
      </main>
    </>
  );
}
