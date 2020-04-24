import React, {Component} from 'react';
import '../styles/Current.css';

function Current (props) {
        let daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let {date, temp, icon, humidity, descr} = props.item;
        let kelvinToCelsius = temp => {
            return Math.floor(temp - 273.15)
        }
        return (
            <div className="current-wrapper">
                <div className="current-main">
                    <div className="current-day">{daysInWeek[new Date(date).getDay()]}</div>
                    <div className="current-date">{months[new Date(date).getMonth()]} {new Date(date).getDate()}</div>
                    <div className="current-temp">{kelvinToCelsius(temp)}&#176;C</div>
                </div>
                <div className="current-additional">
                    <div className="current-humidity">Humidity: {humidity}%</div>
                    <div className="current-descr">{descr}</div>
                    <div className="current-image">
                        <img src = {"http://openweathermap.org/img/w/" + icon + ".png"} />
                    </div>
                </div>
            </div>
        )
    }

export default Current;