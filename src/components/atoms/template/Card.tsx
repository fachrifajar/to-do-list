import React from "react";
import { Card, SxProps, CardActionArea } from "@mui/material";

type MyComponentProps = {
  sx?: SxProps;
  children?: React.ReactElement;
};

const CardTemplate: React.FC<MyComponentProps> = ({ sx, children }) => {
  return (
    <>
      <Card
        onClick={() => console.log("masux")}
        sx={{
          width: { md: "220px", sm: "220px", xs: "50%" },
          height: "30vh",
          m: { md: "0 0.5% 1% 0.5%", sm: "0 0.5% 1% 0.5%", xs: "0 0 3% 0" },
          borderRadius: "20px",
          ...sx,
        }}>
        <CardActionArea sx={{ padding: "10%", height: "100%" }}>
          {children}
        </CardActionArea>
      </Card>
    </>
  );
};

export default CardTemplate;
