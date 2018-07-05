import Tile from './Tile';
import * as vars from './vars';

export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getDifficultyConfigurationFromMode = (mode) => {
	switch (mode) {
		case vars.EASY_MODE:
			return vars.EASY_SETTINGS;
		case vars.MEDIUM_MODE:
			return vars.MEDIUM_SETTINGS;
		case vars.HARD_MODE:
			return vars.HARD_SETTINGS;
		default:
			return vars.EASY_SETTINGS;
	}
};


export const getRowFromTileId = (id, rows) => {
	return Math.ceiling(id / rows) - 1;
};
export const getColumnFromTileId = (id, columns) => {
	if (id <= columns)
		return id;
	const num = id % columns;
	return (num === 0? columns : num) - 1;
};


// #### how many things to put in the board ####
export const getNumFromPercentageRange = (total, {min_percentage, max_percentage}) => {
	const percentage = getRandomInt(min_percentage, max_percentage);
	return Math.round(total * (percentage / 100));
};
export const getNumVoltorbs = (totalNumTiles, difficulty_setting) => {
	return Math.max(getNumFromPercentageRange(totalNumTiles, getDifficultyConfigurationFromMode(difficulty_setting)), vars.MINIMUM_VOLTORBS);
};

export const getNumFours = (numFreeTiles) => {
	return Math.max(getNumFromPercentageRange(numFreeTiles, vars.FOUR_PERCENTAGE), vars.MINIMUM_FOURS);
};

export const getNumThrees = (numFreeTiles) => {
	return Math.max(getNumFromPercentageRange(numFreeTiles, vars.THREE_PERCENTAGE), vars.MINIMUM_THREES);
};


// #### board creation ####
export const placeContentInArray = (content, contentArray, numSpotsToTake, freeTiles) => {
	return new Promise((resolve, reject) => {
		for (let i = 0; i < numSpotsToTake; i++) {
			let index = getRandomInt(0, freeTiles.length - 1);
			contentArray[freeTiles[index]] = content;
			freeTiles.splice(index, 1);
		}
		resolve();
	});
};

export const getNewTileContentsArray = (rows, columns, difficulty_setting) => {
	return new Promise(async (resolve, reject) => {
		const totalNumTiles = rows * columns;
		const tileContentsArray = Array(totalNumTiles).fill(1);

		const numVoltorbs = getNumVoltorbs(totalNumTiles, difficulty_setting);
		const numFours = getNumFours(totalNumTiles - numVoltorbs);
		const numThrees = getNumThrees(totalNumTiles - numVoltorbs - numFours);

		const freeTiles = [];
		for (let i = 0; i < totalNumTiles; i++) {
			freeTiles.push(i);
		}

		// place content in array
		await placeContentInArray(vars.VOLTORB, tileContentsArray, numVoltorbs, freeTiles);
		await placeContentInArray(4, tileContentsArray, numFours, freeTiles);
		await placeContentInArray(3, tileContentsArray, numThrees, freeTiles);
		resolve(tileContentsArray);
	});
};

export const createNewTilesBoard = async (rows, columns, difficulty_setting) => {
	const contentArray = await getNewTileContentsArray(rows, columns, difficulty_setting);
	const newTiles = {};
	const newHeaders = {};
	let currentTileId = 1;
	let numValueTiles = 0;
	for (let y = 0; y < rows; y++) {
		newHeaders[`${y}yh`] = 0;
		for (let x = 0; x < columns; x++) {
			const constX = x;
			const constY = y;

			if (!newHeaders[`${constX}xh`])
				newHeaders[`${constX}xh`] = 0;

			const contents = contentArray[currentTileId - 1];
			if (contents !== vars.VOLTORB) {
				newHeaders[`${constX}xh`] += contents;
				newHeaders[`${constY}yh`] += contents;
				if (contents > 1)
					numValueTiles++;
			}
			const id = currentTileId;
			const t = new Tile({
				id,
				y: constY,
				x: constX,
				contents
			});
			newTiles[`${constX}.${constY}`] = t;
			currentTileId++;
		}
	}
	return {
		tiles: newTiles,
		headers: newHeaders,
		numValueTiles
	};
};
