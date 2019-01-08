const infoSerie = require('./infoSerie');


function SerieClass(){
	this.favourites = [];
	this.lastadded = {nombre:"", id:0};
	this.lastremoved = "";
}

SerieClass.prototype.addserie = function(serie){
	this.favourites = this.favourites.concat(serie);
	this.lastadded = {nombre:serie.nombre, id:serie.id};
}

SerieClass.prototype.getSerie = function(id){
	var iSerie = infoSerie();

	this.favourites.forEach(function(element){
		if(element.id == id){
			iSerie = element;
		}
	});

	return iSerie;
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

        		if((this.favourites[i].nombre.toLowerCase() == serie) && (found == 0)){
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
