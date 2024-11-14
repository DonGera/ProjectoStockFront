import { BrowserRouter } from "react-router-dom";
import { Component } from "react";
import { NavBar } from "./components/NavBar";
import { Footerx } from "./components/Footer";
import { Posts } from './components/Posts';
import { Router } from "./router";

class App extends Component {
  render() {
    return (
      <div className="flex-wrapper">
        <BrowserRouter>
          <NavBar />
          <Router />
          <Footerx />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
