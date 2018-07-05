import {actions as gameActions} from './game';
import {actions as tileActions} from './tiles';
import {actions as boardHeadersActions} from './board_headers';

export default {
	...gameActions,
	...tileActions,
	...boardHeadersActions
};
