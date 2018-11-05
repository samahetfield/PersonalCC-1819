const TelegramBot = require('node-telegram-bot-api');

const token = '797521025:AAEtV697zocdGGWgSVgYUsA_7Dbv6xILmT8';
const bot = new TelegramBot(token, {polling: true});
var favourites = [];	

bot.onText(/^\/start/, function(msg){
	console.log(msg);
	var chatId = msg.chat.id;
	var username = msg.from.username;

	bot.sendMessage(chatId, "Hola, " + username + " soy un bot y voy a mantenerte al tanto de tus series favoritas");
});

bot.onText(/^\/addserie (.+)/, (msg, match) => {
	var chatId = msg.chat.id;
	var username = msg.from.username;
	var serie_add = match[1];
	favourites.push(serie_add);
	bot.sendMessage(chatId, "Buena elección!! He añadido " + serie_add + " a tu lista de favoritos");
});

bot.onText(/^\/showfavourites/, function(msg){
	var chatId = msg.chat.id;
	var username = msg.from.username;
	bot.sendMessage(chatId, "Te voy a mostrar tu lista de series favoritas: ");
	favourites.forEach(function(element){
		bot.sendMessage(chatId, element);
	});	

});

bot.onText(/^\/seeactors (.+)/, (msg, match) => {
	console.log(msg);
	var chatId = msg.chat.id;
	var username = msg.from.username;

	bot.sendMessage(chatId, "Actualmente no dispongo de la funcionalidad necesaria para mostrarte los actores de la serie que buscas.");
});


bot.on('message', function(msg) {
	var Hola = "hola bot";
	var firstnameuser = msg.from.first_name;
	if (msg.text.toString().toLowerCase().includes(Hola)) {
		bot.sendMessage(msg.chat.id, "Hola " + firstnameuser + ", como estás?");
	}
});
