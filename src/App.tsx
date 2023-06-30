import React from "react";
import { Typography, Box, ThemeProvider } from "@mui/material";
import ContainerTemplate from "./components/atoms/template/container";
import Navbar from "./components/organisms/Navbar";
import ButtonTemplate from "./components/atoms/template/Button";
import CustomTheme from "./theme";

function App() {
  const storedTheme = localStorage.getItem("selectedTheme");
  const initialMode: "light" | "dark" =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : "light";
  const [mode, setMode] = React.useState<"light" | "dark">(initialMode);

  const theme = CustomTheme(mode);

  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  return (
    <ThemeProvider theme={theme}>
      <>
        <Navbar
          _setTheme={mode}
          getTheme={(e: any) => setMode(e)}
          sx={{ mb: "10%" }}
        />

        <ContainerTemplate>
          <Box
            sx={{
              position: "relative",
              display: { md: "block", sm: "block", xs: "none" },
            }}>
            <Box
              sx={{
                width: { md: 130, sm: 120, xs: 70 },
                height: { md: 130, sm: 120, xs: 70 },
                borderRadius: "50%",
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                position: "absolute",
                top: 250,
                right: 100,
              }}
            />
          </Box>
          <Box
            sx={{
              position: "relative",
              display: { md: "block", sm: "block", xs: "none" },
            }}>
            <Box
              sx={{
                width: { md: 50, sm: 40, xs: 30 },
                height: { md: 50, sm: 40, xs: 30 },
                borderRadius: "50%",
                background: "linear-gradient(45deg, #07070a 30%, #424242 90%)",
                position: "absolute",
                top: 20,
                right: 0,
                bottom: 0,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}>
            <Typography variant="h4" fontWeight="bold">
              Tsks, just tasks.
            </Typography>
            <Typography variant="body1" sx={{ width: "300px", mt: "1%" }}>
              Keep track of the daily task in life and get that satisfaction
              upon completion.
            </Typography>
            <ButtonTemplate
              title="Get Started"
              sx={{
                color: "white",
                background: `linear-gradient(45deg, ${primaryColor} 30%, ${secondaryColor} 90%)`,
              }}
            />

            <Box
              sx={{
                display: { md: "none", sm: "none", xs: "block" },
                "& img": {
                  margin: "10% 30% 0 0",
                  width: "60%",
                  height: "60%",
                },
              }}>
              <img src="/home-1.png" alt="home-1" />
            </Box>
          </Box>
          <Box
            sx={{
              position: "relative",
              display: { md: "block", sm: "block", xs: "none" },
            }}>
            <Box
              sx={{
                width: { md: 100, sm: 70, xs: 50 },
                height: { md: 100, sm: 70, xs: 50 },
                borderRadius: "50%",
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                position: "absolute",
                top: -150,
                left: 0,
              }}
            />
          </Box>
        </ContainerTemplate>
      </>
    </ThemeProvider>
  );
}

export default App;
