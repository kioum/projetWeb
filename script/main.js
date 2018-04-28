var initGame = function () {
	//permet de mettre en reliason tous les elements de la partie		
	loadLevel();
	let btn_rejouer = document.getElementById("btn");
	if(btn_rejouer.innerHTML == "JOUER"){
		btn_rejouer.innerHTML = "REJOUER";
		var sens = true;
		window.addEventListener("keydown", function(ev) {
				ev = ev || window.event;
			var keyCode = ev.keyCode;
			
			//Touche echap
			if(keyCode == 27 && !currentPart.win()){
				pause = !pause; 
				currentPart.renderer.pause();
				
				if(btn_rejouer.style.display == "none")
					btn_rejouer.style.display = "block";
				else
					btn_rejouer.style.display = "none";
			}
			
			//Touche z et q
			if(keyCode == 81 || keyCode == 90 ||
				keyCode == 37 || keyCode == 38 && !projMove){
				if(pressAngle == 360)
					pressAngle = 0;
				if (pressAngle < 85 || (pressAngle >= 275))
					pressAngle += 5;
			}
			
			//Touche s et d
			if(keyCode == 83 || keyCode == 68 ||
			keyCode == 39 || keyCode == 40 && !projMove){
				if(pressAngle == 0)
					pressAngle = 360;
				if (pressAngle > 275 || pressAngle <= 85)
					pressAngle -= 5;
			}
			
			//Touche espace
			if(keyCode == 32 && !projMove){
				if(sens)
					pressPuissance += 0.25;
				else
					pressPuissance -= 0.25;
				
				if(pressPuissance > 30 || pressPuissance < 15)
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
				currentPart.nbProj++;
				projMove = true;
			}
		}, false);
	}
};


//Initialisation des bouttons
// et de la page d'acceuil
function init(){
	//on initialise le fond
	let canvas_fond = document.getElementById("fond_canvas");
	context = canvas_fond.getContext('2d');
	let image = new Image();
	image.src = 'assets/clouds.png';
	image.addEventListener("load", function() {
		context.drawImage(image, 0, 0, canvas_fond.width, canvas_fond.height);
		//on affiche la page d'accueil
		let canvas_decors = document.getElementById("decors_canvas");
		context = canvas_decors.getContext('2d');
		//On affiche le titre
		context.font = '22px Arial';
		context.fillStyle = 'black';
		context.fillText(document.title, canvas_fond.width/4, canvas_fond.height/4);
		
		//On affiche le titre
		context.font = '12px bold Arial';
		context.fillStyle = 'black';
		context.fillText("Commandes :", canvas_fond.width/4 - 6, canvas_fond.height/4 + 22);
		context.fillText("\t-\tAngle de viser : Z, Q, S, D ou les fleches", canvas_fond.width/4, canvas_fond.height/4 + 34);
		context.fillText("\t-\tPuissance : ESPACE", canvas_fond.width/4, canvas_fond.height/4 + 46);
		context.fillText("\t-\tPause : ECHAP (Voir les defis)", canvas_fond.width/4, canvas_fond.height/4 + 58);
	});
	
	//Bouton jouer ( et rejouer)
	document.getElementById("btn").addEventListener("click", function(){
			//On creer une nouvelle partie
			if(currentPart) currentPart = new Partie(currentPart.level, currentPart.score);
			else currentPart = new Partie(1, 0);
			
			//on enleve les animations Frame en cours
			cancelAnimationFrame(requestId);
	
			//On initialise la partie
			initGame();
			
			// On met les bonnes valeurs aux variables
			projMove = false;
			pause = false;
			pressAngle = 0
			pressPuissance = 15;
			
			document.getElementById("btn_next").style.display = "none";
			this.style.display = "none";
		}
	);
	
	//Bouton next level
	document.getElementById("btn_next").addEventListener("click", function(){
			currentPart.level++;
			currentPart.score += currentPart.bonusScore + currentPart.scoreDefis();	
			document.getElementById("btn").click();
			this.style.display = "none";
		}
	);
}

