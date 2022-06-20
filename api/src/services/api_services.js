require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios');

//CANTIDAD DE VIDEOGAMES NECESARIOS PARA LA PAGINA (100VG)
const getApiGames =  async () => {
    const promises = [
      axios(`https://api.rawg.io/api/games?key=${API_KEY}`),
      axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
      axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
      axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
      axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`),
    ];
    let gamesAPI = await Promise.all(promises); // [P1, P2, P3, P4, P5]
    gamesAPI = gamesAPI.map((el) => el.data.results); // [{game1},{game2},...{game20}]
    gamesAPI = gamesAPI.flat().map((game) => {
      return {
        id: game.id,
        name: game.name,
        rating: game.rating,
        background_image: game.background_image,
        genres: game.genres.map((ele) => {
          return { name: ele.name };
        }),
        platforms: game.platforms.map((ele) => {
          return { name: ele.platform.name };
        }),
        screenshot: game.short_screenshots,
        createdInDb: false,
      };
    });
    return gamesAPI;
  };
 
  // Busco por ID el juego en la API
  const getAPIgame = (id) => {
    return axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
  };

  const genres = async () => {
    const genresAPI = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genEach = genresAPI.data.results.map((ele) => ele.name); //array con el nombre de los generos
    return genEach;
  };

 

  module.exports = {
    getApiGames,
    getAPIgame,
    genres,
  };