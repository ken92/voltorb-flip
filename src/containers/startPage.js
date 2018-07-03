import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import StartPageDisplay from '../components/startPage';
import actions from '../reducers/actions';
import {createNewTilesBoard} from '../util';

class StartPage extends Component {
	startGame = async () => {
		const newBoard = await createNewTilesBoard(this.props.num_rows, this.props.num_cols, this.props.difficultySetting);
		this.props.setTiles(newBoard);
		this.props.hideStartScreen();
		this.props.startGame();
		console.log(newBoard);
	}

	render() {
		const rowsInput = (
			<input
				onChange={this.props.updateNumRows}
				value={this.props.num_rows}
			/>
		);

		const colsInput = (
			<input
				onChange={this.props.updateNumCols}
				value={this.props.num_cols}
			/>
		);

		return (
			<StartPageDisplay
				rowsInput={rowsInput}
				colsInput={colsInput}
				startButtonClick={this.startGame}
			/>
		);
	}
}

StartPage.propTypes = {
	difficultySetting: PropTypes.string.isRequired,
	num_rows: PropTypes.number.isRequired,
	num_cols: PropTypes.number.isRequired,

	startGame: PropTypes.func.isRequired,
	hideStartScreen: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return {
		difficultySetting: state.game.difficultySetting,
		num_rows: state.game.num_rows,
		num_cols: state.game.num_cols
	};
}

export default connect(mapStateToProps, actions)(StartPage);

