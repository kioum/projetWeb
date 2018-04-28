var Defi = function (d) {
    if(d.projectile)
		this.projectile = d.projectile;
	
	 if(!isNaN(d.friable))
		this.friable = d.friable;
	
	if(d.sans != null)
		this.sans = d.sans;
	
	this.score = d["score"];
};
// Permet d'afficher les defis en text
Defi.prototype.toString = function () {
	let str = "";
	if(this.projectile)
		str += "Gagner avec moins de " +  this.projectile + " projectile(s)\t+"
	
	// Cas ou il ne faut rien casser
	if(!isNaN(this.friable)){
		if(this.friable == 0)
			str += "Gagner sans casser d'objet \t+";
		else if (this.sans)
			str += "Gagner sans casser plus de " + this.friable + " objet(s) \t+";
		else 
			str += "Gagner en cassant " + this.friable + " objet(s) \t+";
	}
	
	str += (this.score + " coin(s)");
	return str;
};

// Permet de savoir si les defis ont été réussi
Defi.prototype.success = function () {
	let success = false;
	if(this.projectile)
		success = this.projectile >= currentPart.nbProj;
	
	// Cas ou il ne faut rien casser
	if(!isNaN(this.friable)){
		success = true;
		let cpt = 0;
		if(this.friable == 0){
			currentPart.decors.forEach(function(element){
				if(element.friable == element.nbTouch && !isNaN(element.nbTouch))
					success = false;
			});
		}else {
			currentPart.decors.forEach(function(element){
				if(element.friable == element.nbTouch && !isNaN(element.nbTouch))
					cpt++;
			});
			if (this.sans) success = cpt <= this.friable;
			else success = cpt >= this.friable;
		}
	}
		
	return success;
}