function SerieClass(){
	this.favourites = [];
	this.lastadded = "";
	this.lastremoved = "";
}

SerieClass.prototype.addserie = function(serie){
	this.favourites = this.favourites.concat(serie);
	this.lastadded = serie.nombre;
}

SerieClass.prototype.showfavourites = function(){
	return this.favourites;
}

SerieClass.prototype.lastfavourite = function(){
	return this.lastadded;
}

SerieClass.prototype.lastdeleted = function(){
	return this.lastremoved;
}
SerieClass.prototype.deleteserie = function(serie){
	var found = 0;
	var index = -1;
	for(var i = 0; i < this.favourites.length && found == 0;i++){
        		if((this.favourites[i].nombre == serie) && (found == 0)){
        			index = i;
        			found = 1;
        		}
        		else{
        			index = -1;
        		}
  	}

	if(index > -1){
		this.lastremoved = serie.nombre;
		this.favourites.splice(index, 1);
	}
	return index;
}

module.exports = SerieClass;
