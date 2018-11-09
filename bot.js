// Parte Web
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// Importamos la clase SerieClass
const SerieClass = require('./SerieClass');
var sc = new SerieClass();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/',
	function(request, response){
	var favourites_test = sc.showfavourites();

	var get_response = {
						"status": "OK",
						"ejemplo": {
									"ruta": "/series_favoritas",
									"valor": {"valor": favourites_test.length}
						}
					};
		response.send(get_response);
	});	


app.get('/series_favoritas',
	function(req, res){
		var favs = sc.showfavourites();
		var respuesta = { "size" : favs.length };
		if( favs.length > 0 )
			for( i = 0; i < favs.length; i++ )
				respuesta["Serie favorita " + (i+1) ] = favs[i];

		res.send(respuesta);
	});

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});


// Aquí comienza la parte del bot
const TelegramBot = require('node-telegram-bot-api');

const token = '797521025:AAEtV697zocdGGWgSVgYUsA_7Dbv6xILmT8';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/^\/start/, function(msg){
	console.log(msg);
	var chatId = msg.chat.id;
	var username = msg.from.username;

	bot.sendMessage(chatId, "Hola, " + username + " soy un bot y voy a mantenerte al tanto de tus series favoritas");
	bot.sendMessage(chatId, "Si deseas añadir una serie utiliza /addserie <Serie> para añadir a favoritos esa serie. \n Si deseas ver tu lista de favoritos utiliza /showfavourites \n si quieres eliminar una serie usa /deleteserie <Serie> \n ");

});

bot.onText(/^\/addserie (.+)/, (msg, match) => {
	var chatId = msg.chat.id;
	var username = msg.from.username;
	var serie_add = match[1];
	sc.addserie(serie_add);
	bot.sendMessage(chatId, "Buena elección!! He añadido " + serie_add + " a tu lista de favoritos");
});

bot.onText(/^\/showfavourites/, function(msg){
	var chatId = msg.chat.id;
	var username = msg.from.username;
	var favourites = sc.showfavourites();
	favourites.forEach(function(element){
		bot.sendMessage(chatId, element);
	});	

});

bot.onText(/^\/deleteserie (.+)/, (msg, match) => {
	var chatId = msg.chat.id;
	var username = msg.from.username;
	var serie_add = match[1];
	sc.deleteserie(serie_add);
	bot.sendMessage(chatId, "He eliminado " + serie_add + " de tu lista de favoritos");
});

module.exports = app
