const Tile = function({x, y, contents, id}) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.contents = contents;
	this.flipped = false;


	// #### pencil mode options ####
	this.pencilVoltorb = false;
	this.pencilOne = false;
	this.pencilTwo = false;
	this.pencilThree = false;
	this.pencilFour = false;


	this.toString = () => {
		return contents;
	};
};

export default Tile;
