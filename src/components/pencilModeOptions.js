import React from 'react';
import PropTypes from 'prop-types';

const PencilModeOptions = (props) => {
	return (
		<div className="container">
			<div className="row">
				<button className="btn btn-danger col-xs-3" onClick={props.voltorbClick}>
					V
				</button>
				<button className="btn btn-primary col-xs-2" onClick={props.oneClick}>
					1
				</button>
				<button className="btn btn-primary col-xs-2" onClick={props.twoClick}>
					2
				</button>
				<button className="btn btn-primary col-xs-2" onClick={props.threeClick}>
					3
				</button>
				<button className="btn btn-primary col-xs-2" onClick={props.fourClick}>
					4
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
	fourClick: PropTypes.func.isRequired
};

PencilModeOptions.defaultProps = {};

export default PencilModeOptions;
