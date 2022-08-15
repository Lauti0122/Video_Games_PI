import React from 'react';
import { Link } from 'react-router-dom';
import style from "../Landing_page/LandingPage.module.css"

export default function LandingPage() {
    return (
        <div className={`${style.containerLanding}`}>
            {/* <img src={poro} alt="" width="100px" height="100px" /> */}
            <h1 className={`${style.tituloh1}`} >Welcome</h1>
            <h3 className={`${style.tituloh3}`}>Videogames App, built for true gaming lovers </h3>
            <Link className={`${style.containerboton}`} to="/home">
                <button className={`${style.boton}`}>Learn More</button>
            </Link>

        </div>
    )
}