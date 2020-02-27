import React, { Component } from "react";
import ChartWrapper from "./ChartWrapper";
import content from "./content/content";

class App extends Component {
  state = {
    topic: 1
  };

  toggleNomineeAwards = topic => this.setState({ topic });
  

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
          <div className="col-xs-offset-1 col-xs-6">
            <hr></hr>
          </div>
        </div>
        <div className="article">
          <div className="row">
            <div className="col-xs-offset-2 col-xs-8">
              <p className="text-content">{content[0].text}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-offset-1 col-xs-9">
              <ChartWrapper
                className="vis-center-container"
                topic={this.state.topic}
              />
            </div>
            <div className="col-xs-2">
              <div className="row">
                <button
                  className="float"
                  onClick={() => this.toggleNomineeAwards(1)}
                >
                  1
                </button>
              </div>
              <div className="row">
                <button
                  className="float"
                  onClick={() => this.toggleNomineeAwards(2)}
                >
                  2
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-offset-2 col-xs-8">
              <p className="query-content">{content[this.state.topic].query[0]}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-offset-2 col-xs-8">
              <p className="query-content">{content[this.state.topic].query[1]}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-offset-2 col-xs-8">
              <p className="query-content">{content[this.state.topic].query[2]}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
