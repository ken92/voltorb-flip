import Tile from './Tile';
import * as vars from './vars';

export const getPencilModeFromKey = (key) => {
	switch (key) {
		case 'v':
			return vars.VOLTORB;
		case '1':
			return vars.ONE;
		case '2':
			return vars.TWO;
		case '3':
			return vars.THREE;
		case 'p':
			return vars.TOGGLE_PENCIL_MODE;

		default:
			return null;
	}
};


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


// #### key array filters ####
export const keyIsInRow = (targetRow, key) => {
	return key.indexOf(`.${targetRow}`) !== -1;
};
export const keyIsInCol = (targetCol, key) => {
	return key.indexOf(`${targetCol}.`) !== -1;
};


// #### how many things to put in the board ####
export const getNumFromPercentageRange = (total, {min_percentage, max_percentage}) => {
	const percentage = getRandomInt(min_percentage, max_percentage);
	return Math.round(total * (percentage / 100));
};
export const getNumVoltorbs = (totalNumTiles, difficulty_setting) => {
	return Math.max(getNumFromPercentageRange(totalNumTiles, getDifficultyConfigurationFromMode(difficulty_setting)), vars.MINIMUM_VOLTORBS);
};

export const getNumThrees = (numFreeTiles) => {
	return Math.max(getNumFromPercentageRange(numFreeTiles, vars.THREE_PERCENTAGE), vars.MINIMUM_THREES);
};
export const getNumTwos = (numFreeTiles) => {
	return Math.max(getNumFromPercentageRange(numFreeTiles, vars.TWO_PERCENTAGE), vars.MINIMUM_TWOS);
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
		const numThrees = getNumThrees(totalNumTiles - numVoltorbs);
		const numTwos = getNumTwos(totalNumTiles - numVoltorbs - numThrees);

		const freeTiles = [];
		for (let i = 0; i < totalNumTiles; i++) {
			freeTiles.push(i);
		}

		// place content in array
		await placeContentInArray(vars.VOLTORB, tileContentsArray, numVoltorbs, freeTiles);
		await placeContentInArray(3, tileContentsArray, numThrees, freeTiles);
		await placeContentInArray(2, tileContentsArray, numTwos, freeTiles);
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
		const yHeaderKey = `${y}yh`;
		newHeaders[yHeaderKey] = {value: 0, numVoltorbs: 0, key: yHeaderKey};
		for (let x = 0; x < columns; x++) {
			const constX = x;
			const constY = y;
			const xHeaderKey = `${constX}xh`;

			if (!newHeaders[xHeaderKey])
				newHeaders[xHeaderKey] = {value: 0, numVoltorbs: 0, key: xHeaderKey};

			const contents = contentArray[currentTileId - 1];
			if (contents !== vars.VOLTORB) {
				newHeaders[xHeaderKey].value += contents;
				newHeaders[yHeaderKey].value += contents;
				if (contents > 1)
					numValueTiles++;
			} else {
				newHeaders[xHeaderKey].numVoltorbs += 1;
				newHeaders[yHeaderKey].numVoltorbs += 1;
			}
			const id = currentTileId;
			const key = `${constX}.${constY}`;
			const t = new Tile({
				id,
				y: constY,
				x: constX,
				contents,
				key
			});
			newTiles[key] = t;
			currentTileId++;
		}
	}
	return {
		tiles: newTiles,
		headers: newHeaders,
		numValueTiles
	};
};
