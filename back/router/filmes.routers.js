const express = require("express");
const router = express.Router();

const filmes = [
    {
      id: Date.now(),
      nome: "Barbie butterfly",
      imagem:"https://i.pinimg.com/originals/08/09/96/0809963280e74f7f7cf492a71731d760.jpg",
      genero: "infantil",
      voto: "5",
    }
  ]


router.get('/', (req,res)=>{
    res.send(filmes)
})
router.get('/:id', (req,res) =>{
  const idParam = req.params.id;
  const index = filmes.findIndex(filme => filme.id == idParam)
  const filme = filmes[index];
  res.send(filme)
})

router.put('/:id', (req, res) => {
  const filmeEdit = req.body;
  const id = req.params.id
  let filmePreCadastrado = filmes.find((filme) => filme.id == id);
  filmePreCadastrado.nome = filmeEdit.nome;
  filmePreCadastrado.imagem = filmeEdit.imagem;
  filmePreCadastrado.genero = filmeEdit.genero;
  filmePreCadastrado.voto = filmeEdit.voto;
  res.send({
    message: `Filme ${filmePreCadastrado.id} atualizado com sucesso`,
    data: filmePreCadastrado
  });
})

router.post('/add',(req, res) =>{
    const filme = req.body;
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
      message: "salvo com sucesso",
      data: filme
    });
})

router.delete('/:id', (req,res) =>{
  const id = req.params.id;
  const index = filmes.findIndex((filme) => filme.id == id);
  filmes.splice(index, 1);
  res.send(
    {
      message: 'filme excluido com sucesso'
    }
  )
})
module.exports = router;