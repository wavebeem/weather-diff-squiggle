const Redux = require('redux');
const merge = require('./merge').merge;
const validators = require('../validators');

const emptyPlace = {
  zip: '',
  zipOk: false,
  zipMessage: '',
  weather: null
};

const initialState = {
  place1: emptyPlace,
  place2: emptyPlace
};

// Both places should have the same logic for validating ZIP code and fetching
// weather, so partially apply this function with their IDs.
function placeReducer(id, state, action) {
  if (state === undefined) {
    return emptyPlace;
  } else if (action.type === 'WEATHER_CHANGE_' + id) {
    return merge(state, {weather: action.value});
  } else if (action.type === 'ZIP_CHANGE_' + id) {
    const zip = action.value;
    const result = validators.zip(action.value);
    const zipOk = result[0];
    const zipMessage = zipOk ? '' : result[1];
    // TODO: Do something useful if the weather request fails.
    if (zipOk) {
      fetch('/weather/' + zip)
        .then(x => x.json())
        .then(x =>
          store.dispatch({
            type: 'WEATHER_CHANGE_' + id,
            value: x
          })
        );
    }
    return merge(state, {
      zip: zip,
      zipOk: zipOk,
      zipMessage: zipMessage,
      weather: null
    });
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
