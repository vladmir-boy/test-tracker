import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ForecastService, IForecastService } from './services/WeatherForecast/ForecastService';
import container from './infra/di';
class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { weather: null };
  }

  async componentDidMount() {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=London&aqi=no`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    this.setState({ weather: json });
  }

  render() {
    return (
      <div>
        <div>Celcius: </div><div>{this.state.weather && this.state.weather.current.temp_c}</div>
      </div>
    );
  }
}

export default App;
