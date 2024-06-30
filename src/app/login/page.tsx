"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Stack,
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
    const login = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData}),
    });

    if (login.status === 200) {
      
      const data = await login.json();
      console.log(data)

      sessionStorage.setItem("jwt", data.access);
      
      window.location.replace(`/posts`);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const router = useRouter();
  React.useEffect(() => {
    if(sessionStorage.getItem("jwt"))
      {
        router.push("/")      
      }
  }, [])
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Box px={10} justifyContent="center">
          <form onSubmit={handleSubmit}>
            <Stack direction="column" spacing={3} maxWidth={"30rem"} justifyContent="end">
              <FormControl>
                <InputLabel htmlFor="username">Usuario</InputLabel>
                <FilledInput
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="password">
                  Password
                </InputLabel>

                <FilledInput
                  id="password"
                  name="password"
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
