'use strict';


const formulario = document.querySelector('#formulario');
const contenedorImagen = document.querySelector('.container-img');




formulario.addEventListener('submit', buscarAnime);


function buscarAnime (e) {
	e.preventDefault();
	const animeBuscar = document.querySelector('#anime').value;
	
	if (animeBuscar === '') {
		Swal.fire({
        	icon : 'error',
        	title : 'El campo no puede ir vacio',
        	text : 'Debes agregar un termino de busqueda '
        });
		return;
	}

	mostrarAnimes(animeBuscar);
}


async function mostrarAnimes (animeBuscar) {
	 try {
	 	const url = ` https://api.jikan.moe/v3/search/anime?q=${animeBuscar}&limit=9`;
	 	const respuesta = await fetch(url);
	 	const resultado = await respuesta.json();
	 	
	 	if (resultado.status === 404 ) {

	 		Swal.fire({

        	icon : 'warning',
        	title : 'No se encontro el anime',
        	text : 'Especifique una mejor busqueda '

            });

	 		return;
	 	}

	 	animesHTML(resultado.results);
	 	
	 } catch(e) {
	 	console.log(e);
	 }
}

function animesHTML (resultado) {

	let html = '';
	
	resultado.forEach(animes => {
		console.log(animes);
		const { image_url } = animes;
	

        html+= ` 
        <div class="img-seccion">
              <img src="${image_url}">
        </div>`;
      


	});

    contenedorImagen.innerHTML = html;
}
