import {actions as gameActions} from './game';
import {actions as tileActions} from './tiles';

export default {
	...gameActions,
	...tileActions
};
