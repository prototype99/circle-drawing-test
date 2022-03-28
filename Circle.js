function Circle(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
}

Circle.prototype.draw = function() {
	noFill();
	strokeWeight(10);
	stroke(255, 0, 0);
	
	ellipse(this.x, this.y, this.r*2, this.r*2);
}