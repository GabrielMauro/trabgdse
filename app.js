const express = require('express');
const mongoose = require('mongoose');

require("./models/Dados");
const Dados = mongoose.model('dados');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/livros', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log("Conexão realizadda com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão não foi realizadda com sucesso!");
});

app.get("/", (req, res) => {
    Dados.find({}).then((dados) => {
        return res.json(dados)
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum dado encontrado!"
        })
    })
});

app.post("/dados", (req, res) => {
    const dados = Dados.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi cadastrado com sucesso!"
        });
        return res.status(200).json({
            error: false,
            message: "Artigo foi cadastrado com sucesso!"
        }) 
    })
});

app.put("/dados/:id", (req, res) => {
    const dados = Dados.updateOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Não foi atualizado com sucesso"
        });
        return res.json({
            error: false,
            message: "Foi atualizado com sucesso!"
        })
    })
});

app.delete("/dados/:id", (req, res) => {
    const dados = Dados.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Não foi apagado!"
        });
        return res.json({
            error: false,
            message: "Foi apagado!"
        })
    })
})

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080/")
});

