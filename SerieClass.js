function SerieClass(){
	this.favourites = [];
}

SerieClass.prototype.addserie = function(serie){
	this.favourites = this.favourites.concat(serie);
}

SerieClass.prototype.showfavourites = function(){
	return this.favourites;
}

SerieClass.prototype.deleteserie = function(serie){
	var index = this.favourites.indexOf(serie);
	if(index > -1){
		this.favourites.splice(0, 1);
	}
}

module.exports = SerieClass;
