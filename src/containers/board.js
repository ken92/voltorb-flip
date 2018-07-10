import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../reducers/actions';
import * as vars from '../vars';
import * as util from '../util';
import Tile from '../components/tile';

class Board extends Component {
	getLoadingDiv = () => {
		return (
			<div className="container">
				<h1>Loading...</h1>
			</div>
		);
	}

	loseGame = () => {
		console.log("lose!");
		this.props.flipAllTiles();
		this.props.stopGame();
		this.props.showGameOverScreen();
		this.props.setLevel(1);
	}
	winGame = () => {
		console.log("win!");
		this.props.flipAllTiles();
		this.props.stopGame();
		this.props.showGameWinScreen();
		this.props.setLevel(this.props.level + 1);
	}

	checkForWinState = numValueTilesFound => {
		const valueTilesLeft = this.props.num_value_tiles_left - numValueTilesFound;
		this.props.setNumValueTilesLeft(valueTilesLeft);

		if (valueTilesLeft === 0) {
			this.winGame();
		}
	}

	pencilModeToPencilFunc = () => {
		switch (this.props.pencil_mode) {
			case vars.LOCK:
				return this.props.toggleTilePencilLock;
			case vars.ONE:
				return this.props.toggleTilePencilOne;
			case vars.TWO:
				return this.props.toggleTilePencilTwo;
			case vars.THREE:
				return this.props.toggleTilePencilThree;
			case vars.VOLTORB:
				return this.props.toggleTilePencilVoltorb;
		}
	}
	onTileClick = key => {
		if (this.props.pencil_mode) {
			this.pencilModeToPencilFunc()(key);
		}

		else {
			const tile = this.props.tiles[key];
			if (tile.pencilLock)
				return;

			this.props.flipTile(key);

			// do something according to tile contents
			console.log("clicked tile: ",tile);
			if (tile.contents === vars.VOLTORB) {
				this.loseGame();
			} else if (tile.contents > 1) {
				this.checkForWinState(1);
			}
		}
	}
	onHeaderClick = async key => {
		const [num, xOrY] = key.split('');
		let filterFunction = util.keyIsInCol;
		if (xOrY === 'y')
			filterFunction = util.keyIsInRow;
		const keys = Object.keys(this.props.tiles).filter(filterFunction.bind(null, num));

		if (this.props.pencil_mode) {
			const pencilModeFunc = this.pencilModeToPencilFunc();
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				pencilModeFunc(key, true);
			}
		}

		else {
			let valueTilesFound = 0;
			let lostGame = false;
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				const tile = this.props.tiles[key];
				if (tile.contents === vars.VOLTORB) {
					this.loseGame();
					lostGame = true;
					break;
				} else if (!tile.flipped && tile.contents > 1) {
					valueTilesFound++;
				}
				this.props.flipTile(key);
			}
			if (!lostGame && valueTilesFound > 0)
				this.checkForWinState(valueTilesFound);
		}
	}

	generateTile = tile => {
		const clickFunc = this.props.game_running? () => {this.onTileClick(`${tile.x}.${tile.y}`)} : null;
		return (
			<Tile key={tile.id}
				onClick={clickFunc}
				{...tile}
			/>
		);
	}
	generateHeaderTile = (headerTile = {}, key = '') => {
		return (
			<Tile key={headerTile.key || key}
				onClick={() => {this.onHeaderClick(headerTile.key)}}
				header={true}
				numVoltorbs={headerTile.numVoltorbs || 0}
				contents={headerTile.value || 0}
			/>
		);
	}
	generateRow = (tempTileArr, rowNumber, headerTile) => {
		return (
			<div key={rowNumber} className="row">
				{tempTileArr.map(tile => {return this.generateTile(tile)})}
				{this.generateHeaderTile(headerTile)}
			</div>
		);
	}
	generateColumnHeadersRow = (rowNumber) => {
		const columnHeaders = [];
		for (let i = 0; i < this.props.num_cols; i++) {
			columnHeaders.push(this.generateHeaderTile(this.props.headers[`${i}xh`], i));
		}
		return (
			<div key={rowNumber} className="row">
				{columnHeaders}
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
				rowsArr.unshift(this.generateRow(tempTileArr, currRow, this.props.headers[`${currRow}yh`]));
				currRow = tile.y;
				tempTileArr = [tile];
			} else {
				tempTileArr.push(tile);
			}
			i++;
		}
		rowsArr.unshift(this.generateRow(tempTileArr, currRow, this.props.headers[`${currRow}yh`]));
		rowsArr.push(this.generateColumnHeadersRow(currRow + 1));

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
	stopGame: PropTypes.func.isRequired,
	flipTile: PropTypes.func.isRequired,
	flipAllTiles: PropTypes.func.isRequired,
	showGameOverScreen: PropTypes.func.isRequired,
	showGameWinScreen: PropTypes.func.isRequired,
	setLevel: PropTypes.func.isRequired,

	toggleTilePencilLock: PropTypes.func.isRequired,
	toggleTilePencilOne: PropTypes.func.isRequired,
	toggleTilePencilTwo: PropTypes.func.isRequired,
	toggleTilePencilThree: PropTypes.func.isRequired,
	toggleTilePencilVoltorb: PropTypes.func.isRequired,

	tiles: PropTypes.object,
	num_cols: PropTypes.number.isRequired,
	num_value_tiles_left: PropTypes.number.isRequired,
	pencil_mode: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool
	]).isRequired,
	level: PropTypes.number.isRequired,
	game_running: PropTypes.bool.isRequired
};


function mapStateToProps(state) {
	return {
		headers: state.board_headers,
		tiles: state.tiles,
		level: state.game.level,
		num_value_tiles_left: state.game.num_value_tiles_left,
		num_cols: state.game.num_cols,
		pencil_mode: state.game.pencil_mode,
		game_running: state.game.game_running
	};
}

export default connect(mapStateToProps, actions)(Board);
