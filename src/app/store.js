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

// Reject non-2xx HTTP responses
function assertOK(response) {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.statusText);
  }
  return response;
}

function getJSON(response) {
  return response.json();
}

// Grab JSON from `/weather/:zip` endpoint
function fetchWeather(zip) {
  return fetch('/weather/' + zip)
    .then(assertOK)
    .then(getJSON);
}

// Get weather and dispatch appropriate message to store
function updateWeather(id, zip) {
  fetchWeather(zip)
    .then(dispatchWeatherChange.bind(null, id))
    .catch(dispatchWeatherFail.bind(null, id));
}

// Both places should have the same logic for validating ZIP code and fetching
// weather, so partially apply this function with their IDs.
function placeReducer(id, state, action) {
  console.log('ACTION', action);
  // Return an empty place if the state hasn't been initialized for this place
  if (state === undefined) {
    return emptyPlace;
  // Weather fetched successfully
  } else if (action.type === 'WEATHER_CHANGE_' + id) {
    return merge(state, {
      weatherOk: true,
      weather: action.value,
      message: ''
    });
  // Weather fetch failed
  } else if (action.type === 'WEATHER_FAIL_' + id) {
    return merge(state, {
      weatherOk: false,
      weather: null,
      message: 'Failed to retrieve weather'
    });
  // User typed new ZIP code
  } else if (action.type === 'ZIP_CHANGE_' + id) {
    const zip = action.value;
    const ok = validators.zip(zip);
    // ZIP is formatted correctly
    if (ok) {
      updateWeather(id, zip);
      return merge(state, {
        zip: zip,
        zipOk: true,
        weather: null,
        weatherOk: true,
        message: ''
      });
    // ZIP is not formatted correctly
    } else {
      return merge(state, {
        zip: zip,
        zipOk: false,
        weather: null,
        weatherOk: true,
        message: 'Invalid ZIP code'
      });
    }
  // Return the current state for unknown messages, which is important since
  // Redux seems to throw some internal messages you shouldn't know about at
  // your reducers :\
  } else {
    return state;
  }
}

// Both place1 and place2 have the same exact state logic, so just reuse the
// placeReducer partially applied with '1' or '2' for the appropriate IDs
const reducer =
  Redux.combineReducers({
    place1: placeReducer.bind(null, '1'),
    place2: placeReducer.bind(null, '2'),
  });

const store = Redux.createStore(reducer, initialState);

// JSHint was incorrectly complaining about using store before it was defined,
// so I had to move these functions beneath store's definition.

function dispatchWeatherChange(id, x) {
  store.dispatch({
    type: 'WEATHER_CHANGE_' + id,
    value: x
  });
}

function dispatchWeatherFail(id, e) {
  store.dispatch({
    type: 'WEATHER_FAIL_' + id,
    value: e.message
  });
}

exports.store = store;
