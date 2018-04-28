var Renderer = function (e) {
    this.engine = e;
};

// Permet de refresh le jeu
Renderer.prototype.update = function (dt) {
	let canvas = document.getElementById("decors_canvas");
	let context = canvas.getContext('2d');
	// Si le jeu en pause on fait rien
	if(pause) return;
	
	//ici le code après qu'il gagne un niveau
	if(currentPart.win()) {
		this.finDeNiveau();
		return;
	}
	
	context.beginPath();
	context.clearRect(0, 0, canvas.width, canvas.height);
	
    this.engine.update(dt);
    this.engine.bodies.forEach(function (b) {
        b.draw(currentPart, canvas);
    });
	
	var proj = currentPart.projectile;
	
	//Affichage de la fleche d'angle ( si la velocity n'est pas touché alors on l'affiche)
	if(proj.velocity.x == 0 && proj.velocity.y == 0){
		// le projectile peut bouger
		projMove = false;	
		// On remet tout de base(si un projectile a été lancé auparavant)
		proj.origin = new Vector(currentPart.posProj[0], currentPart.posProj[1]);
		proj.force = new Vector(0.0, 0.0);
			
		context.beginPath();//On démarre un nouveau tracé
		
		let tailleFleche = 20;
		
		// Calculs des coordonnées des points C, D et E
		xA = currentPart.projectile.origin.x + currentPart.projectile.width/2;
		yA = currentPart.projectile.origin.y + currentPart.projectile.height/2;
		
		//On met la valeur de l'angle en question en radian
		let radian = pressAngle * (Math.PI / 180);
		
		// On considere la fin de la fleche a * presspuissance
		xB = Math.cos(radian)* ((pressPuissance/2) + 5) + xA;
		yB = -Math.sin(radian)* ((pressPuissance/2) + 5) + yA;
		
		AB = currentPart.projectile.origin.norm();
		xC = xB+tailleFleche*(xA-xB)/AB;
		yC = yB+tailleFleche*(yA-yB)/AB;
		
		xD = xC+tailleFleche*(-(yB-yA))/AB;
		yD = yC+tailleFleche*((xB-xA))/AB;
		
		xE = xC-tailleFleche*(-(yB-yA))/AB;
		yE = yC-tailleFleche*((xB-xA))/AB;
 
		//On trace la fleche 
		context.strokeStyle="red";
		context.moveTo(xA,yA);
		context.lineTo(xB,yB);
		
		context.moveTo(xD,yD);
		context.lineTo(xB,yB);
		context.lineTo(xE,yE);
		
		context.stroke();
		context.closePath();
	}
	
	//on Affiche le score
	affichageScore(canvas.width/2, 15);
	
	context.closePath();
};

Renderer.prototype.pause = function () {
	//On démarre un nouveau tracé
	let canvas = document.getElementById("decors_canvas");
	var context = canvas.getContext('2d');
	context.beginPath();
	
	//On creer un carre noir pour "enlever l'arriere plan"
	context.fillStyle = 'black';
	context.globalAlpha = 0.5;
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = 1.0;
	
	//On affiche la pause
	context.font = '22px Arial';
	context.fillStyle = 'white';
	context.fillText('PAUSE', canvas.width/2 - 50, canvas.height/4);
	
	//On affiche les defis de la currentPart
	context.font = '12px Arial';
	context.fillStyle = 'white';
	context.fillText('Defi(s) disponible(s) :', canvas.width/4 - 60, 2*canvas.height/4);
	context.font = '11px Arial';
	//On affiche les defis 
	let cpt = 1;
	currentPart.defis.forEach(function(e){
		if(e.success()) context.fillStyle = 'white';
		else context.fillStyle = 'red';
		context.fillText('\t\t\t - \t' + e, canvas.width/4 - 60, (2*canvas.height/4) + 15*cpt);
		cpt++;
	})
	
	context.closePath();
};

