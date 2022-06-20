const {getApiGames, getAPIgame} = require('../services/api_services');
const {getDBGames, genresInDB, getDBGame} = require('../services/db_services');
const {Videogame, Genres} = require('../db');

const getAllGames = async () => {
    const apiInfo = await getApiGames()
    const dbInfo = await getDBGames()
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal;
}

// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
    const getvideogames = async (req, res, next) => {
        try{
            const { name } = req.query;
            let allGames = await getAllGames();
            if (name) {
                let games_for_name = allGames.filter(game => game.name.toLowerCase().includes(name.toLowerCase())).slice(0,15);
                games_for_name.length > 0 
                ? res.status(200).json(games_for_name) 
                : res.status(404).send("No hay videojuegos con ese nombre");
            }
            else{
                res.status(200).json(allGames);
            }
        } catch(e){
            next(e)
        }
    }

// Obtengo todos los generos
    const allGenres = async (req, res, next) => {
        try{
            genresInDB();
            const allGenres = await Genres.findAll();
            res.status(200).json(allGenres);
        }catch(e){
            next(e)
        }
    }

// busco un videojuego por id
const getGameById = async(req,res)=>{
    const id = req.params.id;
    if(id.includes("-")){
        try{
            const game = await getDBGame(id)
            res.status(200).json(game)
        } catch(e){
            res.status(404).send("No se encontro el videojuego creado en DB")
        }
    }
    else{
        try{
            const game = await getAPIgame(id)
            const data = game.data;
            let deteailGame ={
             id: data.id,
             name: data.name,
             description: data.description,
             released: data.released,
             background_image: data.background_image,
             rating: data.rating,
             genres: data.genres.map((ele) => {
              return { name: ele.name };
            }),
            platforms: data.platforms.map((ele) => {
              return { platforms: ele.platform.name };
            }),
          };
          res.status(200).json(deteailGame)
        }
        catch(e){
            res.status(404).send("No se encontro el videojuego")
        }
    }
}
module.exports = {
    getvideogames,
    allGenres,
    getGameById
}

