import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import StartPageDisplay from '../components/startPage';
import actions from '../reducers/actions';
import createNewBoardHoc from '../hocs/createNewBoardHoc';
import * as vars from '../vars';

class StartPage extends Component {
	startGame = async () => {
		this.props.hideStartScreen();
		this.props.createNewBoard();
	}

	fixRowColValues = (num) => {
		if (!num)
			return vars.MIN_ROW_OR_COL;
		return Math.min(vars.MAX_ROW_OR_COL, Math.max(num, vars.MIN_ROW_OR_COL));
	}

	getNewRowOrCol = e => {
		return parseInt(e.target.value, 10) || 0;
	}
	onRowChange = e => {
		this.props.updateNumRows(this.getNewRowOrCol(e));
	}
	onColChange = e => {
		this.props.updateNumCols(this.getNewRowOrCol(e));
	}
	onDifficultyChange = e => {
		this.props.setDifficulty(e.target.value);
	}

	render() {
		const rowsInput = (
			<input
				min={vars.MIN_ROW_OR_COL}
				max={vars.MAX_ROW_OR_COL}
				onChange={this.onRowChange}
				value={this.props.num_rows}
				onBlur={() => {this.props.updateNumRows(this.fixRowColValues(this.props.num_rows))}}
				name="row"
			/>
		);

		const colsInput = (
			<input
				min={vars.MIN_ROW_OR_COL}
				max={vars.MAX_ROW_OR_COL}
				onChange={this.onColChange}
				value={this.props.num_cols}
				onBlur={() => {this.props.updateNumCols(this.fixRowColValues(this.props.num_cols))}}
				name="col"
			/>
		);

		const difficultyInput = (
			<select value={this.props.difficulty_setting} name="difficulty" onChange={this.onDifficultyChange}>
				<option value={vars.EASY_MODE}>Easy</option>
				<option value={vars.MEDIUM_MODE}>Medium</option>
				<option value={vars.HARD_MODE}>Hard</option>
			</select>
		);

		return (
			<StartPageDisplay
				difficultyInput={difficultyInput}
				rowsInput={rowsInput}
				colsInput={colsInput}
				startButtonClick={this.startGame}
			/>
		);
	}
}

StartPage.propTypes = {
	num_rows: PropTypes.number.isRequired,
	num_cols: PropTypes.number.isRequired,
	difficulty_setting: PropTypes.string.isRequired,

	setDifficulty: PropTypes.func.isRequired,
	updateNumCols: PropTypes.func.isRequired,
	updateNumRows: PropTypes.func.isRequired,
	createNewBoard: PropTypes.func.isRequired,
	hideStartScreen: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		difficulty_setting: state.game.difficulty_setting,
		num_rows: state.game.num_rows,
		num_cols: state.game.num_cols
	};
}

export default connect(mapStateToProps, actions)(createNewBoardHoc(StartPage));

