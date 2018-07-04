import React from 'react';
import PropTypes from 'prop-types';
import * as vars from '../vars';

const getContents = props => {
	var contents = props.flipped? props.contents : "";
	if (contents === vars.VOLTORB)
		contents = "";
	return contents;
};

const getClassName = props => {
	if (props.flipped && props.contents === vars.VOLTORB)
		return "voltorb";
	else
		return "red";
};

const Tile = props => {
	const contents = getContents(props);
	const className = `${props.className} vcenter ${getClassName(props)}`;
	return (
		<div style={props.style} className={className} onClick={props.flipped? null : props.onClick}>
			{contents}
		</div>
	);
}

Tile.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	flipped: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	contents: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired
};

Tile.defaultProps = {
	flipped: false
};

export default Tile;
