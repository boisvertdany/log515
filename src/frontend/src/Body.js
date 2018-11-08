import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Index from './Index';
import AddAlbum from './AddAlbum';

class Body extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Index} />
        <Route path="/add_album" component={AddAlbum} />
      </div>
    );
  }
}

export default Body;
