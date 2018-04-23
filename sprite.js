var Sprite = function (v, w, h, m) {
    Body.call(this,v, w, h, m);
};

Sprite.prototype = Object.create (Body.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.draw = function (partie, canvas) {
	//On n'oublie pas de récupérer le canvas et son context.
    var context = canvas.getContext('2d');

	context.beginPath();//On démarre un nouveau tracé
	
    /* begin extra */
    if (this.hasCollision) {
		context.fillStyle = "#ff0000";
		
		let estPasCible = true;
		let sprite = this;
		partie.cibles.forEach(function(cible){
			if(cible == sprite)
				estPasCible = false;
		});
		if (estPasCible)
			this.setCollision(false);
		
    } else {
		context.fillStyle = "#000000";
    };
    /* end extra */
	
	//On créer un rectangle representant le sprite en question
	context.fillRect(this.origin.x, this.origin.y, this.width, this.height);
	context.closePath();
};