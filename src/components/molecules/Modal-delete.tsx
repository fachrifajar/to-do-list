import { Modal, SxProps, Card, Typography, Box } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ButtonTemplate from "../atoms/template/Button";

type MyComponentProps = {
  sx?: SxProps;
  open: boolean;
  onClose: () => void;
  title: string;
  handleDelete: () => void;
  handleCancel: () => void;
};

const ModalDelete: React.FC<MyComponentProps> = ({
  sx,
  open,
  onClose,
  title,
  handleDelete,
  handleCancel,
}) => {
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
          <ReportProblemIcon color="error" sx={{ fontSize: "54px" }} />
          <Typography
            variant="h5"
            sx={{
              "& span": {
                fontWeight: "bold",
              },
              fontSize: { md: "24px", sm: "24px", xs: "20px" },
            }}>
            Are you sure want to delete <span>"{title}"</span> ?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <ButtonTemplate
              title="CANCEL"
              variant="outlined"
              color="inherit"
              onClick={handleCancel}
            />
            <ButtonTemplate
              title="DELETE"
              color="error"
              onClick={handleDelete}
            />
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default ModalDelete;
