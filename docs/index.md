# Descripción del proyecto

# Introducción.

Realizar un bot de telegram que nos permita consultar las fechsa de estreno de los capítulos de nuestras series favoritas, de forma que el bot nos pueda avisar cuándo se estrena un capítulo y poder llevar al día nuestra serie. Para realizar este bot utilizaremos la [API TvDB](https://www.thetvdb.com/), que nos dará la información de las series que consultaremos.

## Descripción del problema.

Para las personas que nos gustan las series y las llevamos al día, cuando se termina una temporada, puede pasar mucho tiempo hasta que se lance la siguiente, meses e incluso años. De forma que podemos llegar a perderle la pista a dicha serie y no saber si ha estrenado ya una nueva temporada o no.

## Solución propuesta.

Realizar un bot de telegram que nos avise y nos recuerde cuándo se lanzan los nuevos capítulos de las series favoritas que nosotros vayamos consultando. De esta forma podremos estar al tanto siempre de nuestras series y llevarlas al día.

# Arquitectura

Para realizar este proyecto utilizaremos una arquitectura basada en microservicios, la cual deberá tener mínimo los siguientes:

- Microservicio 1: Este microservicio se encargará de leer los datos de la API TvDB. 

- Microservicio 2: Este microservicio será el encargado de tener la base de datos en la que almacenar la información del usuario usando MySQL.

- Microservicio 3: Microservicio que tendrá el Bot de Telegram, para ello usaremos NodeJS. Este microservicio podremos decir que tendrá la mayor carga de trabajo ya que será el encargado de enviar las peticiones hacia el microservicio que accede a la API, así como de leer y enviar datos hacia el microservicio que maneje la base de datos.


# Creación del Bot

Para la creación del bot hemos hecho uso de **TheBotFather** para recibir nuestro TOKEN y a partir de ahí comenzar a desarrollarlo en Node.js siguiendo este [tutorial](https://github.com/yagop/node-telegram-bot-api).
Primero es necesario instalar la API de telegram para Node.js haciendo uso de ```npm install --save node-telegram-bot-api```
Con esto ya podremos comenzar a realizar nuestro bot.

El principal componente son las definiciones de eventos, es decir, los comandos que el usuario escribe y el bot responde al recibirlos.
La cabecera de estos métodos debe ser de la sigueinte forma:

		bot.onText(/\/start (.+)/, (msg, match) => {
			//Introducimos la acción a realizar
		}

En este caso, estamos creando un evento que se ejecutará cuando el usuario introduzca la orden ```/start``` y nosotros le indicaremos qué debe hacer el bot al recibir esa orden dentro de esta función.

# Funcionamiento del bot

Nuestro bot estará identificado en telegram como @seriesalert_bot y para comenzar a interactuar con él deberemos comenzar con la orden **/start**.
Actualmente tiene las funcionalidades muy limitadas, pero nos permite ejecutar los siguientes comandos:
- **/addserie** param1: Aquí le pasaremos como parámetro el nombre de la serie que queremos en favoritos para que la almacene.
- **/showfavourites**: Nos mostrará una lista de nuestras series favoritas.
- **/lastfavourite** : Nos mostrará la última serie añadida a favoritos.
- **/lastdeleted**: Nos mostrará la última serie que hemos eliminado de favoritos.

# Infraestructura

Se ha decidido usar Node.js como lenguaje para nuestra aplicación que se va a encontrar desplegada en Heroku.
Al haber seleccionado este lenguaje, tendremos un archivo llamado ``` package.json ``` en el que encontraremos las dependencias necesarias para nuestra aplicación.

	"dependencies": {
        "body-parser": "^1.18.3",
        "cookie-parser": "^1.4.3",
        "debug": "^4.1.0",
        "flickerjs": "^2.0.7",
        "jade": "~1.3.0",
        "mocha": "^5.2.0",
        "morgan": "^1.9.1",
        "node-telegram-bot-api": "^0.30.0",
        "static-favicon": "~1.0.0",
        "supertest": "^3.3.0"
    }

Como se observa en este fragmento de código del archivo, vemos que necesitamos dependencias como **node-telegram-bot-api** necesaria para el bot de telegram, así como otras que podemos ver como pueden ser **supertest** utilizada para los test, **mocha** para correr los test programados o **Flicker** el microframework de Node.	

Finalmente, como vamos a desplegar en Heroku necesitaremos un archivo llamado ```Procfile ``` que nos servirá para indicar los comandos que ejecutará el dynos.
En nuestro caso, es sencillo y tendrá únicamente una orden.

	web: node bot.js

Podemos diferenciar dos partes en esta orden del [Procfile](https://devcenter.heroku.com/articles/procfile). La primera parte **web** que nos servirá para indicar que la aplicación va a correr un servidor web y la segunda parte que será el comando que el dyno debe ejecutar para lanzar la aplicación.

# Despliegue en el PaaS
Se ha seleccionado Heroku para el despliegue de nuestra aplicación. Hemos seleccionado esta plataforma frente a otras gracias a estar más familiarizados con ella ya que se ha trabajado con ella en los ejercicios del tema 3, así como por su suscripción gratuita.
Por otro lado, es sencillo desplegar nuestra aplicación en esta plataforma.

Para realizar el despligue en Heroku es necesario seguir los siguientes pasos:
- Estar dado de alta.
- Tener el repositorio de GitHub donde vamos a subir la aplicación clonado en local.
- [Instalar heroku](https://devcenter.heroku.com/articles/heroku-cli) en nuestro equipo.
- Hacer login con el comando ```heroku login```
- Crear la app de heroku con ```heroku create```
- Subirlo a Heroku con ```git push heroku master```. También podemos configurar Github y Heroku para que aunque únicamente haciendo push sobre nuestro repositorio se despliegue automáticamente en Heroku, sin necesidad de hacer la subida a heroku.
- Ejecutar en la terminal ```heroku open``` para que se abra el navegador y ver el JSON devuelto con el código ```{status: OK}```

# Licencia
Este software se encontrará sujeto a la licencia GNU General Public License v3.0

# Descripción de los milestones del proyecto

Enlace hacia los [milestones](https://github.com/samahetfield/PersonalCC-1819/milestones) del proyecto.
