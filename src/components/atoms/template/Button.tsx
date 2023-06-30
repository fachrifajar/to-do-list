import React from "react";
import { Button, SxProps } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

type MyComponentProps = {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  sx?: SxProps;
  // color?:
  //   | "inherit"
  //   | "primary"
  //   | "secondary"
  //   | "success"
  //   | "error"
  //   | "info"
  //   | "warning";
  color?: any;
  component?: any;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  endIcon?: any;
  startIcon?: any;
  fullWidth?: boolean;
};

const ButtonTemplate: React.FC<MyComponentProps> = ({
  title,
  onClick,
  disabled,
  isLoading,
  sx,
  color,
  endIcon,
  component,
  variant,
  size,
  startIcon,
  fullWidth,
}) => {
  if (isLoading) {
    return (
      <LoadingButton
        fullWidth={fullWidth}
        component={component}
        loading={true}
        variant={variant ? variant : "contained"}
        disabled={disabled}
        onClick={onClick}
        size={size}
        color={color}
        sx={{
          borderRadius: "10px",
          marginTop: "20px",
          color: "white",
          textTransform: "none",
          ...sx,
        }}>
        Loading...
      </LoadingButton>
    );
  }

  return (
    <Button
      fullWidth={fullWidth}
      color={color}
      component={component}
      variant={variant ? variant : "contained"}
      disabled={disabled}
      onClick={onClick}
      endIcon={endIcon}
      startIcon={startIcon}
      size={size}
      sx={{
        borderRadius: "10px",
        marginTop: "20px",
        textTransform: "none",
        ...sx,
      }}>
      {title}
    </Button>
  );
};

export default ButtonTemplate;
