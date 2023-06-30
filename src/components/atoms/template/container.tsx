import React from "react";
import { Box, SxProps } from "@mui/material";

const ContainerTemplate = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) => {
  return (
    <>
      <Box sx={{ margin: { md: "0 10vw", sm: "0 10vw", xs: "0 5vw" }, ...sx }}>
        {children}
      </Box>
    </>
  );
};

export default ContainerTemplate;
