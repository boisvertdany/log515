import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from "@material-ui/core/styles";
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FilePond, registerPlugin } from 'react-filepond';
import axios from 'axios';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
registerPlugin(FilePondPluginImagePreview);

// const token = "4d0c187d9e92cddf5af33483372a412e3f88b06f";
// const url = 'http://127.0.0.1:8000';

const token = "ee6538a07777c01056d91a4c239678a49cab0dcd";
const url = 'http://167.99.178.254:8000';

const options = ({
  url: url + '/api/v1/photo/',
  process: (fieldName, file, metadata, load, error, progress, abort) => {
    const formData = new FormData();
    formData.append("image", file, file.name);
    const request = new XMLHttpRequest();
    request.open('POST', url + '/api/v1/photo/');
    request.setRequestHeader('Authorization', 'token ' + token);

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
  },
  radio: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class UploadAlbum extends Component {
  state = {
    title: "",
    quantity: 1,
    warmth: 'null',
    blurred: false,
  };

  handleWarmth = event => {
    this.setState({ warmth: event.target.value });
  };

  handleBlur = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleQuantity = event => {
    this.setState({ quantity: event.target.value });
  };

  handleTitle = event => {
    this.setState({ title: event.target.value });
  };

  create_album = () => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token ' + token
      },
      url: url + '/api/v1/album/',
      data: {
        "title": this.state.title,
        "quantity": this.state.quantity,
        "warmth": this.state.warmth,
        "sharpness": this.state.blurred
      }
    }
    axios(options);
  };

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.upload_container}>
        <FilePond allowMultiple={true} server={options} />
        <div className={classes.radio}>
          <FormControl component="fieldset" className={classes.formControl}>
            <TextField
              id="standard-name"
              label="Title"
              className={classes.textField}
              value={this.state.title}
              onChange={this.handleTitle}
            />
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <TextField
              id="standard-number"
              label="Quantity"
              value={this.state.quantity}
              onChange={this.handleQuantity}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Warmth</FormLabel>
            <RadioGroup
              aria-label="Warmth"
              name="warmth1"
              className={classes.group}
              value={this.state.warmth}
              onChange={this.handleWarmth}
            >
              <FormControlLabel value="null" control={<Radio />} label="Unspecified" />
              <FormControlLabel value="HOT" control={<Radio />} label="Hot" />
              <FormControlLabel value="COLD" control={<Radio />} label="Cold" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Remove Blurred Photos</FormLabel>
            <Switch
              checked={this.state.blurred}
              onChange={this.handleBlur('blurred')}
              value="checkedA"
            />
          </FormControl>
        </div>
        <Button onClick={this.create_album} className={classes.button} size="large" color="secondary" variant="outlined">
          Upload
          </Button>
      </div>
    );
  }
}

export default withStyles(styles)(UploadAlbum);
