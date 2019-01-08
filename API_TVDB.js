const TVDB = require('node-tvdb');
const tvdb = new TVDB('S44TO4WETGV44IAE');

const SerieClass = require('./SerieClass');

const infoSerie = require('./infoSerie');

function API_TVDB(){

	this.ulti_epi = {nombre: "", id:""};
}

API_TVDB.prototype.existeSerie = async function(serie, sclass){

return new Promise(async function(resolve, reject) {
       var hecho = await tvdb.getSeriesByName(serie)
    .then((result) => {	
    	var resolve = result;
    	//console.log(resolve);
    	var id_serie = resolve[0].id;
    	var serie_name = resolve[0].seriesName;
    
    	//console.log(id_serie);
    	//console.log(serie_name.toLowerCase());

    	if(serie == serie_name.toLowerCase()){
    		var iserie = new infoSerie();
			var serie_data = {nombre:serie_name, id:id_serie};
			iserie.addInfoSerie(serie_data);

			sclass.addserie(iserie);

			return "true";
    	}
    	else{
    		return "false";
    	}
	});
    	if(hecho == "true"){
    		resolve("true");
    	}
    	else{
    		reject("false");
    	}
    });
}

API_TVDB.prototype.getEpisodes = async function(serie, sclass){
	return new Promise(async function(resolve,reject){
		var favs = sclass.showfavourites();
		var id_serie = serie;
		var hecho = "false";
	if(id_serie != ""){
		hecho = tvdb.getEpisodesBySeriesId(id_serie)
		.then((result) => {
			
			var iserie = sclass.getSerie(id_serie);
			var capitulos = [];
			result.forEach(function(element){
				capitulos = capitulos.concat(element.episodeName);
			});

			//console.log(capitulos);

			iserie.addCapitulos = capitulos;

			return "true";

		}).catch((error) => {
			console.log(error);
			return "false";
		});
	}

	if(hecho == "true"){
		resolve("true");
	}
	else{
		reject("false");
	}

	});
	
}

module.exports = API_TVDB;