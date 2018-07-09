import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../reducers/actions';
import {createNewTilesBoard} from '../util';


export default function(ComposedComponent) {
	class CreateNewBoardHoc extends Component {
		createNewBoard = async () => {
			const {tiles, headers, numValueTiles} = await createNewTilesBoard(this.props.num_rows, this.props.num_cols, this.props.difficulty_setting);
			this.props.setTiles(tiles);
			this.props.setHeaders(headers);
			this.props.setNumValueTilesLeft(numValueTiles);
			this.props.startGame();
			console.log(tiles);
			console.log(headers);
			console.log(numValueTiles);
		}

		render() {
			return <ComposedComponent
				{...this.props}
				createNewBoard={this.createNewBoard}
			/>
		}
	}


	CreateNewBoardHoc.propTypes = {
		setTiles: PropTypes.func.isRequired,
		setHeaders: PropTypes.func.isRequired,
		setNumValueTilesLeft: PropTypes.func.isRequired,
		startGame: PropTypes.func.isRequired,

		num_cols: PropTypes.number.isRequired,
		num_rows: PropTypes.number.isRequired,
		difficulty_setting: PropTypes.string.isRequired
	};


	function mapStateToProps(state) {
		return {
			difficulty_setting: state.game.difficulty_setting,
			num_cols: state.game.num_cols,
			num_rows: state.game.num_rows
		};
	}


	return connect(mapStateToProps, actions)(CreateNewBoardHoc);
}
