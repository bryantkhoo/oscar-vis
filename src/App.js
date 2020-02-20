import React, { Component } from 'react';
import ChartWrapper from './ChartWrapper';
import content from './content/content'

class App extends Component {
  state = {
    topic:"nominated"
  }

  toggleNomineeAwards = (topic) => this.setState({ topic })

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
            <div className="col-xs-offset-2 col-xs-6">
              <p className="text-content">{content[0].text}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-offset-2 col-xs-6">
              <p className="query-content">{content[1].query}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-offset-1 col-xs-7">
              <ChartWrapper className="vis-center-container" topic={this.state.topic} />
            </div>
            <div className="col-xs-1">
              <div className="row">
                <button className="float" onClick={()=>this.toggleNomineeAwards("nominated")} />
              </div>
              <div className="row">
                <button className="float" onClick={()=>this.toggleNomineeAwards("awarded")} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-offset-2 col-xs-6">
              <p className="query-content">{content[2].query}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-offset-1 col-xs-7">
              <ChartWrapper className="vis-center-container" topic={this.state.topic} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-offset-2 col-xs-6">
              <p className="query-content">{content[3].query}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-offset-1 col-xs-7">
              <ChartWrapper className="vis-center-container" topic={this.state.topic} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
