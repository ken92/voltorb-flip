import React from 'react';
import PropTypes from 'prop-types';
import * as vars from '../vars';

const getContents = props => {
	var contents = props.flipped || props.header? props.contents : "";
	if (contents === vars.VOLTORB)
		contents = "";
	return contents;
};

const getNumVoltorbs = props => {
	if (!props.header)
		return null;
	return `# V: ${props.numVoltorbs}`;
};

const getClassName = props => {
	if (props.header)
		return "header";
	else if (props.flipped && props.contents === vars.VOLTORB)
		return "voltorb";
	else
		return "red";
};

const Tile = props => {
	const contents = getContents(props);
	const numVoltorbs = getNumVoltorbs(props);
	const className = `${props.className} tile vcenter ${getClassName(props)}`;
	return (
		<div style={props.style} className={className} onClick={props.flipped || !props.onClick? null : props.onClick}>
			<p>{contents}</p>
			<p>{numVoltorbs}</p>
		</div>
	);
}

Tile.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	header: PropTypes.bool.isRequired,
	flipped: PropTypes.bool.isRequired,
	onClick: PropTypes.func,
	contents: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired
};

Tile.defaultProps = {
	header: false,
	flipped: false
};

export default Tile;
