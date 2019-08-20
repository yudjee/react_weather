import React from 'react';
import axios from 'axios'
import './AddCity.css'

const API_KEY = '3b2e710fb8e79084a5ff6a9cfd40c62b';

export default class AddCity extends React.Component { 
	state = {
		isPlus: true,
		findCityValue: '',
		cityOk: true
	}

	plusToggle = () => {
		this.setState({isPlus: false})
	}

	onCityClick = (city) => {

		this.props.showCity(city)
		this.setState({isPlus: true})
	}

	Cities = (city) => {
		return(
			<li key={city} className="city-item" onClick={() => this.onCityClick(city)}>{city}</li>
		)
	}

	onAddCity = () => {
		axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.findCityValue}&appid=${API_KEY}`)
    .then(response => {
    	this.props.addNewCities(this.state.findCityValue)
    	this.props.showCity(this.state.findCityValue)
      this.setState({cityOk: true, findCityValue: ''})
    })
    .catch(error => {
			console.log(error)
    	this.setState({cityOk: false, findCityValue: ''})
    })
	}

	handleChange = (event) => {
    this.setState({findCityValue: event.target.value});
  }

  componentDidUpdate() {
		
  }

	render() {
		const {cities} = this.props
		return(
			<div className="add-wrapper">
				{ this.state.isPlus ? <i className="fas fa-plus fa-4x red" onClick={()=>this.plusToggle()}></i>:
						<div className="add-city-list">
						<ul>
						{cities.map((city) => this.Cities(city))}
						</ul>
						<div className="city-input">
							<input type="text" 
								placeholder="City name" 
								className="city-input-field"

								value={this.state.findCityValue}
								onChange={(event) => this.handleChange(event)}
							/>
							<button className="city-input-btn" onClick={() => this.onAddCity()}>Add city</button>							
						</div>
						{this.state.cityOk ? '': <div className="red">Wrong city!</div>}
					</div>
				}

				
			</div>
		)
	}
}