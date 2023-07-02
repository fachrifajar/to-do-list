import React from "react";
import { useNavigate } from "react-router-dom";
import { lighten } from "polished";
import axios from "axios";
import { useSelector } from "react-redux";
import { ThemeProvider, Box } from "@mui/material";
import { debounce } from "lodash";

import CustomTheme from "../theme";
import Navbar from "../components/organisms/Navbar";
import ContainerTemplate from "../components/atoms/template/Container";
import ButtonTemplate from "../components/atoms/template/Button";
import TextFieldTemplate from "../components/atoms/template/TextField";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ImportExportIcon from "@mui/icons-material/ImportExport";

const Detail = () => {
  const navigate = useNavigate();

  const storedTheme = localStorage.getItem("selectedTheme");
  const initialMode: "light" | "dark" =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : "light";
  const [mode, setMode] = React.useState<"light" | "dark">(initialMode);

  const theme = CustomTheme(mode);
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const reduxList = useSelector(
    (state: { list: { data: any } }) => state.list.data
  );

  const [title, setTitle] = React.useState({
    value: "",
    isErr: false,
    errMsg: "",
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length < 5) {
      setTitle((prevValue) => ({
        ...prevValue,
        value: "",
        isErr: true,
        errMsg: "Title can't be lower than 5 characters",
      }));
    } else {
      setTitle((prevValue) => ({
        ...prevValue,
        value: inputValue,
        isErr: false,
        errMsg: "",
      }));

      debouncedFetchChangeTitle(inputValue);
    }
  };

  const fetchChangeTitle = async (titleValue: string) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/activity-groups/${reduxList?.id}`,
        {
          title: titleValue,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedFetchChangeTitle = React.useRef(
    debounce(fetchChangeTitle, 2000)
  ).current;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar
          _setTheme={mode}
          getTheme={(e: any) => setMode(e)}
          sx={{ mb: "5%" }}
        />
        <ContainerTemplate
          sx={{
            margin: {
              md: "0 17vw 10vh 17vw",
              sm: "0 10vw 10vh 10vw",
              xs: "0 5vw 10vh 5vw",
            },
          }}>
          <Box display="flex" alignItems="center" justifyContent="space-around">
            <Box display="flex" alignItems="center">
              <ChevronLeftIcon
                onClick={() => navigate("/post")}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: `${secondaryColor}`,
                  },
                  fontSize: { md: "50px", sm: "50px", xs: "40px" },
                  mr: { md: 3, sm: 3, xs: 1 },
                }}
              />
              <TextFieldTemplate
                onChange={handleChangeTitle}
                error={title?.isErr}
                helperText={title?.errMsg}
                defaultValue={reduxList?.title}
                margin="none"
                variant="standard"
                InputProps={{
                  inputProps: {
                    maxLength: 20,
                  },
                  sx: {
                    fontSize: { md: "32px", sm: "32px", xs: "22px" },
                    fontWeight: "bold",
                  },
                }}
                sx={{
                  "& .MuiInput-underline": {
                    "&:before, &:after": {
                      borderBottom: "none",
                    },
                  },
                  "& .MuiInput-underline:hover:before, & .MuiInput-underline:hover:after":
                    {
                      border: "none",
                    },
                }}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <ImportExportIcon
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: `${secondaryColor}`,
                  },
                  fontSize: { md: "40px", sm: "40px", xs: "30px" },
                  mr: { md: 3, sm: 3, xs: 1 },
                }}
              />
              <ButtonTemplate
                title="ADD"
                sx={{
                  marginTop: "0px",
                  width: "150px",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  background: `linear-gradient(45deg, ${primaryColor} 30%, ${secondaryColor} 90%)`,
                  "&:hover": {
                    background: `linear-gradient(45deg, ${lighten(
                      0.1,
                      primaryColor
                    )} 30%, ${lighten(0.1, secondaryColor)} 90%)`,
                  },
                }}
              />
            </Box>
          </Box>
        </ContainerTemplate>
      </ThemeProvider>
    </>
  );
};

export default Detail;
