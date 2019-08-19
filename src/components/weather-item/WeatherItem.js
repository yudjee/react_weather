import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import './WeatherItem.css'

import Loader from '../loader/loader.js'


const API_KEY = '093c63d1d6dd2f0f77c6f14d91a19042';

export default class WeatherBox extends React.Component {

	state = {
		ready: false
	}

	updateWeather = () => {
		this.setState({ready: false})
		axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&appid=${API_KEY}`)
    .then(response => {
      this.setState({...response.data, ready: true})
    })
	}

	toC = (temp) => {
    	return Math.round(temp - 273.15)
  	}

	CityWeather = () => {
		return(
			<div className="weather-item">
				<div className="weather-header">
					<div className="weather-title"> {this.state.name} </div>
					<div className="weather-icons">
						<i className="fas fa-spinner" onClick={() => this.updateWeather()}></i>
						<i className="far fa-times-circle" onClick={() => this.props.deleteCity(this.state.name)}></i>
					</div>
				</div> 
				<div className="weather-main">
					<img src={`http://openweathermap.org/img/w/${this.state.weather[0].icon}.png`} 
						alt={this.state.weather[0].icon}
						className="weather-pic"
					/>
					<div className="weather-info">
						<div>Temperature: <span className="weather-description">{ this.toC(this.state.main.temp) }<sup>o</sup>C</span> </div>
						<div>Forecast: <span className="weather-description">{this.state.weather[0].main}</span> </div>
						<div>Atm.pressure: <span className="weather-description">{this.state.main.pressure}</span> </div>
						<div>Wind speed: <span className="weather-description">{this.state.wind.speed} m/s</span> </div>
					</div>
					<Link to={`/${this.state.name}`} className="weather-details">Click for more</Link>			
				</div>
			</div>
		)
	}

	componentDidMount() {
    this.updateWeather()
  }

	render() {
		
		return(
      <div className="weather-wrapper"> 
      	{ this.state.ready ? <this.CityWeather /> : <Loader />}      	
      </div>
		)
	}
}