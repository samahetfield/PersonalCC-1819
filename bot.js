const flicker = require('flickerjs');

// Importamos la clase SerieClass
const SerieClass = require('./SerieClass');
var sc = new SerieClass();

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
			sc.addserie(serie_added);

			res.send(serie_added);
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