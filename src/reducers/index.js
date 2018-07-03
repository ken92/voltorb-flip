import {combineReducers} from 'redux';
 import GameReducer from './game';
 import TilesReducer from './tiles';

const rootReducer = combineReducers({
	game: GameReducer,
	tiles: TilesReducer
});

export default rootReducer;
