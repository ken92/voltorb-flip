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

const getRow = (rowNum, col1 = '', col2 = '', col3 = '') => {
	return (
		<div className="row tileRow" style={{margin: 0}} key={`row${rowNum}`}>
			<div className="col-xs-2 tileCol left">
				{col1}
			</div>
			<div className="col-xs-6 tileCol">
				{col2}
			</div>
			<div className="col-xs-2 tileCol right">
				{col3}
			</div>
		</div>
	);
};
const getRowOne = props => {
	if (props.flipped)
		return getRow(1, '', '', '');
	return getRow(1, props.pencilVoltorb? 'V' : '', '', props.pencilOne? '1' : '');
};
const getRowTwo = props => {
	return getRow(2, '', getContents(props), '');
};
const getRowThree = props => {
	if (props.flipped)
		return getRow(3, '', '', '');
	return getRow(3, props.pencilTwo? '2' : '', '', props.pencilThree? '3' : '');
};

const getStyledTileContents = props => {
	if (props.header) {
		return (
			<div>
				<p>{getContents(props)}</p>
				<p>{getNumVoltorbs(props)}</p>
			</div>
		);
	} else {
		const contentsArray = [];
		contentsArray.push(getRowOne(props));
		contentsArray.push(getRowTwo(props));
		contentsArray.push(getRowThree(props));
		return contentsArray;
	}
};

const Tile = props => {
	const contents = getStyledTileContents(props);
	const className = `${props.className || ''} tile vcenter ${getClassName(props)}`;
	return (
		<div style={props.style} className={className} onClick={props.flipped || !props.onClick? null : props.onClick}>
			{contents}
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
	]).isRequired,

	pencilVoltorb: PropTypes.bool.isRequired,
	pencilOne: PropTypes.bool.isRequired,
	pencilTwo: PropTypes.bool.isRequired,
	pencilThree: PropTypes.bool.isRequired
};

Tile.defaultProps = {
	header: false,
	flipped: false,

	pencilVoltorb: false,
	pencilOne: false,
	pencilTwo: false,
	pencilThree: false
};

export default Tile;
