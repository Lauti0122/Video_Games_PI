import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {clearFilter} from "../../redux/actions";
import style from "../VideogameNotFound/NotFound.module.css"

export default function VideogameNotFound(){

    const dispatch = useDispatch();
    function HandleReset(){
        dispatch(clearFilter())
    }
    return (
        <div className={`${style.container}`}>
        <h1  className={`${style.h1}`}> 404 </h1>
        <h2 className={`${style.h2}`}>No Videogames Found</h2>
            <button onClick={HandleReset} className={`${style.back}`}>Go Back</button>
            <Link className={`${style.link}`} to={"/create"}>
            <button  className={`${style.back}`}>Create Videogame</button>
            </Link>
    </div>
    )
}