import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Home from './Home.jsx';
import UploadAlbum from './UploadAlbum.jsx';
import Login from './Login.jsx';

class Body extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact={true} component={Home} />
        <Route path="/upload_album" component={UploadAlbum} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default Body;
