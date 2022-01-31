import { connect } from 'puppeteer';
import { Teste } from './module/start';

const express = require('express')

const app = express();
const CON = Teste

app.get("/",(req,res) => {
    res.send(CON.teste)
})

app.listen(8080, () => {
    console.log("Iniciar iniciado na porta 8080")
})