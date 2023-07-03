import {
  Typography,
  ThemeProvider,
  CssBaseline,
  Box,
  IconButton,
  SxProps,
} from "@mui/material";
import ContainerTemplate from "../atoms/Container";
import React from "react";
import CustomTheme from "../../theme";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Navbar = ({
  _setTheme,
  getTheme,
  sx,
}: {
  _setTheme: any;
  getTheme: any;
  sx?: SxProps;
}) => {
  const setTheme = CustomTheme(_setTheme);

  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const handleSwitchChange = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    getTheme(mode);
    localStorage.setItem("selectedTheme", mode);
  };

  return (
    <>
      <ThemeProvider theme={setTheme}>
        <CssBaseline />
        <ContainerTemplate
          sx={{
            margin: 0,
            px: { md: "10vw", sm: "10vw", xs: "5vw" },
            py: 2,
            ...sx,
            // mb: "5%",
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                color: "text.primary",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: 1,
                "& span": {
                  color: "white",
                  fontFamily: "monospace",
                  borderRadius: "5px",
                  paddingLeft: "5px",
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                },
              }}>
              Task
              <span>Hub</span>
            </Typography>
            <IconButton>
              {mode === "light" ? (
                <Brightness4Icon onClick={handleSwitchChange} />
              ) : (
                <Brightness7Icon onClick={handleSwitchChange} />
              )}
            </IconButton>
          </Box>
        </ContainerTemplate>
      </ThemeProvider>
    </>
  );
};

export default Navbar;
