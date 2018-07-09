import React from 'react';
import PropTypes from 'prop-types';

const GameOverScreen = (props) => {
	const backToMenuButton = (
		<button className="btn btn-danger" onClick={props.backToMenu}>Back To Menu</button>
	);
	const playAgainButton = (
		<button className="btn btn-success" onClick={props.playAgain}>Play Again</button>
	);

	return (
		<div className="container innerContainer">
			<h2>Game Over!</h2>
			{props.children}
			{playAgainButton}
			{backToMenuButton}
		</div>
	);
}

GameOverScreen.propTypes = {
	children: PropTypes.any.isRequired,
	backToMenu: PropTypes.func.isRequired,
	playAgain: PropTypes.func.isRequired
};

GameOverScreen.defaultProps = {};

export default GameOverScreen;
