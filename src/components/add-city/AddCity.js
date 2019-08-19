import React from 'react';
import './AddCity.css'

export default class AddCity extends React.Component { 
	state = {
		isPlus: true,

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

	render() {
		const {cities} = this.props
		return(
			<div className="add-wrapper">
				{ this.state.isPlus ? <i className="fas fa-plus fa-4x red" onClick={()=>this.plusToggle()}></i>:
					<ul>
					{cities.map((city) => this.Cities(city))}
					</ul>
				}
				
			</div>
		)
	}
}