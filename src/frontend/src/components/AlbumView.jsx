import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// const token = "4d0c187d9e92cddf5af33483372a412e3f88b06f";
// const url = 'http://127.0.0.1:8000';

const url = 'http://167.99.178.254:8000';
const token = "ee6538a07777c01056d91a4c239678a49cab0dcd";


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
    marginTop: "10vh"
  },
  paper: {
    width: "50%",
    margin: "auto",
    height: "18vh",
    marginTop: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",

  },
  home_welcome_message: {
    ...theme.mixins.gutters(),
    marginTop: "55px",
    fontSize: "1rem"
  },
  title: {
    color: "gray",
  }
});

class AlbumView extends Component {

  state = {
    album: null,
  };

  componentDidMount() {
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token ' + token
      },
      url: url + '/api/v1/album/' + this.props.match.params.id + '/',
    }
    axios(options).then((answer) => {
      this.setState({ album: answer.data });
    });
  }
  render() {
    const { classes } = this.props;
    console.log(this.state.album);
    var albumToRender = this.state.album ?
      <a href={this.state.album.album}>
        <Paper className={classes.paper}>
          <Typography className={classes.title} variant="h5" component="h3">
            {this.state.album.title}
          </Typography>
          {console.log(this.state.album)}
        </Paper>
      </a>
      : <div>Invalid Album</div>;

    console.log(albumToRender)

    return (
      <div>
        {albumToRender}
      </div>
    );
  }
}

export default withStyles(styles)(AlbumView);
