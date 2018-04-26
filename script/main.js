var initGame = function () {
	//permet de mettre en reliason tous les elements de la partie	
    var canvas = document.getElementById("decors_canvas");
	
	loadLevel("niveau1");
	
	var renderer = new Renderer(currentPart.engine);
				
	
	intervalUpdate = setInterval(function () {
		try {
			if(!pause)
				renderer.update(currentPart, 1000/60, canvas);
		} catch (e) {
			clearInterval(intervalUpdate);
			throw (e);
		}
	}, 1000/60);
	
	var sens = true;
	window.addEventListener("keydown", function(ev) {
			ev = ev || window.event;
		var keyCode = ev.keyCode;
		
		//Touche z et q
		if(keyCode == 27 && !currentPart.win()){
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
			if(sens)
				pressPuissance += 1;
			else
				pressPuissance -= 1;
			
			if(pressPuissance > 30 || pressPuissance < 0)
				sens = !sens;	
		}
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


//Initialisation du bouton play
function init(){
	document.getElementById("btn").addEventListener("click", function(){
			//On creer une nouvelle partie
			currentPart = new Partie();
			clearInterval(intervalUpdate);
			//On initialise la partie
			initGame();
			
			// On met les bonnes valeurs aux variables
			projMove = false;
			pause = false;
			pressAngle = 0
			pressPuissance = 0;
			
			this.style.display = "none";
		}
	);
}

//Permet de générer un niveau
// ICI ça doit etre du json
function loadLevel(niveau){
	let decors = [];
    decors[0] = new Sprite(new Vector(0,0), 300, 10, Infinity, "Tiles/WaveForest_Square");
    decors[1] = new Sprite(new Vector(0,140), 300, 10, Infinity, "Tiles/WaveForest_Square");
    decors[2] = new Sprite(new Vector(0,10), 10, 150, Infinity, "Tiles/WaveForest_Square");
    decors[3] = new Sprite(new Vector(290,10), 10, 150, Infinity, "Tiles/WaveForest_Square");
	decors[4] = new Sprite(new Vector(150,70), 20, 80, Infinity, "Tiles/WaveForest_Square");
	
	let cibles = [];
    cibles[0] = new Sprite(new Vector(250,100), 10, 10, 50, "Characters/Red_F1");
	cibles[1] = new Sprite(new Vector(152,55), 15, 15, 50, "Characters/Yellow_F1");
	
	// Initialisation du projectile
	let proj = new Sprite(new Vector(15, 100), 16, 16, 100, "Items/64-64_EnemyBlockIron");
	
	currentPart.addDecors(decors);
	currentPart.addCibles(cibles);
	currentPart.addProjectile(proj);
}

//Nouvelle partie
var currentPart;

//Si un projectile en mouvement
var projMove = false;
var pause = false;

//interval
var intervalUpdate;

//Prend en compte l'angle et la puissance
var pressAngle = 0, pressPuissance = 0;
window.addEventListener("load", init);

