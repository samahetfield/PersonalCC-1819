# Comprovación de provisionamiento de otro compañero

He comprobado el provisionamiento del compañero Alexander Manuel Josef Grimm.

Se ha creado una máquina virtual en Azure siguiendo las instrucciones que se muestran en su [documentación](https://github.com/alex1ai/ugr-master-cc/blob/gh-pages/provision.md).

Creada la máquina virtual, para probarla debemos introducir la IP de la misma dentro de nuestro archivo de hosts de Ansible y descargarnos su Playbook.

Hecho esto, tendremos que ejecutarlo y tendremos el siguiente resultado:

![Resultado Playbook](/imagenes/hito3/resultado-playbook.png)

Como se comprueba en los resultados, vemos que se ha instalado todo lo necesario correctamente, así que únicamente vamos a pasar a acceder a la IP para ver que nos devuelve el Status OK.

![Status OK](/imagenes/hito3/statusOK.png)
