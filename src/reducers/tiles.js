// #### action types ####
export const SET_TILES = 'TILES_SET_TILES';


// #### action creators ####
export const setTiles = payload => ({type: SET_TILES, payload});
export const actions = {
	setTiles
};


// tile key structure: x.y
// e.g., top left tile would be 0.0
const INITIAL_STATE = {};


export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
		case SET_TILES:
			return action.payload;

		default:
			return state;
	}
}
