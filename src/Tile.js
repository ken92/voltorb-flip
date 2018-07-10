const Tile = function({x, y, contents, id, key}) {
	this.key = key;
	this.id = id;
	this.x = x;
	this.y = y;
	this.contents = contents;
	this.flipped = false;
	
	
	// #### pencil mode options ####
	this.pencilLock = false;
	this.pencilVoltorb = false;
	this.pencilOne = false;
	this.pencilTwo = false;
	this.pencilThree = false;


	this.toString = () => {
		return contents;
	};
};

export default Tile;
