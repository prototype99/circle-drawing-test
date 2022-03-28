function Drawing() {
	this.p = [];
	
	this.circle = new Circle(0, 0, 0);
	
	this.error = 0;
	
	this.on = true;
	
	this.health = 20;
}

Drawing.prototype.end = function() {
	this.on = false;
	
	var x = 0;
	var y = 0;
	
	for(var i = 0;i < this.p.length;i ++) {
		x += this.p[i].x;
		y += this.p[i].y;
	}
	
	x /= this.p.length;
	y /= this.p.length;
	
	this.circle.x = x;
	this.circle.y = y;
	
	var dis = 0;
	
	for(var i = 0;i < this.p.length;i ++) {
		dis += dist(this.p[i].x, this.p[i].y, x, y);
	}
	
	dis /= this.p.length;
	
	this.circle.r = dis;
	
	this.error = 0;
	
	for(var i = 0;i < this.p.length;i ++) {
		this.error += abs(dist(this.p[i].x, this.p[i].y, x, y) - this.circle.r);
	}
	
	this.error /= this.p.length;
	
	if(this.circle.r < 25) {
		this.on = true;
	} else {
		this.health = ceil(20-this.error);
	}
}

Drawing.prototype.draw = function() {
	strokeWeight(this.health/2);
	stroke(0);
	for(var i = 0;i < this.p.length;i ++) {
		var prev = this.p[i];
		if(i-1 >= 0) {
			prev = this.p[i-1];
		} else {
			if(!this.on) {
				prev = this.p[this.p.length-1];
			}
		}
		line(this.p[i].x, this.p[i].y, prev.x, prev.y);
	}
	
	this.circle.draw();
}

Drawing.prototype.create = function() {
	if(this.on) {
		if(this.p.length > 0) {
			var ps = this.p[this.p.length-1];
			var angle = atan2(ps.y-mouseY, ps.x-mouseX);
			var dis = dist(mouseX, mouseY, ps.x, ps.y);
			while(dis > 5) {
				this.p.push(new Point(ps.x-5*cos(angle), ps.y-5*sin(angle)));
				ps = this.p[this.p.length-1];
				angle = atan2(ps.y-mouseY, ps.x-mouseX);
				dis = dist(mouseX, mouseY, ps.x, ps.y);
			}
		} else {
			this.p.push(new Point(mouseX, mouseY));
		}
	}
}