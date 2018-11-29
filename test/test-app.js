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




