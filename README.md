<h1 align="center">descansAR - Proyecto 2 - RollingCode</h1>
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js,bootstrap,vscode" />
  </a>
</p>

<div align="center">
  <img src="https://img.shields.io/github/commit-activity/y/msdario12/Proyecto2_Comision_45i/main" />
  <img src="https://img.shields.io/github/contributors/msdario12/Proyecto2_Comision_45i" />
</div>





<a href="">
<img href="https://github.com/msdario12/Proyecto2_Comision_45i/assets/31823835/e69213c2-d967-4df6-ab02-a6164e5fd7ec">
</a>


[![screenshot](https://github.com/msdario12/Proyecto2_Comision_45i/assets/31823835/e69213c2-d967-4df6-ab02-a6164e5fd7ec 'Screenshot')](https://descansar.netlify.app/)


Este repositorio es un fork del original usado para el desarrollo del trabajo grupal para el curso de Fullstack Developer de RollingCode.

La aplicación esta construida usando javascript vanilla, con las librerias de SweetAlert2 y filePond. El estilo de la misma se realizo usando Bootstrap 5 y algo de CSS puro.

En la misma, se uso el localStorage del navegador como almacenamiento de datos persistentes a la recarga de la pagina
## Links
* Deploy del sitio: https://descansar.netlify.app/
* Trello del grupo: https://trello.com/b/zzWdUpXO/grupo-n1-modulo-2
## Integrantes
* Dario Mansilla
* Nicolas Quinteros
* Simon Julian
* Belen Córdoba
## Requerimientos
1. Dos tipos de registros, uno de huésped y otro de anfitrión.
2. La página web debe contar con un login para anfitriones y huéspedes.
3. El registro de los usuarios debe ser aprobado por un administrador.
4. En la plataforma se deben poder solicitar reservas de alojamiento:
- El huésped se logueará.
- El huésped podrá buscar alojamientos disponibles.
- El huésped seleccionará un alojamiento de acuerdo a la ubicación, fechas disponibles y
características.
- El huésped deberá indicar la duración de la estadía y la cantidad de personas.
- La reserva deberá llegar a la cuenta del anfitrión.
- El anfitrión deberá visualizar las reservas asignadas desde un panel.
- El huésped deberá visualizar sus reservas desde su cuenta.
5. La página principal debe ser una página informativa desde la que se podrán registrar y
loguear tanto anfitriones como huéspedes
## Puntos a mejorar
* Existe gran cantidad de codigo que no cumple el principio de DRY (don't repeat yourself), que puede ser refactorizado y evitar asi tener codigo duplicado, por cuestiones de tiempo para la presentación se lo dejo de esta forma.
* El navbar no funciona correctamente en mobile, se deberia cambiar y usar uno de Bootstrap 5.
* Las imagenes del Home deberian redireccionar a las publicaciones que se ven en la pagina de las Cards.
* Falta una validacion mas fuerte en los inputs a la hora de registrar un usuario, o crear una nueva publicacion
## Futuras Mejoras
* Pasar el proyecto a React
* Completar app con backend
