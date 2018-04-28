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
	
	let estPasCible = true;
	let sprite = this;
	
	//On verifie que le sprite est une cible ou non
	partie.cibles.forEach(function(cible){
		if(cible == sprite)
			estPasCible = false;
	});
	
    /* begin extra */
    if (this.hasCollision) {
		// Si on touche un mur
		if (estPasCible) {
			if(!isNaN(this.friable)){
				if(isNaN(this.nbTouch)) this.nbTouch = 0;
				
				if(this.friable > this.nbTouch) ++this.nbTouch;
				if(this.friable == this.nbTouch)
					currentPart.renderer.engine.removeBody(this);
			}
			//fin de la collision
			this.setCollision(false);
		}
		else  {
			this.img = this.img.substring(0, this.img.length - 2) + "B1";
		}
    } else {
		// On fait bouger le sprite X
		if(this.mouvementX){
			//Vitesse par default si non defini
			if(!this.vitesse)
				this.vitesse = 0.5;
			
			//Premier modele qu'on choisi
			if(!this.animation)
				this.animation = 0;
			
			//On enleve les deux derniers element de l'image
			let animation = this.img.substring(0, this.img.length-2);
			
			//S'il est entre le debut et la fin on fait bouger l'animation
			if(this.mouvementX.debut < this.origin.x && this.origin.x < this.mouvementX.fin){
				//S'il va a gauche
				if(this.mouvementX.gauche){
					//On met a jour la position
					this.origin = new Vector(this.origin.x - this.vitesse, this.origin.y);
					//On choisi la bonne image a afficher
					if(this.animation + this.vitesse <= 3 && !estPasCible){
						this.animation += this.vitesse;
						animation += "L"+ Math.ceil(this.animation);
					}else this.animation = 0;
				// S'il va a droite
				}else {
					//On met a jour la position
					this.origin = new Vector(this.origin.x + this.vitesse, this.origin.y);
					//On choisi la bonne image a afficher
					if(this.animation + this.vitesse <= 3 && !estPasCible){
						this.animation += this.vitesse;
						animation += "R"+ Math.ceil(this.animation);
					}else this.animation = 0;
				}
			//S'il sort de zone de mouvement le replace
			}else if(this.mouvementX.debut >= this.origin.x){
				this.origin = new Vector(this.origin.x + this.vitesse, this.origin.y);
				this.mouvementX.gauche = !this.mouvementX.gauche;
			}else if(this.origin.x >= this.mouvementX.fin){
				this.origin = new Vector(this.origin.x - this.vitesse, this.origin.y);
				this.mouvementX.gauche = !this.mouvementX.gauche;
			}
			//On verifie que l'affichage de l'image n'aura pas de probleme
			if(this.img.length == animation.length)
				this.img = animation;
		}
		
		// On fait bouger le sprite Y
		if(this.mouvementY){
			//Vitesse par default si non defini
			if(!this.vitesse)
				this.vitesse = 0.5;
			
			//S'il est entre le debut et la fin on fait bouger l'animation
			if(this.mouvementY.debut < this.origin.y && this.origin.y < this.mouvementY.fin){
				//S'il va en haut on met a jour la position
				if(this.mouvementY.haut)
					this.origin = new Vector(this.origin.x, this.origin.y - this.vitesse);
				// S'il va a droite On met a jour la position
				else
					this.origin = new Vector(this.origin.x, this.origin.y + this.vitesse);
			//S'il sort de zone de mouvement le replace
			}else if(this.mouvementY.debut >= this.origin.y){
				this.origin = new Vector(this.origin.x, this.origin.y + this.vitesse);
				this.mouvementY.haut = !this.mouvementY.haut;
			}else if(this.origin.y >= this.mouvementY.fin){
				this.origin = new Vector(this.origin.x, this.origin.y - this.vitesse);
				this.mouvementY.haut = !this.mouvementY.haut;
			}
		}
    };
    /* end extra */
	
	//On crée un rectangle representant le sprite en question
	if(this.img) {
		//affichage de l'image des sprites
		let image = new Image();
		image.src = 'assets/' + this.img + '.png';
		let sprite = this;
		if(!isNaN(this.friable))
			context.globalAlpha = 1.0/(this.nbTouch+1);
		context.drawImage(image, sprite.origin.x, sprite.origin.y, sprite.width, sprite.height);
		context.globalAlpha = 1.0;
	} else 
		context.fillRect(this.origin.x, this.origin.y, this.width, this.height);
	
	context.closePath();
};