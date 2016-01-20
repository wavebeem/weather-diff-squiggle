const Redux = require('redux');
const merge = require('./merge').merge;
const validators = require('../validators');

const emptyPlace = {
  zip: '',
  zipOk: false,
  weather: null,
  weatherOk: true
};

const initialState = {
  place1: emptyPlace,
  place2: emptyPlace
};

function assertOK(response) {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.statusText);
  }
  return response;
}

function getJSON(response) {
  return response.json();
}

function fetchWeather(zip) {
  return fetch('/weather/' + zip)
    .then(assertOK)
    .then(getJSON);
}

function dispatchWeatherChange(id, x) {
  store.dispatch({
    type: 'WEATHER_CHANGE_' + id,
    value: x
  })
}

function dispatchWeatherFail(id, e) {
  store.dispatch({
    type: 'WEATHER_FAIL_' + id,
    value: e.message
  });
}

function updateWeather(id, zip) {
  fetchWeather(zip)
    .then(dispatchWeatherChange.bind(null, id))
    .catch(dispatchWeatherFail.bind(null, id));
}

// Both places should have the same logic for validating ZIP code and fetching
// weather, so partially apply this function with their IDs.
function placeReducer(id, state, action) {
  if (state === undefined) {
    return emptyPlace;
  } else if (action.type === 'WEATHER_CHANGE_' + id) {
    return merge(state, {
      weatherOk: true,
      weather: action.value,
      message: ''
    });
  } else if (action.type === 'WEATHER_FAIL_' + id) {
    return merge(state, {
      weatherOk: false,
      weather: null,
      message: 'Failed to retrieve weather'
    });
  } else if (action.type === 'ZIP_CHANGE_' + id) {
    const zip = action.value;
    const ok = validators.zip(zip);
    if (ok) {
      updateWeather(id, zip);
      return merge(state, {
        zip: zip,
        zipOk: true,
        weather: null,
        weatherOk: true,
        message: ''
      });
    } else {
      return merge(state, {
        zip: zip,
        zipOk: false,
        weather: null,
        weatherOk: true,
        message: 'Invalid ZIP code'
      });
    }
  } else {
    return state;
  }
}

const reducer =
  Redux.combineReducers({
    place1: placeReducer.bind(null, '1'),
    place2: placeReducer.bind(null, '2'),
  });

const store = Redux.createStore(reducer, initialState);

exports.store = store;
