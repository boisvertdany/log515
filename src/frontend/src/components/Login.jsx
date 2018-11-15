import React from 'react';
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down('md')]: {
    height: "20vh",
    },
  }
});

function Login(props) {
  const { classes } = props;


  return (
    <div>
        Login Page
    </div>
  );
}

export default withStyles(styles)(Login);