//Permet de générer un niveau
function loadLevel(){
	// on récupère un objet XMLHttpRequest
	var xhr = getXMLHttpRequest();
	// on réagit à l'événement onreadystatechange
	xhr.onreadystatechange = function() {
		// test du statut de retour de la requête AJAX
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			// on désérialise le catalogue et on le sauvegarde dans une variable
			let niveau = JSON.parse(xhr.responseText);
			let decors = [];
			let cibles = [];
			let defis = [];
			
			//Initialisation des decors
			let sprite;
			niveau["decors"].forEach(function(e){
				sprite = new Sprite(new Vector(e.x, e.y), e.width, e.height,
					Infinity, e.texture);
				//S'il y'a un mouvement X
				if(e.mouvementX)
					sprite.mouvementX = e.mouvementX;
				
				//S'il y'a un mouvement Y
				if(e.mouvementY)
					sprite.mouvementY = e.mouvementY;
				
				//S'il l'objet est friable
				if(e.friable)
					sprite.friable = e.friable;
				
				//S'il y'a une vitesse predefinie
				if(e.vitesse)
					sprite.vitesse = e.vitesse;
				decors.push(sprite);
			});
			
			//Initialisation des cibles
			niveau["cibles"].forEach(function(e){
				sprite = new Sprite(new Vector(e.x, e.y), e.taille, e.taille,
					e.taille*e.taille, e.texture);
				
				//S'il y'a un mouvement X
				if(e.mouvementX)
					sprite.mouvementX = e.mouvementX;
				
				//S'il y'a une vitesse predefinie
				if(e.vitesse)
					sprite.vitesse = e.vitesse;
				
				cibles.push(sprite);
			});
			//Initialisation des cibles
			niveau["defis"].forEach(function(e){
				defis.push(new Defi(e));
			});
			
			let dataProj = niveau["projectile"];
			let proj = new Sprite(new Vector(dataProj.x, dataProj.y), dataProj.taille, dataProj.taille, 
			dataProj.mass, dataProj.texture);
			proj.gravity = Vector.ZERO;
			
			currentPart.addDecors(decors);
			currentPart.addCibles(cibles);
			currentPart.defis = defis;
			currentPart.addProjectile(proj);
			
			//On lance les animations
			animationDuJeu()
		//S'il n'y a plus de niveau affiche la fin du jeu
		}else if(xhr.status == 404 && xhr.readyState == 4){
			currentPart.renderer.finDeJeu();
		}
	}
	// la requête AJAX : lecture de data.json
    xhr.open("GET", "niveau/" + currentPart.level + ".json", true);
	xhr.send();
}

//Fonction trouvé sur developpez.com 
function getXMLHttpRequest() {
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest(); 
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xhr;
}

//On lance les animations
function animationDuJeu() {
	let now = Date.now();
    let delta = now - then;
	let interval = 1000/fps;
	
	if (delta > interval) {		
		if(!pause)
			currentPart.renderer.update(pressPuissance);
		then = now - (delta % interval);
		
		
		//On calcule les fps de l'utilisateur (nombre de fois qu'on rentre ici
		// en 1 seconde
		if (second > 1000) {
			second_since = Date.now();
			second = 0;
			
			fps_affichage = fps_courant;
			
			fps_courant = 0;
		}
		else {
			second = Date.now() - second_since;
			++fps_courant;
		}
	}
	
	//Affichage des FPS 
	let canvas = document.getElementById("decors_canvas");
	let context = canvas.getContext("2d");
	context.font = '10px Arial';
	context.fillStyle = 'black';
	context.fillText(fps_affichage + ' FPS', canvas.width - 40, 15);
			
	//on recupere l'id pour pouvoir le stoppé plus tard
	requestId = requestAnimationFrame(animationDuJeu);
}

//Nouvelle partie
var currentPart;

//Pour les fps
var fps = 60;

var then = Date.now();
var requestId = 0;

var second_since = Date.now();
var second = 0;
var fps_courant = 0;
var fps_affichage = 0;

//Si un projectile en mouvement
var projMove = false;
// Si c'est en pause
var pause = false;

//Prend en compte l'angle et la puissance
let pressAngle = 0, pressPuissance = 15;
window.addEventListener("load", init);

