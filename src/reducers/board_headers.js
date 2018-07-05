// #### action types ####
export const SET_HEADERS = 'BOARD_HEADERS_SET_HEADERS';


// #### action creators ####
export const setHeaders = payload => ({type: SET_HEADERS, payload});
export const actions = {
	setHeaders
};


// header tile key structure: #xh; #yh
// e.g., row 0's header would be 0yh, column 0's header would be 0xh
const INITIAL_STATE = {};


export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
		case SET_HEADERS:
			return action.payload;

		default:
			return state;
	}
}
