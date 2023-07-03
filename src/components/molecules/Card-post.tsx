import {
  Typography,
  Box,
  IconButton,
  Card,
  CardActionArea,
} from "@mui/material";
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
    <Card
      onClick={redirect}
      sx={{
        width: { md: "220px", sm: "220px", xs: "49%" },
        height: "30vh",
        m: { md: "0 0.5% 1% 0.5%", sm: "0 0.5% 1% 0.5%", xs: "0 1% 3% 0" },
        borderRadius: "20px",
      }}>
      <CardActionArea sx={{ padding: "10%", height: "100%" }}>
        <Box
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
      </CardActionArea>
    </Card>
  );
};

export default CardPost;
