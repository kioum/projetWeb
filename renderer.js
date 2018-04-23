var Renderer = function (e) {
    this.engine = e;
};

Renderer.prototype.update = function (partie, dt, canvas) {
	//ici refresh le canvas ( à l'aide de resize)
	canvas.width += 0;
	
    this.engine.update(dt);
    this.engine.bodies.forEach(function (b) {
        b.draw(partie, canvas);
    });
};