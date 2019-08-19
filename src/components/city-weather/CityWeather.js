import React from 'react';
import axios from 'axios'
import Loader from '../loader/loader.js'
import './CityWeather.css'

const API_KEY = '093c63d1d6dd2f0f77c6f14d91a19042';

export default class CityWeather extends React.Component { 
	state = {
		isReady: false
	}

	toC = (temp) => {
    	return Math.round(temp - 273.15)
  	}

	updateWeather = () => {
		axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.props.match.params.city}&appid=${API_KEY}`)
    .then(response => {
      this.setState({...response.data, isReady: true})
    })
	}

	componentDidMount() {
    this.updateWeather()
  }

	render() {
		console.log(this.state)

		return(
			<div className="city-container">
				{ this.state.isReady ? 
					<div className="city-wrapper">
						<div className="city-main">

							<img src={`http://openweathermap.org/img/w/${this.state.weather[0].icon}.png`} 
								alt={this.state.weather[0].icon}
								className="city-weather-pic"
							/> 

							<div className="city-weather-block">
								<div className="city-description"> City: {this.state.name} </div>
								<div className="city-description"> Temp: { this.toC(this.state.main.temp) }<sup>o</sup>C </div>
							</div>

						</div>

						<div className="city-other">
							<div className="city-other-1">
								<ul>
									<li>Forecast: {this.state.weather[0].main}</li>
									<li>Description: {this.state.weather[0].description}</li>
									<li>Wind speed: {this.state.wind.speed}</li>
									<li>Wind direction: {this.state.wind.deg}</li>
								</ul>
							</div>
							<div className="city-other-2">
								<ul>
									<li>Temp min: {this.toC(this.state.main.temp_min)}<sup>o</sup>C </li>
									<li>Temp max: {this.toC(this.state.main.temp_max)}<sup>o</sup>C </li>
									<li>Atm pressure: {this.state.main.pressure}</li>
								</ul>
							</div>
						</div>
					</div> 
					:<Loader />
				}
			</div>
		)
	}
}