import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector, } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {getGenres, createVideogame} from '../../redux/actions'
import style from "./CreateVideogame.module.css";
import {DefaultImageCard} from "../../components/assets/services"

export default function CreateVideogame (){
    const dispatch = useDispatch()
    const history = useHistory()

    const Genres = useSelector(state=> state.genres)
    const videogames = useSelector (state=> state.allVideogames)

    //ESTADO PARA LOS ERRORES
    const [error, setError] = useState({})
    const [genre, setGenre] = useState([])

//   renderizo los generos del select
    useEffect(()=>{
    /* dispatch(getVideogames()) */ // traigo videojuegos para acceder a las platforms
    dispatch(getGenres());
    }, [dispatch])

    

    const [input, setInput] = useState({
        name: '',
        release_date: '',
        description: '',
        rating:'',
        background_image: '',
        genres: [],
        platforms: []
    })

// ME TRAIGO PLATFORMS DESDE LA API A UN NUEVO ARRAY 

    let platforms1 = ['PC', 'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'Xbox 360', 'Xbox One', 'macOS', 'Android', 'iOS', 'Linux', 'PS Vita', 'Wii U']
    let platforms2 = platforms1.map((el,id)=>{
        return{
            name: el,
            id: id
        }
    })

    // ----------error validation-----------------
    function validation (input){
        
        let error ={}
        const regAlfNum = /^[a-zA-Z0-9\s]{3,20}$/g;
        const regURL = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg|webp)/g;
        
        if(!input.name) error.name = "Name is required";

        if(input.name && !regAlfNum.test(input.name)) error.name = "Name (3-20) characters / (!@'+/)";

        if(input.rating && input.rating < 1 || input.rating > 5) error.rating = "Only numbers (1-5)";

        if(input.background_image && !regURL.test(input.background_image)) error.background_image = "Invalid URL"
        
        if(!input.description) error.description = "Description is required";
        
        if(!input.release_date) error.release_date = "Enter Release Date";
        
        if(!input.genres.length) error.genres = "Required Field";
        
        if(!input.platforms.length) error.platforms = "Required Field";
        
        return error;
    }

    function handleChange (e){
        e.preventDefault()
       /* console.log(e) */
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setError(validation({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

// ---------------------HANDLE_SELECT_GENRES-------------------
    function handleSelectGenres (e){
        e.preventDefault()
      console.log(e)
        if(e.target.value){
            if(!input.genres.includes(e.target.value) && input.genres.length < 3){
                const gName = Genres.find(g=> g.id === parseInt(e.target.value))
                setGenre([
                    ...genre,
                     gName
                ])
                setInput({
                    ...input,
                    genres: [...input.genres, e.target.value]
                })
            }
            else{
            {alert("Only up to 3 genres can be selected")}
            }
        }
    }
    function handleDeleteGenres (e){
        setInput({
            ...input,
            genres: input.genres.filter(elem=> elem !== e.target.value)
        }
        )
        setGenre(
             genre.filter(elem => elem.id !== parseInt(e.target.value))
        )
    }

// ----------------HANDLE_SELECT_PLATFORMS-------------------
    function handleSelectPlatforms(e){
        if(e.target.value){
            if(!input.platforms.includes(e.target.value)){
                setInput({
                    ...input,
                    platforms: [...input.platforms, e.target.value]
                })
            }
        }
    }
    function handleDeletePlatforms (p){
        setInput({
            ...input,
            platforms: input.platforms.filter(elem => elem !== p)
        })
    }

/* ------------------HANDLE_SUBMIT----------------- */
    function handleSubmit(e){
        e.preventDefault();
        if (!Object.keys(error).length){
            if(input.background_image.length === 0) input.background_image = DefaultImageCard
            if(input.rating === '') input.rating = 1
            input.genres = input.genres.map(e=> parseInt(e))
            input.rating = parseInt(input.rating)
            dispatch(createVideogame(input))
            /* videogames.push(input) */
            history.push("/home")
    }
    else{
        alert("Missing data")
    }
    }
    return (
    <div className={`${style.ancho}`}>
        <div className={`${style.contenedorTodo}`}>

            <h1 className={`${style.h1}`}>Crea tu videojuego</h1>

            <Link className={`${style.containerbtn}`} to={"/home"}> <button className={`${style.btn}`}>Back Home</button> </Link>
            
 {/* ---------------------------FORM--------------------------------- */}
            <form className={`${style.contenedorFormulario}`} onSubmit={(e)=>handleSubmit(e)}>
                {/* --------------------NAME------------------- */}
                <div className={`${style.componentesFormulario}`}>
                    <label className={`${style.Label}`}>Name:</label>
                    <input
                    className={`${style.parteFormulario}`}
                    placeholder="Name..."
                    type="text" 
                    name="name"
                    value={input.name}
                    onChange={e => handleChange(e)}
                    />
                    {error.name && <p className={`${style.error}`}>{error.name}</p>}
                </div>
                {/* --------------------RELEASE DATE------------------- */}
                <div className={`${style.componentesFormulario}`}>
                    <label className={`${style.Label}`} >Release Date:</label>
                    <input 
                    className={`${style.parteFormulario}`}
                    type="date" 
                    name="release_date"
                    value={input.release_date}
                    onChange={e => handleChange(e)}
                    />
                    {error.release_date && <p className={`${style.error}`}>{error.release_date}</p>}
                </div>
                {/* --------------------RATING------------------- */}
                <div className={`${style.componentesFormulario}`}>
                    <label className={`${style.Label}`}>Rating</label>
                    <input 
                    className={`${style.parteFormulario}`}
                    type="number" 
/*                     min="1" 
                    max="5"  */
                    placeholder="1-5"
                    name="rating"
                    value={input.rating}
                    onChange={e => handleChange(e)}
                    />
                    {error.rating && <p className={`${style.error}`}>{error.rating}</p>}
                </div>
                {/* --------------------IMG------------------- */}
                <div className={`${style.componentesFormulario}`}>
                    <label className={`${style.Label}`}>Image:</label>
                    <input 
                    className={`${style.parteFormulario}`}
                    placeholder="Image URL..."
                    type="text" 
                    value={input.background_image}
                    name="background_image"
                    onChange={handleChange}
                    />
                    {error.background_image && <p className={`${style.error}`}>{error.background_image}</p>}
                </div>
                {/* ---------------SELECT GENRES-------------- */}
                <div className={`${style.componentesFormulario}`}>
                    <select className={`${style.parteFormulario}`} name="" defaultValue="Genres" onChange={e => handleSelectGenres(e)}>
                    <option disabled value="Genres">Genres</option>
                    {Genres.map(g =>(<option key={g.id} name={g.name} value={g.id}> {g.name} </option>))}
                    </select> 
                    {error.genres && <p className={`${style.error}`}>{error.genres}</p>}
                </div>
               
                {/* ---------------SELECT PLATFORMS-------------- */}
                <div className={`${style.componentesFormulario}`}>
                    <select className={`${style.parteFormulario}`} name="" defaultValue="Platforms" onChange= {e=>handleSelectPlatforms(e)}>
                        <option disabled value="Platforms">Platforms</option>
                        {platforms2.map((p)=> (<option key ={p.id} value={p.name}> {p.name} </option>))}
                    </select>
                    {error.platforms && <p className={`${style.error}`}>{error.platforms}</p>}
                </div>


                    {/*--------------- MUESTRO PLATFORMS Y GENRES SELECCIONADOS----------- */}
                    <div className={`${style.contenedorPlatGenr}`} >
                <div>
                    <p className={`${style.Label}`}>Genres:</p>
                     {genre.map(g=>
                        <div key={g.id} className={`${style.contPG}`}> 
                        {g.name} <button type="button" value={g.id} className="buttonEliminarSelect" onClick={handleDeleteGenres} >X</button>
                        </div>
                    )}

                </div>

                        <div>
                            <p className={`${style.Label}`}>Platforms:</p>
                            {input.platforms.map(p=>
                                <div key={p} className={`${style.contPG}`}> 
                                 {p} 
                                <button className="buttonEliminarSelect" onClick={()=> handleDeletePlatforms(p)}>X</button>
                                </div>
                                )}
                        </div>

                    </div>
                {/* --------------------DESCRIPTION------------------- */}

                <div className={`${style.componentesFormulario}`}>
                    <label className={`${style.inputComentario}`} > Description:</label> <br/>
                    <textarea 
                    className={`${style.inputComentario}`}
                    name="description" 
                    value={input.description}
                    cols="84" rows="10"
                    onChange={e => handleChange(e)}
                    ></textarea>
                    {error.description && <p className={`${style.error}`}>{error.description}</p>}
                </div>
                {/* --------------------SUBMIT------------------- */}
                <button className={`${style.inputBoton}`} type="submit"> CREATE</button>
            </form>
        </div>
        </div>
    )
}