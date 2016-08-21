import React, { Component } from 'react';
import NavBar from './navbar';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
    this.renderFooter = this.renderFooter.bind(this);
  }

  renderFooter() {
    return (
      <footer>
        <a href="mailto:digupdartmouth@gmail.com">
          Contact the Digup Team
        </a>
      </footer>
    );
  }

  render() {
    return (
      <div className="pageContainer">
        <NavBar />
        <div className="content">
          {this.props.children}
        </div>
        {this.renderFooter()}
      </div>
    );
  }
}

export default App;
