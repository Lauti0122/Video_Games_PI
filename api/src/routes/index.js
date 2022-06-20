const express = require('express');
const { Router } = require('express');
// TRAIGO MODELS
const { Videogame, Genres } = require('../db.js')
// TRAIGO SERVICES
//const { getApiGames } = require('../models/services/api_services')
// TRAIGO CONTROLLERS
const { getvideogames, allGenres, getGameById} = require('../routes/Controllers')



const router = Router();
// MIDDLEWARE PARA LEER EL BODY DE UN REQUEST
router.use(express.json());

//POST VIDEOGAME
router.post('/videogames', async(req,res)=>{
    let {name, description, release_date, rating, platform, background_image, createdInDb, genres} = req.body;
    try{
        const createVideogame = await Videogame.create({
            name,
            description,
            release_date,
            rating,
            platform,
            background_image,
            createdInDb,
        });
        const genresDB = await Genres.findAll({
            where: {
                name: genres
            }
        });
        createVideogame.addGenres(genresDB);
        res.send("Videojuego creado");
    }catch(e){
        res.status(404).send(e);
    }
})
//DELETE VIDEOGAME
router.delete('/videogames/:id', async(req,res)=>{
    let {id} = req.params;
    let {name} = req.body;
    if(id){
        try{
                await Videogame.destroy({
                where: {id: id}
})
            res.send(`Videogame: ${name} fue eliminado`);
        }catch(e){
            res.status(404).send(e);
        }
    }
})




// Busqueda de videogames en la ruta principal y por query
router.get("/videogames", getvideogames);
// Busqueda de todos los generos
router.get("/genres", allGenres);
// Busqueda de un videojuego por id
router.get("/videogames/:id", getGameById);


module.exports = router;
