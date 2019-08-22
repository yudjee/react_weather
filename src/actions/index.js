export const setCities = cities => ({
  type: 'SET_CITIES',
  payload: cities
});

export const deleteCity = city => ({
  type: 'DELETE_CITY',
  payload: city
});

export const addCityCard = city => ({
  type: 'ADD_CITY_CARD',
  payload: city
});

export const addNewCity = city => ({
  type: 'ADD_NEW_CITY',
  payload: city
});

export const setNewCities = cities => ({
  type: 'SET_NEW_CITIES',
  payload: cities
});