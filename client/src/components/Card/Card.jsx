import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
export default function Card({ name, background_image, id, genres, rating, platforms}){
    return(
        <div className={`${style.containerCard}`}>
            <Link className={`${style.linkCard}`} to={`/home/${id}`}>
            <div className={`${style.content}`}>


            {/* ----------------------MUESTRO IMG----------------------- */}
            <img className={`${style.imgCard}`} src={background_image} width="250px" height="250px"/>

            {/* ----------------------MUESTRO NAME----------------------- */}
            <div className={`${style.containerTitle}`}>
                <h2 className={`${style.titulo}`}>{name}</h2>
            </div>

            {/*-------------- mapeo y muestro plataformas---------------- */}
             <div className={`${style.containerPG}`}>
                <p className={`${style.titlePG}`}> Platforms: </p>
                {platforms?.map((p,i) => {
                    return (
                        <div className={`${style.letra_pg}`} key={i}>
                            {` ${p} |`}
                        </div>
                )
                })}
            </div> 

            {/*------------------ mapeo y muestro generos----------------- */}
            <div className={`${style.containerPG}`}>
                <p className={`${style.titlePG}`}>Genres:</p>
                {genres.map(genre => {
                    return (
                        <div className={`${style.letra_pg}`} key={genre.name}>
                            {`| ${genre.name} |`}
                        </div>
                )
                })}
                </div>

                {/*--------------------- MUESTRO RATING------------------- */}
                <div className={`${style.footerCard}`}>
                <h4 className={`${style.rating}`}><i class="fa-solid fa-star"></i>  {rating}</h4>
                </div>

            </div>
                </Link>
        </div>
)}