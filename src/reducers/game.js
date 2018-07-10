import * as vars from '../vars';

// #### action types ####
export const SET_SHOW_START_SCREEN = 'GAME_SET_SHOW_START_SCREEN';
export const SET_GAME_RUNNING = 'GAME_SET_GAME_RUNNING';
export const SET_SHOW_GAME_OVER_SCREEN = 'GAME_SET_SHOW_GAME_OVER_SCREEN';
export const SET_SHOW_GAME_WIN_SCREEN = 'GAME_SET_SHOW_GAME_WIN_SCREEN';

export const UPDATE_NUM_ROWS = 'GAME_UPDATE_NUM_ROWS';
export const UPDATE_NUM_COLS = 'GAME_UPDATE_NUM_COLS';

export const SET_NUM_VALUE_TILES_LEFT = 'GAME_SET_NUM_VALUE_TILES_LEFT';
export const SET_LEVEL = 'GAME_SET_LEVEL';
export const SET_DIFFICULTY = 'GAME_SET_DIFFICULTY';

export const SET_PENCIL_MODE = 'GAME_SET_PENCIL_MODE';


// #### action creators ####
export const showStartScreen = () => ({type: SET_SHOW_START_SCREEN, payload: true});
export const hideStartScreen = () => ({type: SET_SHOW_START_SCREEN, payload: false});

export const showGameOverScreen = () => ({type: SET_SHOW_GAME_OVER_SCREEN, payload: true});
export const hideGameOverScreen = () => ({type: SET_SHOW_GAME_OVER_SCREEN, payload: false});

export const showGameWinScreen = () => ({type: SET_SHOW_GAME_WIN_SCREEN, payload: true});
export const hideGameWinScreen = () => ({type: SET_SHOW_GAME_WIN_SCREEN, payload: false});

export const startGame = () => ({type: SET_GAME_RUNNING, payload: true});
export const stopGame = () => ({type: SET_GAME_RUNNING, payload: false});

export const updateNumRows = payload => ({type: UPDATE_NUM_ROWS, payload});
export const updateNumCols = payload => ({type: UPDATE_NUM_COLS, payload});

export const setNumValueTilesLeft = payload => ({type: SET_NUM_VALUE_TILES_LEFT, payload});
export const setLevel = payload => ({type: SET_LEVEL, payload});
export const setDifficulty = payload => ({type: SET_DIFFICULTY, payload});

export const pencilModeOn = mode => ({type: SET_PENCIL_MODE, payload: mode});
export const pencilModeOff = () => ({type: SET_PENCIL_MODE, payload: false});
export const actions = {
	showStartScreen,
	hideStartScreen,

	showGameOverScreen,
	hideGameOverScreen,

	showGameWinScreen,
	hideGameWinScreen,

	startGame,
	stopGame,

	updateNumRows,
	updateNumCols,

	setNumValueTilesLeft,
	setLevel,
	setDifficulty,

	pencilModeOn,
	pencilModeOff
};


const INITIAL_STATE = {
	show_start_screen: true,
	show_game_over_screen: false,
	show_game_win_screen: false,

	game_running: false,
	difficulty_setting: vars.EASY_MODE,

	level: 1,
	num_rows: 3,
	num_cols: 3,

	num_value_tiles_left: 0,

	pencil_mode: false
};


export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
		case SET_SHOW_START_SCREEN:
			return {...state, show_start_screen: action.payload};

		case SET_SHOW_GAME_OVER_SCREEN:
			return {...state, show_game_over_screen: action.payload};

		case SET_SHOW_GAME_WIN_SCREEN:
			return {...state, show_game_win_screen: action.payload};

		case SET_GAME_RUNNING:
			return {...state, game_running: action.payload, game_over: false};

		case UPDATE_NUM_ROWS:
			if (state.game_running)
				return state;
			return {...state, num_rows: action.payload};
		case UPDATE_NUM_COLS:
			if (state.game_running)
				return state;
			return {...state, num_cols: action.payload};

		case SET_NUM_VALUE_TILES_LEFT:
			return {...state, num_value_tiles_left: action.payload};

		case SET_PENCIL_MODE:
			return {...state, pencil_mode: action.payload};

		case SET_LEVEL:
			return {...state, level: action.payload};

		case SET_DIFFICULTY:
			return {...state, difficulty_setting: action.payload};

		default:
			return state;
	}
}
