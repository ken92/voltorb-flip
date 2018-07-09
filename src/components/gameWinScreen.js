import React from 'react';
import PropTypes from 'prop-types';

const GameWinScreen = (props) => {
	const nextLevelButton = (
		<button className="btn btn-success" onClick={props.nextLevel}>Next Level</button>
	);

	return (
		<div className="container innerContainer">
			<h2>Great job!</h2>
			{props.children}
			{nextLevelButton}
		</div>
	);
}

GameWinScreen.propTypes = {
	children: PropTypes.any.isRequired,
	nextLevel: PropTypes.func.isRequired
};

GameWinScreen.defaultProps = {};

export default GameWinScreen;
