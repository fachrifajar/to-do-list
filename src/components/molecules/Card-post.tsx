import CardTemplate from "../atoms/template/Card";
import { Typography, Box, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type MyComponentProps = {
  title: string;
  date: string;
  onClick: (event: React.MouseEvent) => void;
  redirect?: () => void;
};

const CardPost: React.FC<MyComponentProps> = ({
  title,
  date,
  onClick,
  redirect,
}) => {
  return (
    <CardTemplate>
      <Box
        onClick={redirect}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%">
        <Typography variant="h5" fontWeight="bold" sx={{ mb: "auto" }}>
          {title}
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Typography variant="body2">{date}</Typography>
          <IconButton
            onClick={onClick}
            sx={{
              "&:hover": {
                color: "red",
              },
            }}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      </Box>
    </CardTemplate>
  );
};

export default CardPost;
