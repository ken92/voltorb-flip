import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import StartPageDisplay from '../components/startPage';
import actions from '../reducers/actions';
import createNewBoardHoc from '../hocs/createNewBoardHoc';

class StartPage extends Component {
	startGame = async () => {
		this.props.hideStartScreen();
		this.props.createNewBoard();
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
	updateNumCols: PropTypes.func.isRequired,
	updateNumRows: PropTypes.func.isRequired,
	createNewBoard: PropTypes.func.isRequired,
	hideStartScreen: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		num_rows: state.game.num_rows,
		num_cols: state.game.num_cols
	};
}

export default connect(mapStateToProps, actions)(createNewBoardHoc(StartPage));

