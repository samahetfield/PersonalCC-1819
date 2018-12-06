function infoSerie(){
	this.nombre = "";
	this.temporadas = "";
	this.capitulos = "";
	this.actores = [];
}

infoSerie.prototype.addInfoSerie = function(serie){
	this.nombre = serie.nombre;
	this.actores = serie.actores;
	this.capitulos = serie.capitulos;
	this.temporadas = serie.temporadas;
}


infoSerie.prototype.addTemporadas = function(serie){
	this.temporadas = temporadas;
}

infoSerie.prototype.addCapitulos = function(capitulos){
	this.capitulos = capitulos;
}

infoSerie.prototype.addActores = function(actores){
	this.actores = actores;
}

infoSerie.prototype.showTemporadas = function(){
	return this.temporadas;
}

infoSerie.prototype.showCapitulos = function(){
	return this.capitulos;
}

infoSerie.prototype.showActores = function(){
	return this.actores;
}

infoSerie.prototype.showNombre = function(){
	return this.nombre;
}


module.exports = infoSerie;
