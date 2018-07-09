import React from 'react';
import PropTypes from 'prop-types';
import * as vars from '../vars';

const selectedButtonClass = "btn-default";

const PencilModeOptions = (props) => {
	const getVoltorbButtonClassName = () => {
		return `btn col-xs-3 ${props.pencil_mode === vars.VOLTORB? selectedButtonClass : 'btn-danger'}`;
	};
	const getNumberButtonClassName = (selected) => {
		return `btn col-xs-2 ${selected? selectedButtonClass : 'btn-primary'}`;
	};

	return (
		<div className="container">
			<div className="row">
				<button className={getVoltorbButtonClassName()} onClick={props.voltorbClick}>
					V
				</button>
				<button className={getNumberButtonClassName(props.pencil_mode === vars.ONE)} onClick={props.oneClick}>
					1
				</button>
				<button className={getNumberButtonClassName(props.pencil_mode === vars.TWO)} onClick={props.twoClick}>
					2
				</button>
				<button className={getNumberButtonClassName(props.pencil_mode === vars.THREE)} onClick={props.threeClick}>
					3
				</button>
			</div>
		</div>
	);
}

PencilModeOptions.propTypes = {
	voltorbClick: PropTypes.func.isRequired,
	oneClick: PropTypes.func.isRequired,
	twoClick: PropTypes.func.isRequired,
	threeClick: PropTypes.func.isRequired,
	pencil_mode: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.string
	]).isRequired
};

PencilModeOptions.defaultProps = {};

export default PencilModeOptions;
