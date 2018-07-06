import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../reducers/actions';
import GameScreenDisplay from '../components/gameScreen';
import Board from './board';
import * as vars from '../vars';

class GameScreen extends Component {
	giveUp = () => {
		this.props.flipAllTiles();
	}

	pencilModeToggle = () => {
		if (this.props.pencil_mode)
			this.props.pencilModeOff();
		else
			this.props.pencilModeOn(vars.VOLTORB);
	}

	render() {
		return (
			<GameScreenDisplay
				giveUp={this.giveUp}
				pencilModeToggle={this.pencilModeToggle}
				pencil_mode={this.props.pencil_mode}
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
		pencil_mode: !!(state.game.pencil_mode)
	};
}

export default connect(mapStateToProps, actions)(GameScreen);
