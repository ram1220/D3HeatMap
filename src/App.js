import React, { Component } from 'react';
import './App.css';

import HeatMapChart from './HeatMapChart';
import DayViewChart from './DayViewChart';
import WeeKViewChart from './WeekViewChart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeatMapChart />
        <DayViewChart />
        <WeeKViewChart />       </div>
    );
  }
}

export default App;
