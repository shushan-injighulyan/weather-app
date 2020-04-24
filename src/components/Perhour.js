import React from 'react';
import '../styles/Perhour.css';

function PerHour(props) {
    let {date, temp, icon, humidity} = props.item
    let kelvinToCelsius = temp => {
        return Math.floor(temp - 273.15)
    }
    return (
        <div className="hourly-wrapper">
            <div className="hourly-time">{new Date(date).getHours()}:00</div>
            <div className="hourly-temp">{kelvinToCelsius(temp)}&#176;C</div>
            <div className="hourly-icon">
                <img src = {"http://openweathermap.org/img/w/" + icon + ".png"} />
            </div>
            <div className="hourly-humidity">{humidity}%</div>
        </div>
        )
}

export default PerHour;