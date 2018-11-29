function SerieClass(){
	this.favourites = [];
	this.lastadded = "";
	this.lastremoved = "";
}

SerieClass.prototype.addserie = function(serie){
	this.favourites = this.favourites.concat(serie);
	this.lastadded = serie;
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
	var index = this.favourites.indexOf(serie);
	if(index > -1){
		this.lastremoved = serie;
		this.favourites.splice(index, 1);
	}
	return index;
}

module.exports = SerieClass;
