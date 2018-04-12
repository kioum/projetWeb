var Sprite = function (v, w, h, m) {
    console.log(m);
    Body.call(this,v, w, h, m);
};

Sprite.prototype = Object.create (Body.prototype);
Sprite.prototype.constructor = Sprite;

Sprite.prototype.draw = function (canvas) {
    var context = canvas.getContext('2d');
    //On n'oublie pas de récupérer le canvas et son context.

context.beginPath();//On démarre un nouveau tracé
    /* begin extra */
    if (this.hasCollision) {
	context.fillStyle = "#ff0000";
	this.setCollision(false);
    } else {
	context.fillStyle = "#000000";
    };

    /* end extra */

context.fillRect(this.origin.x, this.origin.y, this.width, this.height);
context.closePath();


};
