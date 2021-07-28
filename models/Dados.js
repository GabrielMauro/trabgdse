const mongoose = require('mongoose');

const Dados = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    ano: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
});

mongoose.model('dados', Dados);