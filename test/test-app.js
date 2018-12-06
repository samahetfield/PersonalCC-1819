var request = require('supertest'),
				app = require('../SerieService.js');


var SerieClass = require('../SerieClass');
var sc = new SerieClass();
var infoSerie = require('../infoSerie');

//Variable de prueba
var iserie = new infoSerie();
iserie.addInfoSerie({nombre:"test", temporadas:"0", capitulos:"0", actores:[]});

				describe( "GET server test", function() {
					it('responds with JSON Status OK on /', function (done) {
					request(app)
						.get('/')
						.expect('Content-Type', 'application/json')
						.expect(200,done);
					});

					it('responds with favourite series on /series_favoritas', function(done){
						request(app)
							.get('/series_favoritas')
							.expect('Content-Type', 'application/json')
							.expect(200, done);
					});
				});

				describe( "PUT and DELETE Functionality", function(){
					it('Put new serie', function(done){
						request(app)
							.put('/series_favoritas/Test')
							.expect(200,done);
					});

					it('Delete favourite serie', function(done){
						request(app)
							.delete('/series_favoritas/Test')
							.expect(200, done);
					});

					it('Delete not exist serie', function(done){
						request(app)
							.delete('/series_favoritas/SerieQueNoExiste')
							.expect(404, done);
					});

				});

				describe( "GET Functionality", function() {

					it('responds with last serie added on /series_favoritas/lastadded', function(done){
						sc.addserie(iserie);
						var lastserie = sc.lastfavourite();

						if(lastserie == "test")
							done();

					});
				});




