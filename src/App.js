import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CityInput from './components/CityInput';
import Header from './components/layout/Header';
import Today from './components/pages/Today';
import Tomorrow from './components/pages/Tomorrow';
import Fiveday from './components/pages/Fiveday';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: [],
      tomorrow: [],
      fiveday: [], 
      isSearched: false,
      isError: false,
      isCityFound: false
    };
  }

  getCitisWeatherData = name => {
    this.setState({
      today: [],
      tomorrow: [],
      fiveday: []
    })
    return fetch ("https://api.openweathermap.org/data/2.5/forecast?q="+ name + "&appid=7b91084f95564bb1644732b86a0c1f86")
    .then(res => res.json())
    .then(result => {
      if(result.cod === "200") {
        let {today, tomorrow, fiveday} = this.state
        let currentDay = new Date (result.list[0].dt_txt).getDay()
        result.list.forEach( item => {
          let forecastItem = {
            temp: item.main.temp,
            humidity: item.main.humidity,
            descr: item.weather[0].description,
            icon: item.weather[0].icon,
            date: item.dt_txt
          };
          if (new Date (item.dt_txt).getDay() === currentDay) {
            today.push(forecastItem);
          } else if (new Date (item.dt_txt).getDay() === currentDay + 1 || new Date (item.dt_txt).getDay() === currentDay - 6) {
            tomorrow.push(forecastItem);
          }
          if (new Date (item.dt_txt).getHours() === 12){
            fiveday.push(forecastItem);
          }
            this.setState({
              today,
              tomorrow,
              fiveday, 
              isSearched: true,
              isCityFound: true
            });
          }
        )
      } else if (result.cod === "404") {
        this.setState({
          isSearched: true,
          isCityFound: false
        });
      }
    }).catch((error) => {
      this.setState({
        isSearched: true,
        isError: true
      });
    })
  }

  render(){
    let main;
    let {today, tomorrow, fiveday, isSearched, isCityFound, isError} = this.state;
    if(!isSearched) {
      main = <div className="app-descr-wrapper">
        <div className="app-header">WEATHER FINDER</div>
        <div className="main-message">Find out temperatue, conditios and more</div>
      </div>
    } else if (isSearched && !isCityFound) {
      main = <div className="main-message">City not found</div>
    } else if (isCityFound) {
      main =  <div className="forecast-body">
        <Header />
        <Route exact path="/" render={props => (
          <Today items = {today}/>
          )}/>
        <Route path="/tomorrow" render={props => (
          <Tomorrow items = {tomorrow}/>
          )}/>
        <Route path="/fiveday" render={props => (
          <Fiveday items = {fiveday}/>
          )}/>
      </div>
    } else if (isError){
      main = <div className="main-message">Something went wrong</div>
    }
    return (
      <div className="app-container">
        <div className="app-main">
          <Router>
            <CityInput getCitisWeatherData={this.getCitisWeatherData}/>
            {main}
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
