import React, { Component } from 'react';
import ChartWrapper from './ChartWrapper';

class App extends Component {
  state = {
    topic:"oscars"
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="header col-xs-offset-1 col-xs-11">
            <p>The Oscar Awards (1927 - 2020)</p>
            <div className="subheader">
              <p>A visualisation by KJSBryant</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-offset-1 col-xs-7">
            <ChartWrapper className="vis-center" topic={this.state.topic} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-offset-1 col-xs-7">
            <ChartWrapper className="vis-center" topic={this.state.topic} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-offset-1 col-xs-7">
            <ChartWrapper className="vis-center" topic={this.state.topic} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
