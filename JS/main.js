const API = "https://rickandmortyapi.com/api/character";
let datosPersonajes = document.getElementById("datosPersonajes");

async function getData(api) {
  const json = await (await fetch(api)).json();
  paginacion(json.info);
  llenarDatos(json.results)
}

function llenarDatos(data) {
  let html = '';
  data.forEach(personaje => {
    html += `
    <div class="col col-3 ">
      <div class="card" style="width: 17rem;">
        <img src="${personaje.image}">
        <div class="card-body">
          <h5>${personaje.name}</h5>
          <p>Especie: ${personaje.species}</p>
          <p>Estado: ${personaje.status}</p>
        </div>
      </div>
    </div>`    
  });
  datosPersonajes.innerHTML = html;
}

function paginacion(info) {
  let prev = info.prev;
  let next = info.next;

  let html = `
    <li class="page-item ${prev == null ? "disabled" : ""}">
      <a class="page-link href="#" onclick="getData('${prev}')">
        Previous
      </a>
    </li>
    <li class="page-item ${next == null ? "disabled" : ""}">
      <a class="page-link href="#" onclick="getData('${next}')">
        Next
      </a>
    </li>
  `

  document.getElementById('paginacion').innerHTML = html;
}

getData(API);