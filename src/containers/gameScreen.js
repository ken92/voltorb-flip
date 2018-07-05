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

	pencilModeToggle = () => {
		if (this.props.pencil_mode)
			this.props.pencilModeOff();
		else
			this.props.pencilModeOn();
	}

	render() {
		const giveUpButton = (
			<button className="btn btn-danger" onClick={this.giveUp}>Give Up</button>
		);
		const pencilModeButton = (
			<button className={`btn btn-${this.props.pencil_mode? "primary" : "secondary"}`} onClick={this.pencilModeToggle}>Pencil Mode {this.props.pencil_mode? "On" : "Off"}</button>
		);
		return (
			<GameScreenDisplay
				giveUpButton={giveUpButton}
				pencilModeButton={pencilModeButton}
			>
				<Board />
			</GameScreenDisplay>
		);
	}
}

GameScreen.propTypes = {
	pencilModeOn: PropTypes.func.isRequired,
	pencilModeOff: PropTypes.func.isRequired,
	flipAllTiles: PropTypes.func.isRequired,
	game_running: PropTypes.bool.isRequired,
	pencil_mode: PropTypes.bool.isRequired
};

GameScreen.defaultProps = {
	game_running: false,
	pencil_mode: false
};


function mapStateToProps(state) {
	return {
		game_running: state.game.game_running,
		pencil_mode: state.game.pencil_mode
	};
}

export default connect(mapStateToProps, actions)(GameScreen);
