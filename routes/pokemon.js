const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const pkmon = await db.query("SELECT * FROM pokemon WHERE pok_id = ?", id);
    if(id >= 0 && id <= 722) {
        return res.status(200).json(pkmon);
    }
    return res.status(404).send("Pokemon no encontrado");
});

pokemon.get('/:name([A-Za-z]+)', async(req, res, next) => {
    const name = req.params.name;
    const pkm = await db.query("SELECT * FROM pokemon WHERE pok_name = '" +name+ "'");
    return res.status(200).json(pkm);
    /*const pkmn = pkm.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });

    if(pkmn.length > 0) { 
        return res.status(200).json(pkm);
    }
    return res.status(404).send("Pokemon no encontrado");*/
});

module.exports = pokemon;