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
        "static-favicon": "~1.0.0",
        "supertest": "^3.3.0"
    }

Como se observa en este fragmento de código del archivo, vemos que necesitamos dependencias como **supertest** utilizada para los test, **mocha** para correr los test programados o **Flicker** el microframework de Node. 

Finalmente, como vamos a desplegar en Heroku necesitaremos un archivo llamado ```Procfile ``` que nos servirá para indicar los comandos que ejecutará el dynos.
En nuestro caso, es sencillo y tendrá únicamente una orden.

    web: node SerieService.js

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
- Subirlo a Heroku. Podemos configurar Github y Heroku para que únicamente haciendo push sobre nuestro repositorio se despliegue automáticamente en Heroku, sin necesidad de hacer la subida a heroku.
  Esta configuración se muestra en en la siguiente imagen.

  ![Conexion con Github](https://github.com/samahetfield/PersonalCC-1819/blob/master/docs/imagenes/connectWithGithub.png)
  
  Una vez que conectamos heroku con Github, lo que tendremos que hacer será activar el despliegue automático y que lo haga únicamente cuando pase los test de Travis.
  
  ![Despliegue automático](https://github.com/samahetfield/PersonalCC-1819/blob/master/docs/imagenes/automaticDeploy.png)

- Ejecutar en la terminal ```heroku open``` para que se abra el navegador y ver el JSON devuelto con el código ```{status: OK}```


# Travis

Los test, como ya menciona anteriormente y como vemos en las dependencias de ``` package.json ``` los vamos a realizar con supertest.  
Pero queremos automatizar estos test y que se realicen cada vez que realicemos una subida a nuestro Github y de esta forma que únicamente nos despliegue los cambios cuando estos sean correctos, y evitar así que se despliegue la aplicación con una funcionalidad errónea.

Para ello vinculamos Travis con Github, concretamente con el repositorio en el que tenemos el proyecto.
Y seguidamente crear un archivo ``` .travis.yml ``` en el que indicamos lo que debe instalar para ejecutar los test (en neustro caso **mocha**) y la orden que debe ejecutar para que los test se lancen. Además indicamos el lenguaje y la versión del mismo con la que ejecutar los tests.


# Despliegue

despliegue https://hidden-basin-43122.herokuapp.com/


# Hito 3

Para el hito se ha desarrollado un playbook en Ansible que nos permitirá desplegar nuestro servicio en una máquina virtual de Azure.

## Maquina Virtual

La máquina virtual que se ha utilizado en Azure tiene las siguientes caracterísiticas:
- SO: Ubuntu Server 18.04 LTS
- Región: Oeste de Europa
- Autenticación: Con clave SSH
- Usuario: sergio
- Puertos abiertos: HTTP (80) y SSH (22).

Decir que se ha elegido como Sistema Operativo Ubuntu 18.04 debido a que es la versión más actual de este sistema operativo y por haber trabajado con él antes, por lo qúe me encuentro más familiarizado con él.

## Ampliación de la funcionalidad

En este caso se ha introducido una nueva clase que nos permitirá almacenar mása información de las series cuando consultemos la misma en la API.
La clase creada es [infoSerie.js](https://github.com/samahetfield/PersonalCC-1819/blob/master/infoSerie.js), con la que podremos almacenar para cada serie datos como las temporadas, su nombre, capítulos o actores.

Por lo tanto, ahora cada vez que almacenamos una serie nueva en nuestra lista de favoritos, se almacenará con toda esta información estructurada en formato JSON, en lugar de almacenar únicamente el nombre como se realizaba anteriormente.

## Ansible

Se ha utilizado Ansible para el provisionamiento.

Para usarlo, debemos instalarlo previamente y posteriormente editar el archivo ``` /etc/ansible/hosts ``` en el que tendremos que introducir la IP de nuestra máquina virtual.
Podemos crear grupos, introduciendo el nombre entre corchetes que nos ayudará a desplegar únicamente sobre aquellas direcciones que queramos.

```
  [azure]
  40.74.50.245 ansible_user=sergio

```

Al añadir estas líneas ya podremos crear nuestro playbook para desplegar sobre esta máquina virtual.
El fichero de provisionamiento hará las siguientes tareas:
- Instalar paquetes como git y npm
- Clonar el repositorio
- Instalar las dependencias
- Instalar forever, para correr nuestra aplicación NodeJS
- Redirigir los puertos para que sea accesible desde el puerto 80
- Correr la aplicación

Cuando ejecutamos el playbook, el resultado es el siguiente:

![Tareas playbook](./imagenes/hito3/playbook.png)

Y finalmente, podremos comprobar que funciona accediendo a nuestra dirección IP y viendo el resultado de la pantalla principal:

![Status OK](./imagenes/hito3/statusOK-sergio.png)

#Comprobación de mi provisionamiento

Mi provisionamiento ha sido comprobado por el compañero Alexander Manuel Josef Grimm.
Podemos ver el correcto funcionamiento desde su [documentación](https://github.com/alex1ai/ugr-master-cc/blob/gh-pages/provision.md#checking-playbook-of-other-student).


# Comprobación de provisionamiento de otro compañero

He comprobado el provisionamiento del compañero Alexander Manuel Josef Grimm.

Se ha creado una máquina virtual en Azure siguiendo las instrucciones que se muestran en su [documentación](https://github.com/alex1ai/ugr-master-cc/blob/gh-pages/provision.md).

Creada la máquina virtual, para probarla debemos introducir la IP de la misma dentro de nuestro archivo de hosts de Ansible y descargarnos su Playbook.

Hecho esto, tendremos que ejecutarlo y tendremos el siguiente resultado:

![Resultado Playbook](./imagenes/hito3/resultado-playbook.png)

Como se comprueba en los resultados, vemos que se ha instalado todo lo necesario correctamente, así que únicamente vamos a pasar a acceder a la IP para ver que nos devuelve el Status OK.

![Status OK](./imagenes/hito3/statusOK.png)


# Licencia
Este software se encontrará sujeto a la licencia GNU General Public License v3.0

# Descripción de los milestones del proyecto

Enlace hacia los [milestones](https://github.com/samahetfield/PersonalCC-1819/milestones) del proyecto.

