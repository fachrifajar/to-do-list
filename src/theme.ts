import { createTheme, Theme } from "@mui/material/styles";
import { TypeText } from "@mui/material";

interface CustomTypeText extends TypeText {
  contrastText: string;
}

const CustomTheme = (mode: "light" | "dark"): Theme =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        // main: mode === "light" ? "#FE6B8B" : "#424242",
        main: mode === "light" ? "#FE6B8B" : "#FE6B8B",
      },
      secondary: {
        // main: mode === "light" ? "#FF8E53" : "#616161",
        main: mode === "light" ? "#FF8E53" : "#FF8E53",
      },
      text: {
        primary: mode === "light" ? "#232f34" : "#fafafa",
        secondary: mode === "light" ? "#27272a" : "#e4e4e7",
        contrastText: mode === "light" ? "#fafafa" : "#fafafa",
      } as CustomTypeText,
      background: {
        default: mode === "light" ? "#f1f5f9" : "#212121",
        paper: mode === "light" ? "#fafafa" : "#424242",
      },
    },
  });

export default CustomTheme;
