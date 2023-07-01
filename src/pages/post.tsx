import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { lighten } from "polished";
import { ThemeProvider, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Navbar from "../components/organisms/Navbar";
import ButtonTemplate from "../components/atoms/template/Button";
import ContainerTemplate from "../components/atoms/template/Container";
import CardPost from "../components/molecules/Card-post";
import CustomTheme from "../theme";

const Post = () => {
  interface ListItem {
    id: number;
    title: string;
    created_at: string;
  }

  const navigate = useNavigate();
  const storedTheme = localStorage.getItem("selectedTheme");
  const initialMode: "light" | "dark" =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : "light";
  const [mode, setMode] = React.useState<"light" | "dark">(initialMode);

  const theme = CustomTheme(mode);
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const [list, setList] = React.useState<ListItem[]>([]);

  const handleGetList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/activity-groups?email=${
          import.meta.env.VITE_EMAIL
        }`
      );

      setList(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteList = async (getId: number) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/activity-groups/:id?id=${getId}`
      );
      console.log(response);

      handleGetList();
      // setIsModalOpen(false);

      // setisModalInformationOpen(true);
    } catch (error) {
      console.log("ERROR deleteActivityGroupList", error);
    }
  };

  React.useEffect(() => {
    handleGetList();
  }, []);

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
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              mb: "10%",
            }}>
            <Typography variant="h4" fontWeight="bold" component="div">
              Collections
            </Typography>
            <ButtonTemplate
              title="ADD TASK"
              endIcon={<AddIcon />}
              sx={{
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

          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {list?.map((item, key) => {
              const createdTime = new Date(item?.created_at);
              const formattedDate = createdTime.toLocaleString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              });

              return (
                <CardPost
                  key={key}
                  title={item?.title}
                  date={formattedDate}
                  onClick={(event) => {
                    event.stopPropagation();
                    console.log("xxx");
                  }}
                />
              );
            })}
          </Box>
        </ContainerTemplate>
      </ThemeProvider>
    </>
  );
};

export default Post;
