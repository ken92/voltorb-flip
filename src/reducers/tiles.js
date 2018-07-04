// #### action types ####
export const SET_TILES = 'TILES_SET_TILES';
export const FLIP_TILE = 'TILES_FLIP_TILE';


// #### action creators ####
export const setTiles = payload => ({type: SET_TILES, payload});
export const flipTile = payload => ({type: FLIP_TILE, payload});
export const actions = {
	setTiles,
	flipTile
};


// tile key structure: x.y
// e.g., top left tile would be 0.0
const INITIAL_STATE = {};


export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
		case SET_TILES:
			return action.payload;

		case FLIP_TILE:
			let newState = {...state};
			let key = action.payload;
			newState[key].flipped = true;
			return newState;

		default:
			return state;
	}
}
