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
        <a href="mailto:teamundecided16f@gmail.com">
          Contact the Undecided Team
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
