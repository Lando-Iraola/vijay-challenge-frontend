"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Create() {
  const [formData, setFormData] = React.useState({
    title: "",
    content: "",
  });
  const [titleError, setTitleError] = React.useState<boolean>(false);
  const [titleErrorMessage, setTitleErrorMessage] =
    React.useState<boolean>(false);
  const [contentError, setContentError] = React.useState<boolean>(false);
  const [contentErrorMessage, setContentErrorMessage] =
    React.useState<string>("");
  const router = useRouter();

  React.useEffect(() => {
    if (!sessionStorage.getItem("jwt")) {
      router.push("/login");
    }
  }, []);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const create = await fetch("http://localhost:8000/api/posts/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    });

    if (create.status === 201) {
      const data = await create.json();
      router.push(`/posts/${data.id}`);
    }

    if (create.status === 400) {
      const data = await create.json();
      if (data.title) {
        setTitleError(true);
        setTitleErrorMessage(data.title);
      }
      if (data.content) {
        setContentError(true);
        setContentErrorMessage(data.content);
      }
    }
    if (create.status === 401) {
      sessionStorage.removeItem("jwt");
      router.push(`/login`);
    }
  };

  return (
    <>
      <CssBaseline />

      <main>
        <Box px={5}>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={3}>
              <FormControl error={titleError} fullWidth>
                <TextField
                  id="title"
                  name="title"
                  label="Titulo"
                  variant="standard"
                  required
                  onChange={handleChange}
                />
                {titleError && (
                  <FormHelperText>{titleErrorMessage}</FormHelperText>
                )}
              </FormControl>
              <FormLabel htmlFor="content" required>
                Contenido
              </FormLabel>
              <FormControl error={contentError} fullWidth>
                <TextareaAutosize
                  id="content"
                  name="content"
                  onChange={handleChange}
                  maxLength={200}
                  minRows={5}
                />
                {contentError && (
                  <FormHelperText>{contentErrorMessage}</FormHelperText>
                )}
              </FormControl>

              <Box justifyContent="end">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </main>
    </>
  );
}
