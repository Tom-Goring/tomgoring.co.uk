import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Fab,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Delete, Add, Refresh } from "@material-ui/icons/";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, deleteTodo } from "../store/actions/todoActions";
import { TodoDialog } from "./TodoDialog";

const useStyles = makeStyles((theme) => ({
  // todo: {
  //   maxWidth: "75%",
  // },
}));

const TodoList = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  console.log("Loading todo list");

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  var todos = useSelector((state) => state.todo.todos);

  const addButtonStyle = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  const refreshButtonStyle = {
    margin: 0,
    top: "auto",
    right: 90,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  return (
    <div>
      <Paper className={classes.todo}>
        <TodoDialog open={open} setOpen={setOpen} />
        <List disablePadding={true}>
          <TransitionGroup className="todo-list">
            {todos.map(({ id, description }) => (
              <CSSTransition key={id} timeout={300} classNames="fade">
                <ListItem divider key={id}>
                  <ListItemText>
                    <Typography>{description}</Typography>
                  </ListItemText>
                  {/* TODO: Add progress display */}
                  {/* TODO: Add progress/description update */}
                  {/* CONSIDER: Add click to display details on extra paper window */}
                  <IconButton
                    onClick={() => {
                      dispatch(deleteTodo(id));
                    }}>
                    <Delete />
                  </IconButton>
                </ListItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </List>
      </Paper>
      {/* TODO: Add div containing all function buttons */}
      <Fab
        style={addButtonStyle}
        color="primary"
        onClick={() => {
          setOpen(true);
        }}>
        <Add />
      </Fab>
      <Fab
        style={refreshButtonStyle}
        color="primary"
        onClick={() => {
          dispatch(getTodos());
        }}>
        <Refresh />
      </Fab>
    </div>
  );
};

export default TodoList;
