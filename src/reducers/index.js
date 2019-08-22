const initState = {
	cities: ['London', 'Kharkiv', 'Istanbul'],
	newCities: ['London', 'Kharkiv', 'Istanbul', 'Tokyo', 'New York', 'Berlin', 'Marino']
}

export default (state = initState, action) => {
	switch(action.type) {
    
    case 'SET_CITIES':
      return {
        ...state,
        cities: action.payload
      };

    case 'DELETE_CITY':
      return {
        ...state,
        cities: state.cities.filter(city => city !== action.payload)
      };

    case 'ADD_CITY_CARD':
      return {
        ...state,
        cities: [...state.cities, action.payload]
      };

    case 'ADD_NEW_CITY':
      return {
        ...state,
        newCities: [...state.newCities, action.payload]
      };

    case 'SET_NEW_CITIES':
      return {
        ...state,
        newCities: action.payload
      }; 
      

	default:
		return state
	}
} 
