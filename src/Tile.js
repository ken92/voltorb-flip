const Tile = function({x, y, contents, id}) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.contents = contents;
	this.flipped = false;

	this.toString = () => {
		return contents;
	};
};

export default Tile;
