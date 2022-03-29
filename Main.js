let drawing;
function setup() {
	createCanvas(windowWidth, windowHeight);
	drawing = new Drawing();
}

function draw() {
	background(255);
	drawing.draw();

	if(!drawing.on) {
		textSize(50);
		strokeWeight(1);
		text("FailPass".substring(drawing.error>20?0:4, 4 + (drawing.error>20?0:4)) + ": " + drawing.health + " health", 100, 100);
	}

	if(mouseIsPressed) {
		drawing.create();
	}
}

function mouseReleased() {
	if(drawing.p.length > 10) {
		drawing.end();
	}
}
