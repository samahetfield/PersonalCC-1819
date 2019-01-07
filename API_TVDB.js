const TVDB = require('node-tvdb');
const tvdb = new TVDB('S44TO4WETGV44IAE');

const SerieClass = require('./SerieClass');

const infoSerie = require('./infoSerie');

function API_TVDB(){

	this.ulti_epi = {nombre: "", fecha:""};
}

API_TVDB.prototype.existeSerie = async function(serie, sclass){

return new Promise(async function(resolve, reject) {
       var hecho = await tvdb.getSeriesByName(serie)
    .then((result) => {	
    	var resolve = result;
//    	console.log(resolve);
    	var id_serie = resolve[0].id;
    	var serie_name = resolve[0].seriesName;
    
    	//console.log(id_serie);
    	//console.log(serie_name.toLowerCase());

    	if(serie == serie_name.toLowerCase()){
    		var iserie = new infoSerie();
			var serie_data = {nombre:serie_name, temporadas: "7", capitulos:"34", actores:["Morgan", "Sara", "Conor"]};
			iserie.addInfoSerie(serie_data);

			sclass.addserie(iserie);

			return "true";
			//this.ulti_epi.nombre = "added";
			//this.ulti_epi.fecha = "hoy";
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

/*
 	//console.log(serie);
 	return new Promise(function(resolve, reject){
 		tvdb.getSeriesByName(serie)
    .then((result) => {	
    	var resolve = result;
//    	console.log(resolve);
    	var id_serie = resolve[0].id;
    	var serie_name = resolve[0].seriesName;
    
    	//console.log(id_serie);
    	//console.log(serie_name.toLowerCase());

    	if(serie == serie_name.toLowerCase()){
    		var iserie = new infoSerie();
			var serie_data = {nombre:serie_name, temporadas: "7", capitulos:"34", actores:["Morgan", "Sara", "Conor"]};
			iserie.addInfoSerie(serie_data);

			sclass.addserie(iserie);
			//this.ulti_epi.nombre = "added";
			//this.ulti_epi.fecha = "hoy";
			resolve("true");
    	}
    	else{
    		reject("No added");
    	}
	});
 	})
 	
	// return this.ulti_epi;

	*/
}

API_TVDB.prototype.getEpisodes = function(serie, sclass){
	var favs = sclass.showfavourites();
	var id_serie = "";	

	favs.forEach(function(element){
		if(element.nombre == serie){
			id_serie = element.id;
		}
	});	

	console.log(id_serie);
	if(id_serie != ""){
		tvdb.getEpisodesBySeriesId(id_serie)
		.then((result) => {
			var last_episode = result[result.length];
			var episode_name = last_episode.episodeName;
			var firstAired = last_episode.firstAired;

			this.ulti_epi.nombre = episode_name;
			this.ulti_epi.fecha = firstAired;
			console.log(this.ulti_epi);

		}).catch((error) => {
			console.log('Serie no encontrada');
		});
	}

	return this.ulti_epi;
}

module.exports = API_TVDB;