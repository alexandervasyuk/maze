var w = window.innerWidth - 0,
	h = window.innerHeight - 40,
	canvas,
	context,
	cellSize = 10,
	cellPad = 10,
	widthInCells,
	heightInCells,
	cells,
	stack,
	solution,
	current;

/**
 * Initializes canvas & various vars needed for proper execution of the rest of defined functions        
*/
function init() {
	canvas = $("#maze");
	canvas.attr("width", w);
	canvas.attr("height", h);
	canvas = canvas[0];

	context = canvas.getContext('2d');

	widthInCells = Math.floor(w / (cellSize + cellPad));
	heightInCells = Math.floor(h / (cellSize + cellPad));

	cells = new Array(widthInCells * heightInCells); // Keeps track of visited cells
	stack = [];

	/* Initializing top-right cell : START*/
	/*
		Index: 		an int spanning the length of cells array. 
		Direction: 	specifies which direction I moved to from previous cell to get to where I am now. (Here it's empty)
	*/
	current = new Cell(0, '');
	context.fillStyle = "#7B68EE";
	current.fill(); //Draw start
	cells[current.index] = true;

	/* Set in motion */
	if (w > 1700 || h > 1000) { // If w & h are large, forgo animation 
		while (!explore());
	} else {
		d3.timer(function() { // D3 timer function provides a custom animation on canvas.
			var done, k = 0;
			while (++k < 75 && !(done = explore()));
			return done;
		});
	}
}

/**
 * Depth-first search maze generation algorithm implemented using backtracking
*/
function explore() {
	context.fillStyle = "white";
	var neighbors;
	if (neighbors = getUnvisitedNeighbors(current)) {
		var chosen = getRandomNeighbor(neighbors);
		stack.push(current);
		removeWall(current, chosen);
		current = chosen;
		visitCell(chosen.index);
		if (current.index === (cells.length - 1)) { // Reached the end of maze? - rememeber the path
			context.fillStyle = "#7B68EE";
			var end = new Cell(cells.length - 1, '')
			end.fill();

			solution = stack.slice();
			solution.push(current);
		}
	} else if (stack.length != 0) {
		current = stack.pop();
	} else {
		return true;
	}
	return false;
}

/**
  * Creating a path between cell1 and cell2
 */
function removeWall(c1, c2) {
	// var i1 = c1.index,
	// 	i2 = c2.index,
	// 	d = c2.direction;
	c2.fill();
	c1.pad(c2.direction); //Apply padding a.k.a remove the wall
}

/**
 * Retrieving unvisited neighbors of a given cell
*/
function getUnvisitedNeighbors(cell) {
	var validIndecies = [],
		index = cell.index,
		direction = cell.direction,
		north = index - widthInCells,
		south = index + widthInCells,
		west = index - 1,
		east = index + 1;
	/*
		Neighbor: 	1. Must fall within boundries
					2. Must be unvisited
					3. Must not be the cell I came from to this cell
	*/
	if (cells[north] == null && direction != 'S' && north > 0) validIndecies.push(new Cell(north, 'N'));
	if (cells[south] == null && direction != 'N' && south < cells.length) validIndecies.push(new Cell(south, 'S'));
	if (cells[west] == null && direction != 'E' && (index % widthInCells != 0)) validIndecies.push(new Cell(west, 'W'));
	if (cells[east] == null && direction != 'W' && (index % widthInCells != widthInCells - 1)) validIndecies.push(new Cell(east, 'E'));

	return validIndecies.length === 0 ? null : validIndecies;
}

/**
 * Returns a radom value from an array inluding min and excluding max
*/
function getRandomNeighbor(a) {
	var min = 0,
		max = a.length;
	return a[(Math.random() * (max - min) + min) | 0];
}

/**
 * Visit a cell
*/
function visitCell(index) {
	cells[index] = true;
}

/**
 * Follow the directions in the solution to draw path
*/

function solve() {
	context.fillStyle = "#7B68EE";
	for (var i = 1; i < solution.length; i++) {
		var c = new Cell(solution[i].index, solution[i].direction);
		c.fill();

		if (c.direction === 'E') draw(c.index - 1, 'E');
		if (c.direction === 'W') draw(c.index + 1, 'W');
		if (c.direction === 'S') draw(c.index - widthInCells, 'S');
		if (c.direction === 'N') draw(c.index + widthInCells, 'N');
	}
}

/**
 * Draw on canvas given index and direction 
*/
function draw(i,d) {
	var column = i % widthInCells,
		row = i / widthInCells | 0,
		dc = 0,
		dr = 0;

	if (d === 'E') dc = 1; 
	else if (d === 'W') dc = -1;
	else if (d === 'S') dr = 1;
	else if (d === 'N') dr = -1;

	context.fillRect(
		column * cellSize + (column + dc) * cellPad,
		row * cellSize + (row + dr) * cellPad,
		cellSize,
		cellSize
	);
}

/**
 * Class Cell
*/
function Cell(index, direction) {
	this.index = index;
	this.direction = direction;
}

Cell.prototype = {
	constructor: Cell,
	fill: function() { //Fill cell with color
		var column = this.index % widthInCells, // column
			row = this.index / widthInCells | 0; // row

		context.fillRect(
				column * cellSize + column * cellPad,
				row * cellSize + row * cellPad,
				cellSize,
				cellSize
	 		);
	},
	pad: function(d) { //Pad cell with color given direction
		var column = this.index % widthInCells,
			row = this.index / widthInCells | 0,
			dc = 0,
			dr = 0;

		if (d === 'E') dc = 1; 
		else if (d === 'W') dc = -1;
		else if (d === 'S') dr = 1;
		else if (d === 'N') dr = -1;

		context.fillRect(
			column * cellSize + (column + dc) * cellPad,
			row * cellSize + (row + dr) * cellPad,
			cellSize,
			cellSize
		);
	}
}
/* Change width and height dynamically */
$("#change").click(function(){
	var width = $("#width").val(),
		height = $("#height").val();

	// If both width and height unspecified, randomly generate a maze with default values
	if (width === "" && height === "") {
		w = window.innerWidth - 0;
		h = window.innerHeight - 40;
		return init();
	}

	w = parseInt(width,10);
	h = parseInt(height,10);

	if(!(Math.floor(w) == w) && !$.isNumeric(w)) {
  		alert('Specify width as an integer');
	} else if(!(Math.floor(h) == h) && !$.isNumeric(h)) {
  		alert('Specify height as an integer');
 	} else {
 		init();
  	}
});

$("#solve").click(function() {
	solve();
})

$(function(){
	init();
});
