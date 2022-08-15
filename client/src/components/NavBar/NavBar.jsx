import React from "react";
import SearchBar from "../SearchBar/SearchBar"
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import lol from "../assets/lol.jpg";
export default function NavBar({setCurrentPage,handleClick}){

    function handleRefresh(){
        window.location.reload()
     }

     //HANDLECLICK O HANDLE REFRESH FALTA DEFINIR
return(
    <nav className={`${style.containerNav}`}>
        
        <div className={`${style.containerVGApp}`}>
        <button onClick={handleRefresh} className={`${style.VGApp}`}> VG <img className={`${style.poro}`} src={lol} width="38px" height="38px" /> </button>
        </div>

        {/* SEARCH BAR */}
        <div className={`${style.SearchBar}`}>
        <SearchBar
        setCurrentPage={setCurrentPage}
        />
        </div>
    
        {/* CREATE VIDEOGAME */}

        <div className= {`${style.conatinerCVGame}`}>
            <Link className= {`${style.Link}`} to={"/create"}> <h1 className={`${style.createVideogame}`}> Create Videogame </h1> </Link>
        </div>
    </nav>
)
}