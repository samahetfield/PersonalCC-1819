// Parte Web
var flicker = require('flickerjs');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = flicker();

// Importamos la clase SerieClass
const SerieClass = require('./SerieClass');
var sc = new SerieClass();
var port = process.env.PORT || 5000;

app
	.add({
		url: '/',
		method: 'GET',
		handler: (req, res, next) => {
			var response_get = {"status": "OK", 
								"ejemplo": {"ruta": "/series_favoritas",
											"valor": {"tamaño": "numero de series favoritas"}
											}
								};
			res.send(response_get);
		}
	}).listen(port);


app
	.add({
		url: '/series_favoritas',
		method: 'GET',
		handler: (req, res, next) => {
			var favs = sc.showfavourites();
			var respuesta = {"tamanio": favs.length};
			res.send(respuesta);
		}
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
	bot.sendMessage(chatId, "Si deseas añadir una serie utiliza /addserie <Serie> para añadir a favoritos esa serie."+
							" \n Si deseas ver tu lista de favoritos utiliza /showfavourites"+
							" \n Si quieres eliminar una serie usa /deleteserie <Serie>"+
							" \n Para ver la última serie añadida usa /lastfavourite"+
							"\n Para ver la última serie eliminada usa /lastdeleted");

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
	var index = sc.deleteserie(serie_add);
	if(index == -1){
			bot.sendMessage(chatId, "No he econtrado la serie " + serie_add + " en tu lista de favoritos");
	}
	else{
			bot.sendMessage(chatId, "He eliminado " + serie_add + " de tu lista de favoritos");
	}
});

bot.onText(/^\/lastfavourite/, function(msg){
	var chatId = msg.chat.id;
	var username = msg.from.username;
	var last = sc.lastfavourite();
	
	bot.sendMessage(chatId, last);
});

bot.onText(/^\/lastdeleted/, function(msg){
	var chatId = msg.chat.id;
	var username = msg.from.username;
	var last = sc.lastdeleted();
	
	bot.sendMessage(chatId, last);
});

module.exports = app
