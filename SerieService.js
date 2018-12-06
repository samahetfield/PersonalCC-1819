const flicker = require('flickerjs');

// Importamos la clase SerieClass e infoSerie
const SerieClass = require('./SerieClass');
var sc = new SerieClass();

const infoSerie = require('./infoSerie');

var port = process.env.PORT || 5000;


    var app = flicker();
    app
        .add({
            url: '/',
            method: 'GET',
            handler: (req, res, next) => {
                var response_get = {"status": "OK", 
								"ejemplo": {"ruta": "/series_favoritas",
											"valor": {"Series": "series favoritas"}
											}
								};
			res.send(response_get);
            }
        })
        .listen(port);


app
	.add({
		url: '/series_favoritas',
		method: 'GET',
		handler: (req, res, next) => {
			var favs = sc.showfavourites();
			var respuesta = {"series favoritas": favs};
			res.send(respuesta);
		}
	});



app
	.add({
		url: '/series_favoritas/lastadded',
		method: 'GET',
		handler: (req, res, next) => {
			var ultima = sc.lastfavourite();

			res.send({"Última serie añadida" : ultima});
		}
	});

app
	.add({
		url: '/series_favoritas/lastdeleted',
		method: 'GET',
		handler: (req, res, next) => {
			var ultima = sc.lastdeleted();

			res.send({"Última serie eliminada" : ultima});
		}
	});




app
	.add({
		url: '/series_favoritas/:serie',
		method: 'PUT',
		handler: (req, res, next) => {
			var serie_added = req.params.serie;

			var iserie = new infoSerie();

			var serie_data = {nombre:serie_added, temporadas: "7", capitulos:"34", actores:["Morgan", "Sara", "Conor"]};
			iserie.addInfoSerie(serie_data);

			sc.addserie(iserie);

			var favs = sc.showfavourites();	
			var index = -1;
			var found = 0;
			for(var i = 0; i < favs.length;i++){
        		if(favs[i].nombre == serie_added && found == 0){
        			index = 0;
        			found = 1;
        		}
        		else{
        			index = -1;
        		}
  			}

			if(index > -1){
				res.sendStatus(200);
			}
			else{
				res.sendStatus(404);
			}
		}
	});

app
	.add({
		url: '/series_favoritas/:serie',
		method: 'DELETE',
		handler: (req, res, next) => {
			var serie_added = req.params.serie;
			var index = sc.deleteserie(serie_added);

			if(index > -1){
				res.sendStatus(200);
			}
			else{
				res.sendStatus(404);
			}
		}
	});

	module.exports = app