// #### action types ####
export const SET_TILES = 'TILES_SET_TILES';
export const FLIP_TILE = 'TILES_FLIP_TILE';
export const FLIP_ALL_TILES = 'TILES_FLIP_ALL_TILES';

export const TOGGLE_PENCIL_ONE = 'TILES_TOGGLE_PENCIL_ONE';
export const TOGGLE_PENCIL_TWO = 'TILES_TOGGLE_PENCIL_TWO';
export const TOGGLE_PENCIL_THREE = 'TILES_TOGGLE_PENCIL_THREE';
export const TOGGLE_PENCIL_VOLTORB = 'TILES_TOGGLE_PENCIL_VOLTORB';


// #### action creators ####
export const setTiles = payload => ({type: SET_TILES, payload});
export const flipTile = payload => ({type: FLIP_TILE, payload});
export const flipAllTiles = payload => ({type: FLIP_ALL_TILES, payload});

export const toggleTilePencilOne = tileKey => ({type: TOGGLE_PENCIL_ONE, payload: {tileKey, pencilKey: 'pencilOne'}});
export const toggleTilePencilTwo = tileKey => ({type: TOGGLE_PENCIL_TWO, payload: {tileKey, pencilKey: 'pencilTwo'}});
export const toggleTilePencilThree = tileKey => ({type: TOGGLE_PENCIL_THREE, payload: {tileKey, pencilKey: 'pencilThree'}});
export const toggleTilePencilVoltorb = tileKey => ({type: TOGGLE_PENCIL_VOLTORB, payload: {tileKey, pencilKey: 'pencilVoltorb'}});
export const actions = {
	setTiles,
	flipTile,
	flipAllTiles,

	toggleTilePencilOne,
	toggleTilePencilTwo,
	toggleTilePencilThree,
	toggleTilePencilVoltorb
};


// tile key structure: x.y
// e.g., bottom left tile would be 0.0
const INITIAL_STATE = {};


export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
		case SET_TILES:
			return action.payload;

		case TOGGLE_PENCIL_ONE:
		case TOGGLE_PENCIL_TWO:
		case TOGGLE_PENCIL_THREE:
		case TOGGLE_PENCIL_VOLTORB:
			let newState = {...state};
			let tileKey = action.payload.tileKey;
			let pencilKey = action.payload.pencilKey;
			newState[tileKey][pencilKey] = !newState[tileKey][pencilKey];
			return newState;

		case FLIP_TILE:
			newState = {...state};
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
