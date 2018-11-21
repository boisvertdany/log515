import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FilePond, registerPlugin } from 'react-filepond';
import axios from 'axios';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
registerPlugin(FilePondPluginImagePreview);

const options = ({
  url: 'http://127.0.0.1:8000/api/v1/photo/',
  process: (fieldName, file, metadata, load, error, progress, abort) => {

    const formData = new FormData();
    formData.append("image", file, file.name);
    const request = new XMLHttpRequest();
    request.open('POST', 'http://127.0.0.1:8000/api/v1/photo/');
    request.setRequestHeader('Authorization', 'token a328909353892b6caeb9b468fdfcfa7c1eceb16d');

    request.upload.onprogress = (e) => {
      progress(e.lengthComputable, e.loaded, e.total);
    };
    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        load(request.responseText);
      }
      else {
        error('oh no');
      }
    };

    request.send(formData);

    return {
      abort: () => {
        request.abort();
        abort();
      }
    };
  },
  revert: null,
  restore: null,
  load: null,
  fetch: null

});

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down('md')]: {
      height: "20vh",
    },
  },
  upload_container: {
    marginTop: "20vh",
    width: "60vw",
    margin: "auto",
  }
});

class UploadAlbum extends Component {
  create_album = () => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token a328909353892b6caeb9b468fdfcfa7c1eceb16d'
      },
      url: 'http://127.0.0.1:8000/api/v1/album/',
      data: {
        "quantity": null,
        "warmth": "HOT",
        "sharpness": false
      }
    }

    axios(options);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.upload_container}>
        <FilePond allowMultiple={true} server={options} />
        <Button onClick={this.create_album} className={classes.button} size="large" color="secondary" variant="outlined">
          Upload
          </Button>
      </div>
    );
  }
}

export default withStyles(styles)(UploadAlbum);
