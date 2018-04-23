var init = function () {
	//permet de mettre en reliason tous les elements de la partie
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

    // test mdr
	var projectile = new Sprite(new Vector(15,100), 10, 10, 1);
	projectile.force = new Vector(0.0,0.0);
	engine.addBody(projectile);
    
	  var sens = true;
	  window.addEventListener("keypress", function(ev) {
			ev = ev || window.event;
		var keyCode = ev.keyCode;
		if(keyCode == 32){
		  if(!choixAngle && !choixPuissance) {
			console.log(pressAngle);
			if(!sens) {
			  pressAngle -= 15;
			}
			else {
			  pressAngle += 15;
			}
		  
			if((pressAngle <= 0 || pressAngle >= 90)
			 && (pressAngle <= 270 || pressAngle >= 360)){
				if(pressAngle != 0 && pressAngle != 360 )
					sens = !sens;
				else if (pressAngle == 0)
					pressAngle = 360;
				else if (pressAngle == 360)
					pressAngle = 0;
			}
		  }
		  else if (choixAngle && !choixPuissance)
			pressPuissance += 0.0005;
		}
	}, false);


	window.addEventListener("keyup", function(ev) {
		ev = ev || window.event;
		var keyCode = ev.keyCode;
		if(keyCode == 32){
		  if(!choixAngle && !choixPuissance){
			  choixAngle = true;
		  }		
		  else if (choixAngle && !choixPuissance){		  
			choixPuissance = true;
		  }
		}
		
		if(choixAngle && choixPuissance) {
		  let new_x = (Math.cos(pressAngle)) - (Math.sin(pressAngle));
		  let new_y = (Math.sin(pressAngle)) + (Math.cos(pressAngle));
		  projectile.force = new Vector (new_x * pressPuissance, new_y * pressPuissance);
		  console.log ("new Vector " + new_x * projectile.force.x + " " + new_y * pressPuissance);
		  choixAngle = false;
		  choixPuissance = false;
		}
	}, false);
};

//test
//Nouvelle partie
var currentPart = new Partie();
var choixAngle = false, choixPuissance = false;
var pressAngle = 0, pressPuissance = 0;
window.addEventListener("load", init);
