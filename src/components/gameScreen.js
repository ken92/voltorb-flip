import React from 'react';
import PropTypes from 'prop-types';
import PencilModeOptions from '../containers/pencilModeOptions';

const GameScreen = (props) => {
	const pencilModeButton = (
		<button className={`btn btn-${props.pencil_mode? "primary" : "secondary"}`} onClick={props.pencilModeToggle}>Pencil Mode {props.pencil_mode? "On" : "Off"}</button>
	);
	const giveUpButton = (
		<button className="btn btn-danger" onClick={props.giveUp}>Give Up</button>
	);

	return (
		<div className="container innerContainer">
			<h2>Level {props.level}</h2>
			{props.children}
			{pencilModeButton}
			{giveUpButton}
			{props.pencil_mode && <PencilModeOptions />}
		</div>
	);
}

GameScreen.propTypes = {
	pencilModeToggle: PropTypes.func.isRequired,
	giveUp: PropTypes.func.isRequired,

	level: PropTypes.number.isRequired,
	children: PropTypes.any.isRequired,
	pencil_mode: PropTypes.bool.isRequired
};

GameScreen.defaultProps = {};

export default GameScreen;
