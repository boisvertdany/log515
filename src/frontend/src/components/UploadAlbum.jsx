import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";

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

class UploadAlbum extends Component {
  render() {
    return (
      <div>
        Add albumn
      </div>
    );
  }
}

export default withStyles(styles)(UploadAlbum);
