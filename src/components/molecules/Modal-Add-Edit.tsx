import React from "react";
import axios from "axios";
import {
  Modal,
  Card,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldTemplate from "../atoms/template/TextField";
import ButtonTemplate from "../atoms/template/Button";

type ModalAddEditProps = {
  open: boolean;
  onClose: () => void;
  status: string;
  onClick?: (event: React.MouseEvent) => void | undefined;
  _onClick?: (event: React.MouseEvent) => void | undefined;
  getTitle?: (e: any) => void | undefined;
  getPriority?: (e: any) => void | undefined;
  getId: any;
};

const priorityOptions = [
  {
    value: "very-high",
    label: "Very High",
    color: "#ED4C5C",
  },
  {
    value: "high",
    label: "High",
    color: "#F8A541",
  },
  {
    value: "normal",
    label: "Normal",
    color: "#00A790",
  },
  {
    value: "low",
    label: "Low",
    color: "#428BC1",
  },
  {
    value: "very-low",
    label: "Very Low",
    color: "#8942C1",
  },
];

const ModalAddEdit = ({
  open,
  onClose,
  status,
  onClick,
  getTitle,
  getPriority,
  getId,
}: ModalAddEditProps) => {
  const [priority, setPriority] = React.useState("very-high");
  const [title, setTitle] = React.useState({
    value: "",
    isErr: false,
    errMsg: "",
  });
  const [isDisabled, setIsDisabled] = React.useState(true);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length < 3) {
      setTitle((prevValue) => ({
        ...prevValue,
        value: "",
        isErr: true,
        errMsg: "Title can't be lower than 3 characters",
      }));
    } else {
      setTitle((prevValue) => ({
        ...prevValue,
        value: inputValue,
        isErr: false,
        errMsg: "",
      }));
      if (getTitle) {
        getTitle(inputValue);
      }
    }
  };

  const handleChange = (event: any) => {
    setPriority(event.target.value);
    if (getPriority) {
      getPriority(event.target.value);
    }
  };

  React.useEffect(() => {
    if (title?.value) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [title?.value]);

  const handleGetDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/todo-items/${getId}
        }`
      );

      setPriority(response?.data?.priority);

      if (getTitle) {
        getTitle(response?.data?.title);
      }
      if (getPriority) {
        getPriority(response?.data?.priority);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (status === "edit") {
      handleGetDetail();
    }
  }, [getId]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
    
        }}>
        <Card
          sx={{
            textAlign: "center",
            borderRadius: "20px",
            padding: "2%",
            overflowY: "auto",
            width: "500px",
          }}>
          <Box sx={{ width: "100%" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={5}>
              <Box />
              <Typography variant="h5" fontWeight="bold">
                {status === "add" ? "Add List Item" : "Edit List Item"}
              </Typography>
              <CloseIcon
                onClick={onClose}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Box>
            <TextFieldTemplate
              onChange={handleChangeTitle}
              error={title?.isErr}
              helperText={title?.errMsg}
              label={status.toLocaleUpperCase()}
              fullWidth={true}
              variant="filled"
              sx={{
                "& label": {
                  color: "text.secondary",
                },
                "& label.Mui-focused": {
                  color: "primary.main",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8692a6",
                  },
                  "&:hover fieldset": {
                    borderColor: "secondary",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "secondary.main",
                  },
                },
              }}
            />

            <FormControl
              sx={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "flex-start",
                width: "30%",
              }}>
              <InputLabel shrink sx={{ marginTop: "-15px", fontWeight: 500 }}>
                PRIORITY
              </InputLabel>
              <Select value={priority} onChange={handleChange}>
                {priorityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
                      <Box
                        sx={{
                          backgroundColor: option.color,
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          marginRight: "8px",
                        }}
                      />
                      <span>{option.label}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              mt="5%">
              <ButtonTemplate
                onClick={onClick}
                disabled={isDisabled}
                title={status.toLocaleUpperCase()}
                color="success"
                sx={{ fontWeight: "bold", width: "50%", borderRadius: "20px" }}
              />
            </Box>
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default ModalAddEdit;
