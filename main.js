var init = function () {
   // var wall1 = new Sprite(new Vector(0,0), 300, 10, Infinity);
    //var wall2 = new Sprite(new Vector(0,140), 300, 10, Infinity);
    //var wall3 = new Sprite(new Vector(0,10), 10, 150, Infinity);
   // var wall4 = new Sprite(new Vector(290,10), 10, 150, Infinity);


    var engine = new Engine();
   // engine.addBody(wall1);
    //engine.addBody(wall2);
    //engine.addBody(wall3);
    //engine.addBody(wall4);

    var canvas = document.getElementById("canvas");

    var renderer = new Renderer(engine);
    var interval;
    interval = setInterval(function () {
	try {
            renderer.update(1000/60, canvas);
	} catch (e) {
	    clearInterval(interval);
	    throw (e);
	}
    }, 1000/60);

    // test mdr
	  var sprite = new Sprite(new Vector(15,15), 10, 10, 1);
	  sprite.force = new Vector(0.0,0.0);
	  engine.addBody(sprite);
	    
    canvas.addEventListener("click", function (ev) {  
	    if (this != ev.target) return;  
      
      
      if(pressAngle != 0 && pressPuissance !=0){
        var x = ev.offsetX;
	      var y = ev.offsetY;
        sprite.force = new Vector ((pressAngle-x)*0.001, (pressPuissance-y)*0.001)
      }
      pressAngle = 0;
      pressPuissance = 0;
    });
    
  window.addEventListener("keypress", function(ev) {
        ev = ev || window.event;
    var keyCode = ev.keyCode;
    var sens = true;
    if(keyCode == 32){
      if(!choixAngle && !choixPuissance)
        if(!sens)
          pressAngle -= 10;
        else 
          pressAngle += 10;
        if(pressAngle < 0 || pressAngle > 180){
            sens = !sens;
            console.log(sens);
        }
      else if (choixAngle && ! choixPuissance)
        pressPuissance += 1;
    }
    console.log(pressAngle);
}, false);


window.addEventListener("keyup", function(ev) {
        ev = ev || window.event;
    var keyCode = ev.keyCode;
    if(keyCode == 32){
        if(!choixAngle && !choixPuissance)
        choixAngle = true;
      else if (choixAngle && ! choixPuissance)
        choixPuissance = true;
    }
    
    if(choixAngle && choixPuissance) {
      sprite.force = 
        new Vector ((pressAngle-sprite.origin.x)*0.001, (pressPuissance-sprite.origin.y)*0.001)
      choixAngle = false;
      choixPuissance = false;
    }
}, false);
};
//test
var choixAngle = false, choixPuissance = false;
var pressAngle=0, pressPuissance=0;
window.addEventListener("load", init);
