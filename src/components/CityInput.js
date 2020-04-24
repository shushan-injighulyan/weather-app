import React, {Component} from 'react';
import '../styles/CityInput.css';


class CityInput extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ""
        }
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onSubmit = (e) => {
        e.preventDefault();
        this.props.getCitisWeatherData(this.state.city);
    }

    render(){
        return (
            <form className="search-form" onSubmit = {this.onSubmit}>
                <input 
                    type = "text" 
                    name = "city"
                    className="city"
                    placeholder = "City..."
                    value = {this.state.city}
                    onChange = {this.onChange}/>
                <button
                    type = "submit"
                    className="search-btn"
                    > 
                    <img src="https://i.ibb.co/0J6q21Q/search-icon.png"/>
                </button>    
            </form>
        )
    }
}

export default CityInput;