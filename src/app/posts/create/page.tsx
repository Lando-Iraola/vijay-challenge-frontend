"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
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
      body: JSON.stringify({...formData, author: "Lando"}),
    });

    if(create.status === 201)
    {
      const data = await create.json();
      window.location.replace(`/posts/${data.id}`)
    }
  };

  return (
    <>
      <CssBaseline />

      <main>
        <form onSubmit={handleSubmit}>
          <FormControl>
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
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </FormControl>
        </form>
      </main>
    </>
  );
}
