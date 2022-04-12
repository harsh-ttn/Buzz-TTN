import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade, Paper, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({
  message,
  modalHeader,
  modalMessage,
  func,
  id,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Paper onClick={handleOpen}>{message}</Paper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{modalHeader}</h2>
            <p id="transition-modal-description">{modalMessage}</p>
            <Button
              size="small"
              onClick={handleClose}
              variant="outlined"
              color="primary"
              style={{ padding: 0 }}
            >
              Close
            </Button>
            <Button
              size="small"
              onClick={() => {
                handleClose();
                func(id);
              }}
              variant="outlined"
              color="secondary"
              style={{ padding: 0 }}
            >
              {message}
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
