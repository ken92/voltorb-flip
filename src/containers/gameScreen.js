import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../reducers/actions';
import GameScreenDisplay from '../components/gameScreen';
import Board from './board';

class GameScreen extends Component {
	giveUp = () => {
		this.props.flipAllTiles();
	}

	render() {
		const giveUpButton = (
			<button className="btn btn-primary" onClick={this.giveUp}>Give Up</button>
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
	flipAllTiles: PropTypes.func.isRequired,
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
