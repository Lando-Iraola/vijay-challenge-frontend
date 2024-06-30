"use client";
import * as React from "react";
import { useRouter } from "next/router";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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

export default function Blog() {
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
      body: JSON.stringify({ ...formData, author: 1 }),
    });

    if (create.status === 201) {
      const data = await create.json();
      window.location.replace(`/posts/${data.id}`);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Box px={10} justifyContent="center">
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={3} maxWidth={"30rem"} justifyContent="end">
              <FormControl>
                <InputLabel htmlFor="user">Usuario</InputLabel>
                <FilledInput
                  id="user"
                  name="user"
                  type="text"
                  required
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel>

                <FilledInput
                  id="filled-adornment-password"
                  required
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl>
                <Box justifyContent="end">
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
              </FormControl>
            </Stack>
          </form>
        </Box>
      </main>
    </React.Fragment>
  );
}
