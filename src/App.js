import React, { Component } from "react";
import ProductView from "./containers/ProductView";
import "./App.css";

class App extends Component {
  state = {
    user: ""
  };

  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
        <main className="p-4 mb-5">
          <ProductView />
        </main>
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    localStorage.setItem("user", "Clark");
    let user = localStorage.getItem("user");
    this.setState({
      user: user
    });
  }
}

const Header = props => {
  return (
    <nav className="navbar navbar-light bg-light">
      <h1>Curtain Co.</h1>
      <span className="navbar-text">
        Welcome, {props.user} <i className="fas fa-user"></i>
      </span>
    </nav>
  );
};

const Footer = props => {
  return (
    <footer className="footer">
      <div className="text-center">
        <small>Version 1.0.0</small>
        <div className="motion_logo">
          <a href="https://motiondesign.nz/">
            <img
              src="https://motiondesign.nz/wp-content/themes/MD/img/logo@2x.png"
              height="15"
              alt="MotionDesign"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default App;
