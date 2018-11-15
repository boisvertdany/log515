import React, { Component } from 'react';
import Header from './components/Header.jsx';
import Body from './components/Body.jsx';
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from './logo.svg';
import './App.css';

import pink from '@material-ui/core/colors/pink';
import yellow from '@material-ui/core/colors/yellow';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    seconday: yellow
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
