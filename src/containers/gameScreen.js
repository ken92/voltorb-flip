import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../reducers/actions';
import GameScreenDisplay from '../components/gameScreen';
import Board from './board';

class GameScreen extends Component {
	render() {
		const giveUpButton = (
			<button className="btn btn-primary">Give Up</button>
		);
		return (
			<GameScreenDisplay
				giveUpButton={giveUpButton}
			>
				<Board />
			</GameScreenDisplay>
		);
	}
}

GameScreen.propTypes = {
	game_running: PropTypes.bool.isRequired
};

GameScreen.defaultProps = {
	game_running: false
};


function mapStateToProps(state) {
	return {
		game_running: state.game.game_running
	};
}

export default connect(mapStateToProps, actions)(GameScreen);
