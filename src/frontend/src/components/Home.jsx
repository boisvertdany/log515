import React from 'react';
import Button from '@material-ui/core/Button';
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

    width: "50%",
    margin: "auto",
    height: "18vh",
    marginTop: "25vh"
  },
  home_welcome_message: {
    ...theme.mixins.gutters(),
    marginTop: "2vh",
    fontSize: "1rem"
  },
  button_div: {
    ...theme.mixins.gutters(),
    marginTop: "2vh",
    fontSize: "1rem"
  },
  button: {
    marginLeft: "20px"
  }
});

function Home(props) {
  const { classes } = props;


  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Welcome to Pix N Match!
        </Typography>
        <Typography component="p" className={classes.home_welcome_message}>
          It seems like you are not connected, do you want to
          authenticate in order to to keep an history of your uploaded
          albums or do you want to simply upload an album temporarily?
        </Typography>
        <div class={classes.button_div}>
          <Link to="/login">
            <Button size="large" color="primary" variant="outlined">
              Login
          </Button>
          </Link>
          <Link to="/upload_album">
            <Button className={classes.button} size="large" color="secondary" variant="outlined">
              Upload
          </Button>
          </Link>
        </div>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Home);