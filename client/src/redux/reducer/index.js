const initialState = {
    allVideogames: [],
    videogames2: [],
    VideogameByID: {}, // detail videogame
    genres:[],

}
    export default  function rootReducer (state = initialState, action)  {
        switch(action.type){
            //GET VIDEOGAMES
            case "GET_ALL_VIDEOGAMES":
                return {
                    ...state,
                    allVideogames: action.payload,
                    videogames2: action.payload
                }

            //GET GENRES
            case "GET_ALL_GENRES":
                return {
                    ...state,
                    genres: action.payload
                }
                // me traigo los videojuegos por query
            case "GET_VIDEOGAME_BY_NAME":
                return{
                    ...state,
                    videogames2: action.payload
                  /*  videogames2:{...state.videogames2,[action.filter]:action.payload[action.filter]} */

                }
                //me traigo videojuego por id
                case "GET_VIDEOGAMES_ID":
                return {
                    ...state,
                    VideogameByID: action.payload,
                }
                // reseteo el id
                case "RESET_ID":
                return{
                    ...state,
                    VideogameByID: [],
                   videogames2:[]
                }

                case "CLEAR_FILTER":
                    return{
                        ...state,
                        videogames2: state.allVideogames,
                    }

                //POST VIDEGOAMES

                case "CREATE_VIDEOGAME":
                     if(action.payload !== "Name already exists in database"){ 
                    alert("Videogame created successfully")
                    return {
                        ...state,
                        allVideogames:[
                            ...state.allVideogames,
                            action.payload
                        ],
                    }
                }
                 else{
                    alert("Name already exists in database")
                } 
                case "ORDER_BY_NAME":
                const orderName = action.payload === "asc" ? state.videogames2.sort((a,b)=>{
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0
                }) : state.videogames2.sort((a,b)=>{
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                })
                return{
                    ...state,
                    videogames2: action.payload === "all" ? state.allVideogames : orderName
                }

                case "ORDER_BY_RATING":
                    
                    const rating = action.payload === "asc" ? state.videogames2.sort((a,b)=>{
                        if(a.rating > b.rating) return 1
                        if(b.rating > a.rating) return -1
                        return 0
                    }):
                    state.videogames2.sort((a,b)=>{
                        if(a.rating > b.rating) return -1;
                        if(b.rating > a.rating) return 1;
                        return 0
                    })
                    return {
                        ...state,
                        videogames2: action.payload === "all"? state.allVideogames: rating
                    }
                    case "FILTER_BY_GENRES":
                        const allVGames = state.allVideogames;
                    
                        const genresFiltered = action.payload === "all" ? allVGames : allVGames.filter(e=> e.genres.some(ele=> ele.name === action.payload))
                        if(genresFiltered.length){
                        return {
                            ...state,
                            videogames2: genresFiltered 
                        }
                    }
                    else{
                        alert("Not videogames with this genre were found")
                        return {
                            ...state,
                            videogames2: state.allVideogames //**
                        }
                    }
                    case "FILTER_BY_ORIGIN":
                        const allVideogamesByOrigin = state.allVideogames;
                        let originFiltered;
                        if(action.payload === "All") originFiltered = allVideogamesByOrigin;
                        if(action.payload === "Api") originFiltered = allVideogamesByOrigin.filter(elem => elem.createdInDb === false)
                        if(action.payload === "Created") originFiltered = allVideogamesByOrigin.filter(elem => elem.createdInDb === true)
                        if(originFiltered.length){
                            return {
                                ...state,
                                videogames2: originFiltered,
                                msg: ""
                            }
                        }
                        else{
                            alert("There are not videogames created yet")
                            return {
                                ...state,
                                videogames2: state.allVideogamesByOrigin,
                        }
                    }
                        
                        case "FILTER":
                            let allVideogames = [...state.allVideogames]
                            const origin = action.payload.origin
                            const genre = action.payload.genre
                            
                            if(origin.length > 0){
                                if(origin === "Api") allVideogames = allVideogames.filter(elem => elem.createdInDb === false)
                                if(origin === "Created") allVideogames = allVideogames.filter(elem => elem.createdInDb === true)
                            } 
                            if(genre.length > 0){
                                allVideogames = genre === "all" ? allVideogames : allVideogames.filter(e=> e.genres.some(ele=> ele.name === genre))
                            }      
                            return{
                                ...state,
                                videogames2: allVideogames
                            }
                            case "DELETE_VIDEOGAME":
                            return{
                                ...state,
                                allVideogames: state.allVideogames.filter(e=> e.id !== action.payload)
                            }

                        default: return {...state}

        }
    }

