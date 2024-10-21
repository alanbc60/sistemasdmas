EditarLineamientos tiene la misma funcionalidad, pero tiene un codigo más limpio, se recomienda limpiar las otras componentes:




Los archivos EditarEvento, EditarProyectoInvestigacion, EditarProyectoTerminal, EditarPublicacion y Editar Seminario funcionan de manera similar:

Recibe de props el userId para poner en la base de datos quién hace el cambio.
Al cargar la imagen, verifica si existe un item el la url y de aquí desplejara la interfaz de agregar o bien actualizar.

La funcion onSubmit es muy larga, pero se ha envuelto en dos funciones (postEdit y postNew) 
por si después se tiene la oportunidad de modificar la manera en que funciona el servidor y 
reciclar codigo sea sencillo y se pueda utilizar las alertas de manera eficiente y sin problemas de sincronia.
    postEdit:
        si la imagen cambia, llama a editarSiCambiaLaImagen
            editarSiCambiaLaImagen: Actualiza un registro de una tabla en la base de datos, en caso que NO se haya modificado la imagen
        si no, llama a editarSinAlterarLaimagen
            editarSinAlterarLaimagen: Actualiza un registro de una tabla en la base de datos, si se ha cambiado la imagen
    postNEW:
        llama a la funcion agregar, se ha envuelto sin necesidad pero para mantener la manera en la cual funciona la anterior
         agregar: Agrega un registro de una tabla en la base de datos.