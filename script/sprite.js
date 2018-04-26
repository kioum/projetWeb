var Sprite = function (v, w, h, m, img) {
    Body.call(this,v, w, h, m);
	this.img = img;
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
		else 
		{
			this.img = this.img.substring(0, this.img.length - 2) + "B1";
		}
    } else {
		context.fillStyle = "#000000";
    };
    /* end extra */
	
	//On créer un rectangle representant le sprite en question
	if(this.img) {
		//affichage de l'image des sprites		
		let image = new Image();
		image.src = 'assets/' + this.img + '.png';
		context.drawImage(image, this.origin.x, this.origin.y, this.width, this.height);
	} else 
		context.fillRect(this.origin.x, this.origin.y, this.width, this.height);

		
	context.closePath();
};