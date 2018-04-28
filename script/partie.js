var Partie = function (level, score) {
	//Projectile de la partie
	this.projectile;
	//Position de base du projectile
	this.posProj = [];
	//Nombre de projectile utilisé
	this.nbProj = 0;
	//level en cours
	this.level = level;
	// ici les cibles du niveau courant
	this.cibles = [];
	// Ici les decors du niveau courant
	this.decors = [];	
	//Defis du niveau courant
	this.defis = [];
	// score du joueur 
	this.score = score;
	this.bonusScore = 0;
	//Une partie a son propre engine
	this.renderer = new Renderer(new Engine());
};

// Si une partie est gagné et met a jour le score pour les cibles
Partie.prototype.win = function () {
    let tousTouche = true;
	let score = this.bonusScore;
	let scoreTot = 0;
    this.cibles.forEach(function(element) { 
      if(!element.hasCollision){
        tousTouche = false;
      }else if(element.score == 1){
		  score += element.width + element.height;
		  element.score = 2;
	  }else if (element.score != 2){
		  element.score = 1;
	  }
	  scoreTot += element.width + element.height;
    })
	
	//Si le niveau est terminé on doit le scoreTot 
	if(!tousTouche) this.bonusScore = score;
	else this.bonusScore = scoreTot;
	
    return tousTouche;
};

// Ajoute le decors à une partie
Partie.prototype.addDecors = function (decors) {
	this.decors = decors;
	e = this.renderer.engine;
	decors.forEach(function(element){
		e.addBody(element);
	});
};

// Ajoute les cibles à une partie
Partie.prototype.addCibles = function (cibles) {
	e = this.renderer.engine;
	cibles.forEach(function(element){
		e.addBody(element);
	});
	this.cibles = cibles;
};

// Ajoute un projectile à une partie
Partie.prototype.addProjectile = function (proj) {
	// on met a jour le projectile
	this.projectile = proj;
	
	//On met les x et y dans les pos de proj
	this.posProj[0] = proj.origin.x;
	this.posProj[1] = proj.origin.y;
	
	//on met la vel et la force a 0
	this.projectile.force = new Vector(0.0, 0.0);
	this.projectile.velocity = Vector.ZERO;
	
	this.renderer.engine.addBody(this.projectile);
};

// Permet de savoir si c'est le projectile
Partie.prototype.estProjectile = function (proj) {
	return proj == this.projectile;
};
	
// Permet de savoir si c'est le projectile
Partie.prototype.scoreDefis = function () {
	let score = 0;
	this.defis.forEach(function(e){
		if(e.success())
			score += e.score;
	});
	return score;
};
