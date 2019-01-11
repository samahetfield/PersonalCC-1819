# Hito 5: Orquestación

## Nueva funcionalidad añadida

Para esta entrega se han añadido nuevas funcionalidades a la aplicación, para irnos acercando a la entrega final.
Lo primero que se ha añadido ha sido el uso de la **API TVDB** para obtener datos de las series que el usuario quiere almacenar.

	tvdb.getSeriesByName(serie)
    	.then((result) => {	 ... }

Con la llamada ala función que vemos aquí, podemos obtener datos de la serie que pasamos como parámetro, como puede ser su nombre, el identificador, actores, una sinopsis, así como algunas otras cosas más.

La principal dificultad que encontré al trabajar con esta API fue aprender a utilizar las llamadas asíncronas, ya que estos **then/catch** se ejecutaban de esta forma y muchas veces esperaba un resultado, pero este no lo recibía por la misma razón. Por lo tanto, tuve que aprender a hacer uso de **async/await** que nos proporciona NodeJS especialmente para estas situaciones, siguiendo muchos ejemplos y lecciones que existen como [esta](https://javascript.info/async-await) o la siguiente de [stackoverflow](https://stackoverflow.com/questions/28921127/how-to-wait-for-a-javascript-promise-to-resolve-before-resuming-function) en los que indicamos en la función que hasta que no se haya resuelto la **Promise** no continuaremos en la función desde la que se ha llamado.
Un ejemplo de su uso es el siguiente:

	var respo = await api_tvdb.existeSerie(serie_added, sc).catch((error) =>{
				console.log(error);
	});

Por lo tanto, haciendo uso de la API vamos a coger el nombre de la serie, su ID, así como la lista de capítulos que tenga esta serie. Esta última tarea se realizará con la siguiente función de la API:

	tvdb.getEpisodesBySeriesId(id_serie)
		.then((result) => { ... }

Esta función requiere que le pasemos el ID de la serie de la que queremos sus capítulos, que previamente habremos seleccionado del JSON que se nos proporciona con la primera función que vimos como era **getSeriesByName**.


Seguidamente, se le añade una segunda funcionalidad y es el uso de una base de datos **mysql**. Esta base de datos se va a encontrar almacenada en una máquina virtual diferente a la del servicio y que nos almacenará los nombres y el id de las series que el usuario vaya añadiendo a sus favoritas.

