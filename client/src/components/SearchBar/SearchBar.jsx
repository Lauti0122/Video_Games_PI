import React from "react";
import {getVideogamesByName} from "../../redux/actions";
import { useState} from "react";
import { useDispatch} from "react-redux";
import style from "../SearchBar/SearchBar.module.css";

export default function SearchBar ({setCurrentPage}){
const dispatch = useDispatch();
/* const videogames = useSelector(state => state.videogames2) */
const [name, setName] = useState("");

function handleChange(e){
    setName(e.target.value)
}
function handleSubmit(e){
    e.preventDefault();
    if(name.length){
    dispatch(getVideogamesByName(name))
    setCurrentPage(1)
    setName("")
    }
    else{
        alert ("Enter videogame")
    }
}

return(
    <div>
                <form  onSubmit={handleSubmit}>
                    <div className={`${style.searchBar}`}>
                        <input
                        className={`${style.input}`}
                         placeholder="Search Videogame..."
                         type="text"
                         id="name"
                         autoComplete="off"
                         value={name}
                         onChange={e=> handleChange(e)}
                         />
                        <button className={`${style.btn}`} type="submit" onClick={(name)=> getVideogamesByName(name)}><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>

                </form>
               
    </div>
)
}