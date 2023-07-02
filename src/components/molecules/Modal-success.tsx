import { Modal, Card, Typography, SxProps, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type ModalSuccessProps = {
  sx?: SxProps;
  open: boolean;
  onClose: () => void;
  title: string;
};

const ModalSuccess = ({ sx, open, onClose, title }: ModalSuccessProps) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...sx,
        }}>
        <Card
          sx={{
            textAlign: "center",
            borderRadius: "20px",
            padding: "2%",
            overflowY: "auto",
            width: "500px",
          }}>
          <Box display="flex" alignItems="center">
            <CheckCircleIcon
              color="success"
              sx={{ fontSize: "34px", mr: "3%" }}
            />
            <Typography
              variant="h6"
              sx={{
                "& span": {
                  fontWeight: "bold",
                },
                fontSize: { md: "24px", sm: "24px", xs: "20px" },
              }}>
              <span>{title}</span> successfully deleted !
            </Typography>
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default ModalSuccess;
