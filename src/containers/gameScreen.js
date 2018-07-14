import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../reducers/actions';
import GameScreenDisplay from '../components/gameScreen';
import Board from './board';
import Scoreboard from './scoreboard';
import GameWinScreen from '../components/gameWinScreen';
import GameOverScreen from '../components/gameOverScreen';
import * as vars from '../vars';
import createNewBoardHoc from '../hocs/createNewBoardHoc';

class GameScreen extends Component {
	playAgain = () => {
		this.props.hideGameOverScreen();
		this.props.createNewBoard();
	}

	nextLevel = () => {
		this.props.hideGameWinScreen();
		this.props.createNewBoard();
	}

	backToMenu = () => {
		this.props.hideGameOverScreen();
		this.props.showStartScreen();
	}

	giveUp = () => {
		this.props.flipAllTiles();
		this.props.showGameOverScreen();
		this.props.stopGame();
	}

	pencilModeToggle = () => {
		if (this.props.pencil_mode)
			this.props.pencilModeOff();
		else
			this.props.pencilModeOn(vars.VOLTORB);
	}

	render() {
		const scoreboard = <Scoreboard />;
		const board = <Board />;

		if (this.props.show_game_over_screen) {
			return (
				<GameOverScreen
					backToMenu={this.backToMenu}
					playAgain={this.playAgain}
				>
					{scoreboard}
					{board}
				</GameOverScreen>
			);
		}

		else if (this.props.show_game_win_screen) {
			return (
				<GameWinScreen
					nextLevel={this.nextLevel}
				>
					{scoreboard}
					{board}
				</GameWinScreen>
			);
		}

		return (
			<GameScreenDisplay
				giveUp={this.giveUp}
				pencilModeToggle={this.pencilModeToggle}
				pencil_mode={this.props.pencil_mode}
				level={this.props.level}
			>
				{scoreboard}
				{board}
			</GameScreenDisplay>
		);
	}
}

GameScreen.propTypes = {
	pencilModeOn: PropTypes.func.isRequired,
	pencilModeOff: PropTypes.func.isRequired,
	flipAllTiles: PropTypes.func.isRequired,
	hideGameWinScreen: PropTypes.func.isRequired,
	hideGameOverScreen: PropTypes.func.isRequired,
	showGameOverScreen: PropTypes.func.isRequired,
	showStartScreen: PropTypes.func.isRequired,
	startGame: PropTypes.func.isRequired,
	createNewBoard: PropTypes.func.isRequired,

	level: PropTypes.number.isRequired,
	game_running: PropTypes.bool.isRequired,
	show_game_over_screen: PropTypes.bool.isRequired,
	show_game_win_screen: PropTypes.bool.isRequired,
	pencil_mode: PropTypes.bool.isRequired
};

GameScreen.defaultProps = {
	show_game_over_screen: false,
	show_game_win_screen: false,
	game_running: false,
	pencil_mode: false
};


function mapStateToProps(state) {
	return {
		level: state.game.level,
		show_game_win_screen: state.game.show_game_win_screen,
		show_game_over_screen: state.game.show_game_over_screen,
		game_running: state.game.game_running,
		pencil_mode: !!(state.game.pencil_mode)
	};
}

export default connect(mapStateToProps, actions)(createNewBoardHoc(GameScreen));
