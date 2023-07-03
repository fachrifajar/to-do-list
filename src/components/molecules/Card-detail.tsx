import React from "react";
import { Card, Checkbox, Typography, SxProps, Box } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type CardDetailProps = {
  id?: number;
  checked?: boolean;
  onChange?: any;
  getColor?: string;
  getText?: string;
  isEdit?: any;
  isDelete?: any;
  sx: SxProps;
};

const CardDetail = ({
  id,
  checked,
  onChange,
  getColor,
  getText,
  isEdit,
  isDelete,
  sx,
}: CardDetailProps) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  const handleCheck = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(id, newChecked);
  };

  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        height: "80px",
        borderRadius: "10px",
        marginBottom: "10px",
        position: "relative",
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          p: 3,
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "90%",
          }}>
          <Checkbox checked={isChecked} onChange={handleCheck} />
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: getColor ? getColor : "red",
              margin: "auto 20px",
            }}
          />

          <Typography
            variant="body1"
            sx={{
              display: "inline-block",
              marginRight: "20px",
              ...sx,
            }}>
            {getText}
          </Typography>
          <CreateIcon
            onClick={() => {
              isEdit(id);
            }}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "secondary.main",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "10%",
          }}>
          <DeleteOutlineIcon
            onClick={() => {
              isDelete(id);
            }}
            sx={{
              "&:hover": {
                color: "red",
                cursor: "pointer",
              },
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default CardDetail;
