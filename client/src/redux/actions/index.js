import axios from "axios";

//traigo todos los videojuegos
export function getVideogames (payload){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/videogames");
        dispatch({
            type: "GET_ALL_VIDEOGAMES",
            payload: json.data
        });
}
}
//traigo los generos
export function getGenres (){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/genres");
        dispatch({
            type: "GET_ALL_GENRES",
            payload: json.data
        });
    }
}
// buscar videojuegos
export function getVideogamesByName(name){
    return async function(dispatch){
        let json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
       
        if(json.data === "Videogame not found"){
            alert("Videogame not found")
        }
        else{
        dispatch({
            type: "GET_VIDEOGAME_BY_NAME",
            filter: Object.keys(name),
            payload: json.data
        })
    }
    }
}


//busco juegos por id card detail
export function getVideogamesByID(id){
    return async function(dispatch){
            let json = await axios.get(`http://localhost:3001/videogames/${id}`)
            dispatch({
                type: "GET_VIDEOGAMES_ID",
                payload: json.data
            })

    }
}

//Creo videojuegos 
export function createVideogame (payload){
return async function(dispatch){
    try{
        let json = await axios.post(`http://localhost:3001/videogames`, payload)
        dispatch({
            type: "CREATE_VIDEOGAME",
            payload: json.data
        })
    }catch(e){
        console.log(e)
    }
}
}

//RESET ID
export function resetID(){
    return {
        type: "RESET_ID"
    }
}

export function clearFilter(){
    return {
        type: "CLEAR_FILTER"
    }
}

// ORDENO POR NAME A-Z Y Z-A
export function OrderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}
//ORDENO POR RAITNG 
export function OrderByRating(payload){
    return{
        type: "ORDER_BY_RATING",
        payload
    }
}

//FILTRO POR GENERO
export function FilterGenres(payload){
return {
    type: "FILTER_BY_GENRES",
    payload
    }
}

// FILTER BY ORIGIN (API/CREATED)
export function FilterByOrigin(payload){
    return{
    type: "FILTER_BY_ORIGIN",
    payload
    }
}

export function Filter(origin,genre){
    return {
        type: "FILTER",
        payload:{origin,genre}
    }
}
// DELETE VIDEOGAME 
export function DeleteVideogame(paramsID){
    return async function (dispatch){
        let json = await axios.delete(`http://localhost:3001/videogames/${paramsID}`)
        dispatch({
            type: "DELETE_VIDEOGAME",
            payload: json.data
        })
    }
}