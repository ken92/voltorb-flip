import {combineReducers} from 'redux';
 import GameReducer from './game';
 import TilesReducer from './tiles';
 import BoardHeadersReducer from './board_headers';

const rootReducer = combineReducers({
	game: GameReducer,
	tiles: TilesReducer,
	board_headers: BoardHeadersReducer
});

export default rootReducer;
