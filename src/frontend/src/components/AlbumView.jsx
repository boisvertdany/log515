import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import { withStyles } from "@material-ui/core/styles";

const PHOTO_SET = [
    {
      src: '/cheap.jpg',
      width: 4,
      height: 3
    },
    {
      src: '/cheapfastgood.png',
      width: 1,
      height: 1
    },
    {
      src: '/lowprice.jpeg',
      width: 1,
      height: 1
    },
    {
      src: '/pig.png',
      width: 1,
      height: 1
    },
    {
      src: '/good.jpg',
      width: 1,
      height: 1
    },
  ];


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

class AlbumView extends Component {
  render() {
    console.log(this.props.match.params.id);
    return (
      <div>
            <Gallery photos={PHOTO_SET} />
      </div>
    );
  }
}

export default withStyles(styles)(AlbumView);
