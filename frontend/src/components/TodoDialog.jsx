import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@material-ui/core";
import { addTodo } from "../store/actions/todoActions";
import { useDispatch } from "react-redux";

export const TodoDialog = (props) => {
  const [text, setText] = React.useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(addTodo(text));
    setText("");
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter todo text:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
