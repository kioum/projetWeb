var Partie = function (display) {
  this.cible = [];
  this.niveau;
  this.display = display;
};


// Si une partie est gagné
Partie.prototype.win = function (v) {
  return cibleSonTouche;
};

// Si une partie est gagné
var cibleSonTouche = function (v) {
    var tousTouche = true;
    this.cible.forEach(function(element) { 
      if(element.toucher){
        tousTouche = false;
      }
    })
    return tousTouche;
};