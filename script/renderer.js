var Renderer = function (e) {
    this.engine = e;
};

// Permet de refresh le jeu
Renderer.prototype.update = function (partie, dt, canvas) {
	//ici refresh le canvas ( à l'aide de resize)
	canvas.width += 0;
	
    this.engine.update(dt);
    this.engine.bodies.forEach(function (b) {
        b.draw(partie, canvas);
    });
	
	//Affichage de la fleche d'angle ( si la velocity n'est pas touché alors on l'affiche)
	if(partie.projectile.velocity.x == 0 && 
		partie.projectile.velocity.y == 0){
		// On remet tout de base(si un projectile a était lancé auparavant)
		Constants.gravity = new Vector (0, 0);
		
		var proj = partie.projectile;
		var context = canvas.getContext('2d');
		context.beginPath();//On démarre un nouveau tracé
		
		let tailleFleche = 20;
		
		// Calculs des coordonnées des points C, D et E
		xA = partie.projectile.origin.x + partie.projectile.width/2;
		yA = partie.projectile.origin.y + partie.projectile.height/2;
		
		//On met la valeur de l'angle en question en radian
		let radian = pressAngle * (Math.PI / 180);
		
		// On considere la fin de la fleche a * presspuissance
		xB = Math.cos(radian)* (tailleFleche - pressPuissance/2) + xA;
		yB = -Math.sin(radian)* (tailleFleche - pressPuissance/2) + yA;
		
		AB = partie.projectile.origin.norm();
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
};