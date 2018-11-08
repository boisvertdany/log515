import React, { Component } from 'react';
import Header from './Header.js';
import Body from './Body.js';
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from './logo.svg';
import './App.css';

import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: pink,
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Body />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
