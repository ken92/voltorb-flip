import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../reducers/actions';
import * as vars from '../vars';
import Tile from '../components/tile';

class Board extends Component {
	getLoadingDiv = () => {
		return (
			<div className="container">
				<h1>Loading...</h1>
			</div>
		);
	}

	onTileClick = key => {
		console.log("key ",key);
		this.props.flipTile(key);
	}

	generateTile = tile => {
		return (
			<Tile key={tile.id}
				onClick={() => {this.onTileClick(`${tile.x}.${tile.y}`)}}
				flipped={tile.flipped}
				contents={tile.contents}
				className="tile"
			/>
		);
	}
	generateRow = (tempTileArr, rowNumber) => {
		return (
			<div key={rowNumber} className="row">
				{tempTileArr.map(tile => {return this.generateTile(tile)})}
			</div>
		);
	}

	getBoard = () => {
		const rowsArr = [];
		let currRow = 0;
		let i = 0;
		let tempTileArr = [];
		const keys = Object.keys(this.props.tiles);
		while (keys[i]) {
			const tile = this.props.tiles[keys[i]];
			if (tile.y !== currRow) {
				rowsArr.unshift(this.generateRow(tempTileArr, currRow));
				currRow = tile.y;
				tempTileArr = [tile];
			} else {
				tempTileArr.push(tile);
			}
			i++;
		}
		rowsArr.unshift(this.generateRow(tempTileArr, currRow));
		return rowsArr;
	}

	render() {
		if (!this.props.tiles)
			return this.getLoadingDiv();

		return (
			<div className="container">
				{this.getBoard()}
			</div>
		);
	}
}

Board.propTypes = {
	tiles: PropTypes.object,
	flipTile: PropTypes.func.isRequired,
	num_cols: PropTypes.number.isRequired,
	num_rows: PropTypes.number.isRequired
};


function mapStateToProps(state) {
	return {
		tiles: state.tiles,
		num_rows: state.game.num_rows,
		num_cols: state.game.num_cols
	};
}

export default connect(mapStateToProps, actions)(Board);
