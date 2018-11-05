var request = require('supertest'),
				app = require('../app.js');

				describe( "GET nodebot", function() {
					it('should create', function (done) {
					request(app)
						.get('/nodebot')
						.expect('Content-Type', 'application/json; charset=utf-8')
						.expect(200,done);
					});
				});
