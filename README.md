# Página del proyecto

La [página](https://samahetfield.github.io/PersonalCC-1819/) contendrá el proyecto desarrollado en la asignatura Cloud Computing.

# Descripción del proyecto

# Introducción.

Realizar un servicio web que nos permita consultar información de nuestras series favoritas. Para realizar este serivicio web utilizaremos la [API TvDB](https://www.thetvdb.com/), que nos dará la información de las series que consultaremos.

## Descripción del problema.

Para las personas que nos gustan las series y las llevamos al día, cuando se termina una temporada, puede pasar mucho tiempo hasta que se lance la siguiente, meses e incluso años. De forma que podemos llegar a perderle la pista a dicha serie y no saber si ha estrenado ya una nueva temporada o no.

## Solución propuesta.

Realizar un servicio web que nos avise y nos de información de cuándo se lanzan los nuevos capítulos de las series favoritas que nosotros vayamos consultando. De esta forma podremos estar al tanto siempre de nuestras series y llevarlas al día.

# Arquitectura

Para realizar este proyecto utilizaremos una arquitectura basada en microservicios, la cual deberá tener mínimo los siguientes:

- Microservicio de consulta a la API: Este microservicio se encargará de leer los datos de la API TvDB. 

- Microservicio de información: Este microservicio será el encargado de tener la base de datos en la que almacenar la información del usuario usando MySQL.

# Despliegue en el PaaS
Se ha seleccionado Heroku para el despliegue de nuestra aplicación. Hemos seleccionado esta plataforma frente a otras gracias a estar más familiarizados con ella ya que se ha trabajado con ella en los ejercicios del tema 3, así como por su suscripción gratuita.
Por otro lado, es sencillo desplegar nuestra aplicación en esta plataforma.

Se puede acceder a más información del despliegue accediendo [AQUI](https://github.com/samahetfield/PersonalCC-1819/blob/master/docs/index.md#infraestructura);

# Travis

Los test, como ya menciona anteriormente y como vemos en las dependencias de ``` package.json ``` los vamos a realizar con supertest.  
Pero queremos automatizar estos test y que se realicen cada vez que realicemos una subida a nuestro Github y de esta forma que únicamente nos despliegue los cambios cuando estos sean correctos, y evitar así que se despliegue la aplicación con una funcionalidad errónea.

Para ello vinculamos Travis con Github, concretamente con el repositorio en el que tenemos el proyecto.
Y seguidamente crear un archivo ``` .travis.yml ``` en el que indicamos lo que debe instalar para ejecutar los test (en neustro caso **mocha**) y la orden que debe ejecutar para que los test se lancen. Además indicamos el lenguaje y la versión del mismo con la que ejecutar los tests.


# Despliegue

despliegue https://hidden-basin-43122.herokuapp.com/


# Provisionamiento

Para el provisionamiento se ha utilizado Ansible. El servicio se ha desplegado en la plataforma Azure y podremos acceder a ella desde la siguiente IP:

MV: 40.74.50.245

Toda la información relacionada con el Provisionamiento se encuentra en el siguiente [Documento](https://github.com/samahetfield/PersonalCC-1819/blob/master/docs/hito3.md);


# Licencia
Este software se encontrará sujeto a la licencia GNU General Public License v3.0

# Descripción de los milestones del proyecto

Enlace hacia los [milestones](https://github.com/samahetfield/PersonalCC-1819/milestones) del proyecto.

