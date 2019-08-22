import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux';

//components
import WeatherItem from './components/weather-item/WeatherItem.js'
import CityWeather from './components/city-weather/CityWeather.js'
import AddCity from './components/add-city/AddCity.js'

//actions
import {setCities, deleteCity, addCityCard, addNewCity, setNewCities} from './actions'

import './App.css';

class App extends React.Component { 

  addCitiesList = () => {
    const addCities = []
    for(let c=0; c<this.props.newCities.length; c++) {
      if(!this.props.cities.includes(this.props.newCities[c])) {
        addCities.push(this.props.newCities[c])
      }
    }
    return addCities
  }

  addNewCities = (city) => {
    if(!this.props.newCities.includes(city)) {
      this.props.addNewCity(city)
    }
  }

  showCity = (city) => {
    if(!this.props.cities.includes(city)) {
      this.props.addCityCard(city)
    }
  }

  componentDidMount() {
    // get cities from LocalStorage
    if(localStorage.getItem('cities') === null) {
      localStorage.setItem('cities', this.props.cities)
    } else {
      let citiesLS = localStorage.getItem('cities')
      this.props.setCities(citiesLS.split(","))
    }

    // get newCities from LocalStorage
    if(localStorage.getItem('newCities') === null) {
      localStorage.setItem('newCities', this.props.newCities)
    } else {
      let newCitiesLS = localStorage.getItem('newCities')
      this.props.setNewCities(newCitiesLS.split(","))
    }
  }

  componentDidUpdate() {
    //add to LocalStorage
    localStorage.setItem('cities', this.props.cities)
    localStorage.setItem('newCities', this.props.newCities)
  }


  render() {
    
    const { cities, deleteCity } = this.props
    
    return (
      <BrowserRouter>
        <div className="App">
            <h1 onClick={()=>this.addCities()}>Weather app</h1>
            <Route path="/" exact render={() => {
              return(
                 <div className="weather-container">
              { cities.map((city) => {
                  return(
                    <WeatherItem city={city} key={city} deleteCity={deleteCity}/> 
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

const mapStateToProps = (state) => ({
  cities: state.cities,
  newCities: state.newCities
})

const mapDispatchToProps = dispatch => ({
  setCities: (cities) => dispatch(setCities(cities)),
  deleteCity: (city) => dispatch(deleteCity(city)),
  addCityCard: (city) => dispatch(addCityCard(city)),
  addNewCity: (city) => dispatch(addNewCity(city)),
  setNewCities: (cities) => dispatch(setNewCities(cities)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);