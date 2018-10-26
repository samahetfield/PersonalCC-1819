# Introducción.

Realizar un bot de telegram que nos permita consultar las fechsa de estreno de los capítulos de nuestras series favoritas, de forma que el bot nos pueda avisar cuándo se estrena un capítulo y poder llevar al día nuestra serie. Para realizar este bot utilizaremos la API TvDB, que nos dará la información de las series que consultaremos.

## Descripción del problema.

Para las personas que nos gustan las series y las llevamos al día, cuando se termina una temporada, puede pasar mucho tiempo hasta que se lance la siguiente, meses e incluso años. De forma que podemos llegar a perderle la pista a dicha serie y no saber si ha estrenado ya una nueva temporada o no.

## Solución propuesta.

Realizar un bot de telegram que nos avise y nos recuerde cuándo se lanzan los nuevos capítulos de las series favoritas que nosotros vayamos consultando. De esta forma podremos estar al tanto siempre de nuestras series y llevarlas al día.

# Arquitectura

Para realizar este proyecto utilizaremos una arquitectura basada en microservicios, la cual deberá tener mínimo 2 de ellos, que serán:

Consutar información de series: Este microservicio se encargará de extraer la información de las series consultadas haciendo uso de la API TvDB.

Información del usuario: Con este microservicio almacenaremos las series favoritas del usuario para poder saber y mostrar las alertas únicamente de las series que tenga almacenadas.

# Licencia
Este software se encontrará sujeto a la licencia GNU General Public License v3.0

# Descripción de los milestones del proyecto
Enlace hacia los milestones del proyecto.
