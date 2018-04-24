var initGame = function () {
	//permet de mettre en reliason tous les elements de la partie
	currentPart = new Partie();
	var engine = new Engine();
	
	//Variable de test (remplacer par JSON ICI)
	var decors = [];
    decors[0] = new Sprite(new Vector(0,0), 300, 10, Infinity);
    decors[1] = new Sprite(new Vector(0,140), 300, 10, Infinity);
    decors[2] = new Sprite(new Vector(0,10), 10, 150, Infinity);
    decors[3] = new Sprite(new Vector(290,10), 10, 150, Infinity);
	decors[4] = new Sprite(new Vector(150,70), 20, 80, Infinity);
	
	var cibles = [];
    cibles[0] = new Sprite(new Vector(250,100), 10, 10, Infinity);

	currentPart.addDecors(engine, decors);
	currentPart.addCibles(engine, cibles);
	//Fin de test
	
    var canvas = document.getElementById("decors_canvas");

    var renderer = new Renderer(engine);
    var interval;
    interval = setInterval(function () {
		try {
			renderer.update(currentPart, 1000/60, canvas);
		} catch (e) {
			clearInterval(interval);
			throw (e);
		}
    }, 1000/60);

    // Initialisation du projectile
	currentPart.projectile = new Sprite(new Vector(15, 100), 10, 10, 100);
	currentPart.projectile.force = new Vector(0.0, 0.0);
	currentPart.projectile.velocity = Vector.ZERO;
	engine.addBody(currentPart.projectile);
    
	var sens = true;
	window.addEventListener("keydown", function(ev) {
			ev = ev || window.event;
		var keyCode = ev.keyCode;
		
		//Touche z et q
		if(keyCode == 27){
			pause = !pause; 
			renderer.pause(currentPart, canvas);
		}
		
		//Touche z et q
		if(keyCode == 81 || keyCode == 90 ||
			keyCode == 37 || keyCode == 38 && !projMove){
			if(pressAngle == 360)
				pressAngle = 0;
			if (pressAngle < 90 || (pressAngle >= 270))
				pressAngle += 5;
		}
		
		//Touche s et d
		if(keyCode == 83 || keyCode == 68 ||
		keyCode == 39 || keyCode == 40 && !projMove){
			if(pressAngle == 0)
				pressAngle = 360;
			if (pressAngle > 270 || pressAngle <= 90)
				pressAngle -= 5;
		}
		
		if(keyCode == 32 && !projMove){
			// ICI le code pour la puissance
			if(sens)
				pressPuissance += 1;
			else
				pressPuissance -= 1;
			
			if(pressPuissance > 30 || pressPuissance < 0)
				sens = !sens;	
		}
		console.log(keyCode);
	}, false);

	window.addEventListener("keyup", function(ev) {
		ev = ev || window.event;
		var keyCode = ev.keyCode;
		if(keyCode == 32 && !projMove){
			let new_x = Math.cos(pressAngle * (Math.PI / 180));
			let new_y = -Math.sin(pressAngle * (Math.PI / 180));
			currentPart.projectile.force = new Vector (new_x, new_y);
			Constants.gravity = new Vector (0, pressPuissance*0.00001);
			projMove = true;
		}
	}, false);
};


function init(){
	document.getElementById("btn").addEventListener("click", function(){
			initGame();
			this.style.display = "none";
		}
	);
}

//Nouvelle partie
var currentPart;

//Si un projectile en mouvement
var projMove = false;
var pause = false;

//Prend en compte l'angle et la puissance
var pressAngle = 0, pressPuissance = 0;
window.addEventListener("load", init);

