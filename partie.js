var Partie = function () {
  // ici les cibles du niveau courant
  this.cibles = [];
  // Ici les decors du niveau courant
  this.decors = [];
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

// Ajoute le decors a une partie
Partie.prototype.addDecors = function (e, decors) {
	this.decors = decors;
	decors.forEach(function(element){
		e.addBody(element);
	});
}

// Ajoute le decors a une partie
Partie.prototype.addCibles = function (e, cibles) {
	cibles.forEach(function(element){
		e.addBody(element);
	});
	this.cibles = cibles;
}