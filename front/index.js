const urlApi = "http://localhost:3000"
const lista = document.getElementById("lista")
let edicao = false;
let idEdicao = 0;

const getFilmes = async () => {
    const response = await fetch(urlApi);
    const data = await response.json();
    console.log(data);
    data.map((filme) => {
      lista.insertAdjacentHTML('beforeend', `
      <div class="col-6">
        <div class="card">
        <img id="img" src="${filme.imagem}"/>
          <div class="card-header">
          ${filme.nome}
          </div> 
          <div class="card-body">
            <p class="card-text">Genero: ${filme.genero}</p>
            <p class="card-text">Voto: ${filme.voto} estrelas</p>
            <button class="btn btn-primary" type="button" id="edit" onclick="putFilme(${filme.id})">Editar</button>
          <button class="btn btn-danger" type="button" id='delete' onclick="deleteFilme(${filme.id})">Excluir</button>
          </div>
        </div>
      </div>
      `)
    })
  }
...
  getFilmes();

  

  const submitForm = async (evento) =>{
    evento.preventDefault();
    let nome = document.getElementById('nome').value;
    let imagem = document.getElementById('imagem').value; 
    let genero = document.getElementById('genero').value;
    let voto = document.getElementsByName("fb");
    for (var i = 0; i < voto.length; i++) {
          if (voto[i].checked) {
              voto = voto[i].value;
          }
      }
    
      const filme = {
      nome,
      imagem,
      genero,
      voto,
    }
   
    if(!edicao){
      const request =  new Request(`${urlApi}/add`,{
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers({
          'Content-Type':'application/json'
        })
      })

      const response = await fetch(request);
      const result = await response.json();
      if(result){getFilmes()}
    }
else{
    
    const request = new Request(`${urlApi}/${idEdicao}`, {
      method: 'PUT',
      body: JSON.stringify(filme),
      headers: new Headers({'Content-type':'application/json'})
    })
    const response = await fetch(request);
    const result = await response.json();
    
    if(result){
      getFilmes()
    }

  }
  
    nome = '';
    imagem = '';
    genero = '';
    voto = '';
    lista.innerHTML = '';


}
const getFilmeByid = async (id) =>{
  const response = await fetch(`${urlApi}/${id}`);
  return filme = response.json();
}

const putFilme = async (id) =>{
  edicao = true;
  idEdicao = id;
  const filme = await getFilmeByid(id);
  
 
  let nomeEl = document.getElementById('nome').value;
  let imagemEl = document.getElementById('imagem').value; 
  let generoEl = document.getElementById('genero').value;
  let votoEl = document.getElementsByName("fb");
  for (var i = 0; i < voto.length; i++) {
        if (votoEl[i].checked) {
            votoEl = votoEl[i].value;
        }
    }
  nomeEl = filme.nome;
  imagemEl = filme.imagem;
  generoEl = filme.genero;
  votoEl = filme.voto;
  
}

const deleteFilme = async (id) =>{
  const request = new Request( `${urlApi}/${id}`, {
    method: 'DELETE'
  })
  const response = await fetch(request);
  const data = await response.json();
  console.log(data.message)
  lista.innerHTML = '';
  getFilmes();
}