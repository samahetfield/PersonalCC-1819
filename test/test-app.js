var request = require('supertest'),
				app = require('../bot.js');


var SerieClass = require('../SerieClass');

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

				// Test on BOT
				describe("GET BOT functionality", function(){
					var sc = new SerieClass();

					it('Add new serie', function(done){
						sc.addserie("test");
						var favourites = sc.showfavourites();

						var index = favourites.indexOf("test");

						if(index > -1){
							done();
						}
					});

					it('Delete serie', function(done){
						sc.addserie("test");
						var index = sc.deleteserie("test");

						if(index > -1){
							done();
						}
					});

					it('Show favourites', function(done){
						sc.addserie("test");
						var favs = sc.showfavourites();

						if(favs.length > 0)
							done();


					});

					it('Show last added', function(done){
						sc.addserie("test");
						var lastserie = sc.lastfavourite();

						if(lastserie == "test")
							done();
					})

					it('Show last removed', function(done){
						sc.addserie("test");
						sc.deleteserie("test");

						var lastdeleted = sc.lastdeleted();

						if(lastdeleted == "test")
							done();
					})

				});





