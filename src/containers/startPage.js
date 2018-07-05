import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import StartPageDisplay from '../components/startPage';
import actions from '../reducers/actions';
import {createNewTilesBoard} from '../util';

class StartPage extends Component {
	startGame = async () => {
		const {tiles, headers, numValueTiles} = await createNewTilesBoard(this.props.num_rows, this.props.num_cols, this.props.difficulty_setting);
		this.props.setTiles(tiles);
		this.props.setHeaders(headers);
		this.props.setNumValueTilesLeft(numValueTiles);
		this.props.hideStartScreen();
		this.props.startGame();
		console.log(tiles);
		console.log(headers);
		console.log(numValueTiles);
	}

	render() {
		const rowsInput = (
			<input
				min={3}
				max={20}
				onChange={(e) => {this.props.updateNumRows(parseInt(e.target.value, 10))}}
				value={this.props.num_rows}
			/>
		);

		const colsInput = (
			<input
				min={3}
				max={20}
				onChange={(e) => {this.props.updateNumCols(parseInt(e.target.value, 10))}}
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
	difficulty_setting: PropTypes.string.isRequired,
	num_rows: PropTypes.number.isRequired,
	num_cols: PropTypes.number.isRequired,

	setHeaders: PropTypes.func.isRequired,
	setTiles: PropTypes.func.isRequired,
	setNumValueTilesLeft: PropTypes.func.isRequired,
	startGame: PropTypes.func.isRequired,
	hideStartScreen: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return {
		difficulty_setting: state.game.difficulty_setting,
		num_rows: state.game.num_rows,
		num_cols: state.game.num_cols
	};
}

export default connect(mapStateToProps, actions)(StartPage);

