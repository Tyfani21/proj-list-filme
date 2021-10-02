//CRUD

//IMPORTAR EXPRESS
const express = require("express");
//importando o cors
const cors = require('cors');
//INICIALIZANDO EXPRESS
const app = express();
// falo pro express utilizar o middleware
app.use(express.json()) //fala pro express trabalhar com o JSON
app.use(cors())

const filmesRouters = require("./router/filmes.routers"); //importa as rotas
//inicializa as rotas
app.use('/', filmesRouters)
//definir a porta da aplicação
const port = 3000;

//rota

app.listen(port, () => {
    console.log(`O servidor está rodando na porta http://localhost:${port}`)
})