Renderer.prototype.finDeNiveau = function () {
	//btn rejouer
	let btn_rejouer = document.getElementById("btn");
	let btn_next = document.getElementById("btn_next");
	pause = true;
	
	if(btn_rejouer.innerHTML = "JOUER"){
		btn_rejouer.style.display = "block";		
		btn_rejouer.innerHTML = "REJOUER";
	}
	//btn nextlevel
	btn_rejouer.style.top = 500 + "px";
	btn_rejouer.style.left = 45 + "%";
	btn_next.style.display = "block";
	
	//On démarre un nouveau tracé
	let canvas = document.getElementById("decors_canvas");
	var context = canvas.getContext('2d');
	context.beginPath();
	
	//On creer un carre noir pour "enlever l'arriere plan"
	context.fillStyle = 'black';
	context.globalAlpha = 0.5;
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = 1.0;
	
	//On affiche la pause
	context.font = '22px Arial';
	context.fillStyle = 'white';
	context.fillText('Niveau terminé !', canvas.width/2 - canvas.width/4, canvas.height/4);
	
	//On affiche les defis de la currentPart
	context.font = '12px Arial';
	context.fillStyle = 'white';
	context.fillText('Defi(s) reussi(s) :', canvas.width/4 - 60, canvas.height/4 + 20);
	context.font = '11px Arial';
	let cpt = 1;
	currentPart.defis.forEach(function(e){
		if(e.success()) context.fillStyle = 'green';
		else context.fillStyle = 'red';
		
		context.fillText('\t\t\t - \t' + e, canvas.width/4 - 60, (canvas.height/4 + 20) + 15*cpt);
		cpt++;
	})
	
	//On affiche le score
	context.font = '12px Arial';
	context.fillStyle = 'white';
	context.fillText("Votre score :", 1.5*canvas.width/4, 5*canvas.height/8 + 22);
	
	//On affiche le score
	affichageScore(3*canvas.width/4, 5*canvas.height/8 + 12);
	
	context.closePath();
};

Renderer.prototype.finDeJeu = function () {
	//btn rejouer
	let btn_rejouer = document.getElementById("btn");
	pause = true;
	
	if(btn_rejouer.innerHTML = "JOUER"){
		btn_rejouer.style.display = "block";		
		btn_rejouer.innerHTML = "REJOUER";
	}
	//btn nextlevel
	btn_rejouer.style.top = 500 + "px";
	
	//On démarre un nouveau tracé
	let canvas = document.getElementById("decors_canvas");
	let context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	
	//On creer un carre noir pour "enlever l'arriere plan"
	context.fillStyle = 'black';
	context.globalAlpha = 0.5;
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = 1.0;
	
	//On affiche la pause
	context.font = '22px Arial';
	context.fillStyle = 'white';
	context.fillText('Le jeu est terminé !', canvas.width/2 - canvas.width/4, canvas.height/4);
	
	//On remercie le joueur
	context.font = '12px Arial';
	context.fillStyle = 'white';
	context.fillText("Merci d'avoir joué !", canvas.width/4 - 50, 2*canvas.height/4);
	
	//On affiche le score final
	context.font = '12px Arial';
	context.fillStyle = 'white';
	context.fillText("Votre score finale :", canvas.width/4 - 50, 3*canvas.height/4);
	
	//On affiche le score
	affichageScore(2.2*canvas.width/4, 5*canvas.height/8 +9);
	
	//On réinitialise la currentPart si le joueur veut rejouer
	currentPart = new Partie(1,0);
	
	context.closePath();
};

function affichageScore(x, y){
	//ici l'affichage du score
	let canvas = document.getElementById("decors_canvas");
	let context = canvas.getContext('2d');
	context.fillStyle = 'black';
	let image = new Image();
	image.src = 'assets/Items/FloatingBar_brown.png';
	context.drawImage(image, x - canvas.width/8, y, canvas.width/4, canvas.height/10);
	
	//Text du score
	context.font = '12px Arial';
	context.strokeStyle = 'white';
	let score = currentPart.score + currentPart.bonusScore + currentPart.scoreDefis();
	if(score >= 0 && score < 10)
		context.fillText(score, x + 11, y + 12);
	else if (score >= 10 && score < 100)
		context.fillText(score, x + 4, y + 12);
	else if (score >= 100 && score < 1000)
		context.fillText(score, x - 3, y + 12);
	else if (score >= 1000 && score < 10000)
		context.fillText(score, x - 10, y + 12);
	
	image = new Image();
	image.src = 'assets/Items/CoinYellow.png';
	context.drawImage(image, x + canvas.width/16, y+3, 10, 10);
}