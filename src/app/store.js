const Redux = require('redux');
const m = require('mithril');
const merge = require('./merge').merge;

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
  console.log('[PLACE_' + id + ']', state, '/', action);
  if (state === undefined) {
    console.log('REVERTING TO INITIAL VALUE for id', id);
    return emptyPlace;
  } else if (action.type === 'ZIP_CHANGE_' + id) {
    console.log('UPDATING ZIP_CHANGE_' + id);
    // TODO: Fetch weather data and dispatch WEATHER_UPDATE for it.
    return {zip: action.value, weather: null};
  } else {
    console.log('UNRECOGNIZED : ' + action.type);
    console.log('EXPECTED     : ZIP_CHANGE_' + id);
    return state;
  }
}

const reducer =
  Redux.combineReducers({
    place1: placeReducer.bind(null, '1'),
    place2: placeReducer.bind(null, '2'),
  });

const store = Redux.createStore(reducer, initialState);

// Tell Mithril that a computation has happened when the store has a new state.
store.subscribe(() => {
  console.log('STATE:', JSON.stringify(store.getState()));
  m.redraw.strategy('all');
  m.redraw();
  // m.startComputation();
  // m.endComputation();
});

exports.store = store;
