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
import ModalAddEdit from "../components/molecules/Modal-Add-Edit";
import CardDetail from "../components/molecules/Card-detail";



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
  const [modalAdd, setModalAdd] = React.useState({
    value: false,
    status: "",
    id: 0,
  });
  const [getTodoList, setGetTodoList] = React.useState([]);
  const [checkedIds, setCheckedIds] = React.useState<number[]>([]);
  const [unCheckedIds, setUncheckedIds] = React.useState<number[]>([]);
  const [getProps, setgetProps] = React.useState({
    title: "",
    priority: "",
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

  const fetchDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/todo-items?activity_group_id=${
          reduxList?.id
        }`
      );

      const getData = response?.data?.data;

      if (getData.length > 0) {
        setGetTodoList(getData);
        setCheckedIds(
          getData
            .filter((item: any) => item.is_active === 0)
            .map((item: any) => item.id)
        );
        setUncheckedIds(
          getData
            .filter((item: any) => item.is_active === 1)
            .map((item: any) => item.id)
        );
      } else {
        setGetTodoList([]);
      }
    } catch (error) {
      console.log("ERROR fetchDetail", error);
    }
  };

  const updateCheckedItems = async (
    checkedIds: number[],
    unCheckedIds: number[]
  ) => {
    try {
      const promises = [];

      for (let i = 0; i < checkedIds.length; i++) {
        promises.push(
          axios.patch(
            `${import.meta.env.VITE_BASE_URL}/todo-items/${checkedIds[i]}`,
            {
              is_active: 0,
            }
          )
        );
      }

      for (let i = 0; i < unCheckedIds.length; i++) {
        promises.push(
          axios.patch(
            `${import.meta.env.VITE_BASE_URL}/todo-items/${unCheckedIds[i]}`,
            {
              is_active: 1,
            }
          )
        );
      }

      await Promise.all(promises);
    } catch (error) {
      console.log("ERROR updateCheckedItems", error);
    }
  };

  const debouncedUpdateCheckedItems = React.useRef(
    debounce(updateCheckedItems, 2000)
  ).current;

  const handleAdd = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/todo-items/`, {
        activity_group_id: reduxList?.id,
        title: getProps?.title,
        priority: getProps?.priority ? getProps?.priority : "very-high",
      });
      fetchDetail();
    } catch (error) {
      console.log("ERROR handleAdd", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/todo-items/${modalAdd?.id}`,
        {
          title: getProps?.title,
          priority: getProps?.priority,
        }
      );
      fetchDetail();
    } catch (error) {
      console.log("ERROR handleAdd", error);
    }
  };

  React.useEffect(() => {
    fetchDetail();
  }, []);

  React.useEffect(() => {
    setUncheckedIds(
      getTodoList
        .filter((item: any) => !checkedIds.includes(item.id))
        .map((item: any) => item.id)
    );
  }, [checkedIds]);

  React.useEffect(() => {
    debouncedUpdateCheckedItems(checkedIds, unCheckedIds);
  }, [checkedIds, unCheckedIds]);

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
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb="5%">
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
                onClick={() =>
                  setModalAdd((prevValue) => ({
                    ...prevValue,
                    value: true,
                    status: "add",
                  }))
                }
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

          {getTodoList.length === 0
            ? null
            : getTodoList.map((item: any, key: number) => {
                let color;
                switch (item?.priority) {
                  case "very-high":
                    color = "#ED4C5C";
                    break;
                  case "high":
                    color = "#F8A541";
                    break;
                  case "normal":
                    color = "#00A790";
                    break;
                  case "low":
                    color = "#428BC1";
                    break;
                  case "very-low":
                    color = "#8942C1";
                    break;
                  default:
                    color = "#ED4C5C";
                }
                return (
                  <CardDetail
                    key={key}
                    id={item?.id}
                    checked={item?.is_active === 0}
                    onChange={(id: number, isChecked: boolean) => {
                      if (isChecked) {
                        setCheckedIds((prevIds: number[]) => [...prevIds, id]);
                      } else {
                        setCheckedIds((prevIds: number[]) =>
                          prevIds.filter((itemId: number) => itemId !== id)
                        );
                      }
                    }}
                    getColor={color}
                    getText={item?.title}
                    isEdit={() => {
                      setModalAdd((prevValue) => ({
                        ...prevValue,
                        value: true,
                        status: "edit",
                        id: item?.id,
                      }));
                    }}
                    // isDelete={() => {
                    //   renderTodoModalDelete(item?.id, item?.title);
                    // }}
                    sx={{
                      textDecoration: checkedIds.includes(item?.id)
                        ? "line-through"
                        : "none",
                      color: checkedIds.includes(item?.id)
                        ? "#888888"
                        : "text.primary",
                    }}
                  />
                );
              })}

          <ModalAddEdit
            open={modalAdd?.value}
            onClose={() =>
              setModalAdd((prevValue) => ({
                ...prevValue,
                value: false,
              }))
            }
            status={modalAdd?.status}
            onClick={() => {
              if (modalAdd?.status === "add") {
                handleAdd();
              } else {
                handleEdit();
              }
            }}
            getTitle={(e) =>
              setgetProps((prevValue) => ({
                ...prevValue,
                title: e,
              }))
            }
            getPriority={(e) => {
              setgetProps((prevValue) => ({
                ...prevValue,
                priority: e,
              }));
            }}
            getId={modalAdd?.id}
          />
        </ContainerTemplate>
      </ThemeProvider>
    </>
  );
};

export default Detail;
