const flicker = require('flickerjs');
const TVDB = require('node-tvdb');
const tvdb = new TVDB('S44TO4WETGV44IAE');

// Importamos la clase SerieClass e infoSerie
const SerieClass = require('./SerieClass');
var sc = new SerieClass();

const API_TVDB = require('./API_TVDB');
var api_tvdb = new API_TVDB();

const infoSerie = require('./infoSerie');

var port = process.env.PORT || 5000;


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.50.4",
  user: "sama",
  password: "somepsswrd",
  database: "tvdb"
});
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
		handler: async (req, res, next) => {
			var serie_added = req.params.serie;

			var favs_ant = (sc.showfavourites()).length;


			var respo = await api_tvdb.existeSerie(serie_added, sc).catch((error) =>{
				console.log(error);
			});


			var favs = (sc.showfavourites()).length;	
			var lastadded = sc.lastfavourite();


			//Añadimos los episodios correspondientes a la serie
			var respo2 = await api_tvdb.getEpisodes(lastadded.id, sc).catch((error) =>{
				console.log(error);
			});

			
			if(favs > favs_ant){
				var sql = "INSERT INTO usuarios (name, id) VALUES ('"+serie_added+"', '"+lastadded.id+"')";
  				con.query(sql, function (err, result) {
    			if (err) throw err;
    				console.log("1 record inserted");
  				});

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