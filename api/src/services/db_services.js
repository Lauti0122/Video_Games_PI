
require("dotenv").config();
const { Genres, Videogame } = require ("../db");
const {genres}= require("./api_services");

// OBTENGO VIDEOGAMES DE LA DB
const getDBGames = async () => {
    return await Videogame.findAll({
        include: [
            {
                model: Genres,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        ],
    });
  };
// OBTENGO VIDEOGAME DE LA DB POR ID
const getDBGame = async (id) =>{
    return await Videogame.findByPk(id,{
        include: [
            {
                model: Genres,
                through: {
                    attributes: [],
                },
            }
        ]
    })
}
     const genresInDB = async () => {
      const genEach = await genres();
      genEach.forEach((ele) => {
        Genres.findOrCreate({
            where: {name: ele},
        });
  });
}
module.exports = {
    getDBGames,
    genresInDB,
    getDBGame
}