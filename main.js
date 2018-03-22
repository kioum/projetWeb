var init = function () {

    var wall1 = new Sprite(new Vector(0,0), 1000, 20, Infinity,
                             document.getElementById("wall1"));
    var wall2 = new Sprite(new Vector(0,580), 1000, 20, Infinity,
                             document.getElementById("wall2"));
    var wall3 = new Sprite(new Vector(0,20), 20, 560, Infinity,
                             document.getElementById("wall3"));
    var wall4 = new Sprite(new Vector(980,20), 20, 560, Infinity,
                             document.getElementById("wall4"));


    var engine = new Engine();
    engine.addBody(wall1);
    engine.addBody(wall2);
    engine.addBody(wall3);
    engine.addBody(wall4);


    var renderer = new Renderer(engine);
    var interval;
    interval = setInterval(function () {
	try {
            renderer.update(1000/60);
	} catch (e) {
	    clearInterval(interval);
	    throw (e);
	}
    }, 1000/60);


    var canvas = document.getElementById("canvas");
  
    // test mdr
    var div = document.createElement("div");
	  div.className = "object";
	  var sprite = new Sprite(new Vector(150,150), 30, 30, +document.getElementById("mass").value, div);
	  sprite.force = new Vector(0.0,0.0);
	  canvas.appendChild(div);
	  engine.addBody(sprite);
	  div.addEventListener("click", function (ev) {
	    if (this != ev.target) return; 
	     var v = sprite.origin;
	     pressOnX = ev.offsetX+v.x;
		   pressOnY = ev.offsetY+v.y;
	   });
	    
    canvas.addEventListener("click", function (ev) {  
	    if (this != ev.target) return;  
  
      if(pressOnX != 0 && pressOnY !=0){
        var x = ev.offsetX;
	      var y = ev.offsetY;
        sprite.force = new Vector ((pressOnX-x)*0.001, (pressOnY-y)*0.001)
      }
      pressOnX = 0;
      pressOnY = 0;
    });

    /* begin extra */
    var gravityInput = document.getElementById("gravity");
    var elasticityInput = document.getElementById("elasticity");


    gravityInput.value = Constants.gravity.y;
    elasticityInput.value = Constants.elasticity;

    gravityInput.addEventListener ("input", function () {
	Constants.gravity = new Vector (0, +(gravityInput.value));
    });
    elasticityInput.addEventListener ("input", function () {
	Constants.elasticity = +(elasticityInput.value);
    });


    /* end extra */
};
//test
var pressOnX=0, pressOnY=0;
window.addEventListener("load", init);
