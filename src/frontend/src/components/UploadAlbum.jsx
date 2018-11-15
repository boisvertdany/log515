import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
<<<<<<< HEAD
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
registerPlugin(FilePondPluginImagePreview);

const options = ({
  server: {
    url: 'http://127.0.0.1:8000/api/v1/photo/',
    process: {
      url: './process',
      method: 'POST',
      withCredentials: true,
      headers: { Authorization: "Token a328909353892b6caeb9b468fdfcfa7c1eceb16d" }, //TODO CHANGE
      timeout: 7000,
      onload: null,
      onerror: null
    }
  }
});
=======
>>>>>>> 5b7b859... *Change project structure, +Add Home Page

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
        <FilePond allowMultiple={true} setOptions={options} />
      </div>
    );
  }
}

export default withStyles(styles)(UploadAlbum);
