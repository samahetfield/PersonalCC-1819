var request = require('supertest'),
				app = require('../SerieService.js');


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
						var sc = new SerieClass();
						
						sc.addserie("test");
						var lastserie = sc.lastfavourite();

						if(lastserie == "test")
							done();

					});

					it('Show last removed', function(done){
						var sc = new SerieClass();

						sc.addserie("test");
						sc.deleteserie("test");

						var lastdeleted = sc.lastdeleted();

						if(lastdeleted == "test")
							done();
					})
				});




