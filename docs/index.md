# Descripción del proyecto

# Introducción.

Realizar un bot de telegram que nos permita consultar las fechsa de estreno de los capítulos de nuestras series favoritas, de forma que el bot nos pueda avisar cuándo se estrena un capítulo y poder llevar al día nuestra serie. Para realizar este bot utilizaremos la [API TvDB](https://www.thetvdb.com/), que nos dará la información de las series que consultaremos.

## Descripción del problema.

Para las personas que nos gustan las series y las llevamos al día, cuando se termina una temporada, puede pasar mucho tiempo hasta que se lance la siguiente, meses e incluso años. De forma que podemos llegar a perderle la pista a dicha serie y no saber si ha estrenado ya una nueva temporada o no.

## Solución propuesta.

Realizar un bot de telegram que nos avise y nos recuerde cuándo se lanzan los nuevos capítulos de las series favoritas que nosotros vayamos consultando. De esta forma podremos estar al tanto siempre de nuestras series y llevarlas al día.

# Arquitectura

Para realizar este proyecto utilizaremos una arquitectura basada en microservicios, la cual deberá tener mínimo los siguientes:

- Microservicio 1: Este microservicio se encargará de leer los datos de la API TvDB

- Microservicio 2: Este microservicio será el encargado de tener la base de datos en la que almacenar la información del usuario usando MongoDB.

- Microservicio 3: Microservicio que tendrá el Bot de Telegram.

# PaaS
Se ha seleccionado Heroku para el despliegue de nuestra aplicación. Hemos seleccionado esta plataforma frente a otras gracias a estar más familiarizados con ella ya que se ha trabajado con ella en los ejercicios del tema 3, así como por su suscripción gratuita.
Por otro lado, es sencillo desplegar nuestra aplicación en esta plataforma.

# Licencia
Este software se encontrará sujeto a la licencia GNU General Public License v3.0

# Descripción de los milestones del proyecto

Enlace hacia los [milestones](https://github.com/samahetfield/PersonalCC-1819/milestones) del proyecto.
