var Partie = function () {
	//Projectile de la partie
	this.projectile;
	//Position de base du projectile
	this.posProj = [];
	// ici les cibles du niveau courant
	this.cibles = [];
	// Ici les decors du niveau courant
	this.decors = [];
	
	//Une partie a ça propre engine
	this.engine = new Engine();
};

// Si une partie est gagné
Partie.prototype.win = function () {
    var tousTouche = true;
    this.cibles.forEach(function(element) { 
      if(!element.hasCollision){
        tousTouche = false;
      }
    })
    return tousTouche;
};

// Ajoute le decors à une partie
Partie.prototype.addDecors = function (decors) {
	this.decors = decors;
	e = this.engine;
	decors.forEach(function(element){
		e.addBody(element);
	});
}

// Ajoute les cibles à une partie
Partie.prototype.addCibles = function (cibles) {
	e = this.engine;
	cibles.forEach(function(element){
		e.addBody(element);
	});
	this.cibles = cibles;
}

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
	
	this.engine.addBody(this.projectile);
}