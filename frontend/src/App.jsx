import { Avatar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DescriptionIcon from "@material-ui/icons/Description";
import DoneIcon from "@material-ui/icons/Done";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import MenuIcon from "@material-ui/icons/Menu";
import TimelineIcon from "@material-ui/icons/Timeline";
import clsx from "clsx";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Link as RouterLink, Route } from "react-router-dom";
import "./App.css";
import avatar from "./me.jpg";
import Todo from "./pages/Todo";
import store from "./store";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appHeader: {
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(2, 1, 1.5, 1),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -(drawerWidth * 1.1),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  avatar: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
}));

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                edge="start"
                className={classes.menuButton}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Tom Goring
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}>
            <Toolbar />
            <div className={classes.drawerContainer}>
              <div className={classes.drawerHeader}>
                <Avatar className={classes.avatar} alt="Tom Goring" src={avatar}></Avatar>
                <Typography variant="h5">Tom Goring</Typography>
                <Typography variant="caption">mail@tomgoring.co.uk</Typography>
              </div>
              <Divider />
              {/* TODO: Add links to actual pages */}
              <List>
                <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
                <ListItemLink to="/about-me" primary="About Me" icon={<InfoIcon />} />
                <ListItemLink to="/timeline" primary="Timeline" icon={<TimelineIcon />} />
                <ListItemLink to="/cv" primary="CV" icon={<DescriptionIcon />} />
              </List>
              <Divider />
              <List>
                <ListItemLink to="/todo-list" primary="My todo-list" icon={<DoneIcon />} />
                <ListItemLink to="/projects" primary="My Projects" icon={<AssignmentIcon />} />
              </List>
            </div>
          </Drawer>
          <Toolbar />
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}>
            <div className={classes.appHeader} />
            <Route exact path="/todo-list" component={Todo} />
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
