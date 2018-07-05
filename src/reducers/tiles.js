// #### action types ####
export const SET_TILES = 'TILES_SET_TILES';
export const FLIP_TILE = 'TILES_FLIP_TILE';
export const FLIP_ALL_TILES = 'TILES_FLIP_ALL_TILES';


// #### action creators ####
export const setTiles = payload => ({type: SET_TILES, payload});
export const flipTile = payload => ({type: FLIP_TILE, payload});
export const flipAllTiles = payload => ({type: FLIP_ALL_TILES, payload});
export const actions = {
	setTiles,
	flipTile,
	flipAllTiles
};


// tile key structure: x.y
// e.g., bottom left tile would be 0.0
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

		case FLIP_ALL_TILES:
			newState = {...state};
			let keys = Object.keys(newState);
			for (let i = 0; i < keys.length; i++) {
				newState[keys[i]].flipped = true;
			}
			return newState;

		default:
			return state;
	}
}
