import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import WeatherItem from './components/weather-item/WeatherItem.js'
import CityWeather from './components/city-weather/CityWeather.js'
import AddCity from './components/add-city/AddCity.js'

export default class App extends React.Component { 

  state = {
    cities: ['London', 'Kharkiv', 'Istanbul'],
    newCities: ['London', 'Kharkiv', 'Istanbul', 'Tokyo', 'New York', 'Berlin', 'Marino'],
    ready: false
  }

  deleteCity = (city) => {
    const newCityList = [...this.state.cities];
    for(let i = 0; i < this.state.cities.length; i++) {
      if(city === this.state.cities[i]) {
        newCityList.splice(i, 1)
      }
    }
    this.setState({cities: newCityList})
  }

  addCitiesList = () => {
    const addCities = []
    for(let c=0; c<this.state.newCities.length; c++) {
      if(!this.state.cities.includes(this.state.newCities[c])) {
        addCities.push(this.state.newCities[c])
      }
    }
    return addCities
  }

  addNewCities = (city) => {
    if(!this.state.newCities.includes(city)) {
      const addCities = [...this.state.newCities]
      addCities.push(city)
      this.setState({newCities: addCities})
    }
  }

  showCity = (city) => {
    const cityList = [...this.state.cities]
    cityList.push(city)
    this.setState({cities: cityList})
  }

  componentDidMount() {
    if(localStorage.getItem('cities') === null) {
      localStorage.setItem('cities', this.state.cities)
    } else {
      let citiesLS = localStorage.getItem('cities')
      this.setState({cities: citiesLS.split(",")})
    }
  }

  componentDidUpdate() {
    localStorage.setItem('cities', this.state.cities)
  }


  render() {
    
    return (
      <BrowserRouter>
        <div className="App">
            <h1 onClick={()=>this.addCities()}>Weather app</h1>
            <Route path="/" exact render={() => {
              return(
                 <div className="weather-container">
              { this.state.cities.map((city) => {
                  return(
                    <WeatherItem city={city} key={city} deleteCity={this.deleteCity}/> 
                  )
                }) 
              }
              <AddCity cities={this.addCitiesList()} showCity={this.showCity} addNewCities={this.addNewCities}/>
            </div> 
              )
            }

            } />
            <Route path="/:city" component={CityWeather}/>
        </div>
      </BrowserRouter>
    );
  }
}
