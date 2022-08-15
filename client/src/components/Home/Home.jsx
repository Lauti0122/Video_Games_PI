import React from "react"
import { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {getVideogames, getGenres, resetID} from "../../redux/actions/index"
import Card from "../Card/Card.jsx";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";
import Order_Name from "../OrderByName/OrderByName";
import OrderByrating from "../OrderByRating/OrderByrating";
import FilterByGenres from "../FilterByGenres/FilterByGenres";
import FilterOrigin from "../FilterByOrigin/FilterByOrigin";
import VideogameNotFound from "../VideogameNotFound/VideogameNotFound";
import style from "./Home.module.css";
import Filters from "../Filters/Filters";


export default function Home(){
    const dispatch = useDispatch()
    const videogames = useSelector(state => state.allVideogames)
    const allVideogames2 = useSelector(state => state.videogames2)
    const allGenres = useSelector(state => state.genres)
    const [orden, setOrden] = useState('');
    const[origin, setOrigin] = useState('');
    const[genre, setGenre] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if(videogames?.length < 1 ){
        dispatch(getVideogames())}
        dispatch(getGenres())
/*         dispatch(resetID()) */
    }, [dispatch, videogames])

    const indexOfLast = currentPage * videogamesPerPage; // inicialmente 15 
    const indexOfFirst = indexOfLast - videogamesPerPage; // inicialmente 0
    const currentVideogames = allVideogames2.slice(indexOfFirst, indexOfLast);
   
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



     if(allVideogames2 && loading){
        setLoading(false)
    }

    if(videogames?.length > 0 && !loading){

        if(currentVideogames.length < 1) return <VideogameNotFound/>
        return(
            <div className={`${style.divContainer}`}>
    {/* -----------------------------------NAVBAR---------------------------------------- */}
                <div className={`${style.navBar}`}>
                <NavBar
                setCurrentPage={setCurrentPage}
                setOrden={setOrden}
                orden={orden}
                allGenres={allGenres}
                />
                </div>
    {/*--------------------------- FILTROS Y ORDENAMIENTOS------------------------------- */}
            <div className={`${style.conatinerFilters}`}>
          
            {/* <Filters
            allGenres={allGenres}
            setCurrentPage={setCurrentPage}
            setOrden={setOrden}
            /> */}
            <Order_Name
            className={`${style.orderANDfilter}`}
            setCurrentPage={setCurrentPage}
            setOrden={setOrden}
            orden={orden}
            />
         
            <OrderByrating
            className={`${style.orderANDfilter}`}
            setCurrentPage={setCurrentPage}
            setOrden={setOrden}
            />
            <FilterByGenres
            className={`${style.orderANDfilter}`}
            setCurrentPage={setCurrentPage}
            allGenres={allGenres}
            origin={origin}
            genre={genre}
            setGenre={setGenre}
            setOrigin={setOrigin}
            />
              <FilterOrigin
            className={`${style.orderANDfilter}`}
            setCurrentPage={setCurrentPage}
            origin={origin}
            genre={genre}
            setGenre={setGenre}
            setOrigin={setOrigin}
            /> 
    
        </div>
    {/* -----------------------------------PAGINADO1-------------------------------------- */}
            {/* Paginado TOP*/}

            <div className={`${style.paginadoTop}`}>
                {allVideogames2 && allVideogames2.length > 15 &&
                <Paginado
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames2.length}
                paginado={paginado}
                currentPage={currentPage}
                setcurrentPage={setCurrentPage}
                />
    }
            </div>
    {/* -----------------------------------CARDS----------------------------------------- */}
                <div className={`${style.cardsContainer}`}>
                {currentVideogames?.map(vg =>{
                    return(
                        <div key={vg.id} className={`${style.cards}`}>
                        <Card
                        id={vg.id}
                        name={vg.name}
                        background_image={vg.background_image}
                        platforms={vg.platforms}
                        genres={vg.genres}
                        rating={vg.rating} />
                        </div>      
                    )})}
                </div>
    {/* -----------------------------------PAGINADO2-------------------------------------- */}
                <div className={`${style.paginadoBottom}`}>
                {allVideogames2 && allVideogames2.length >15 &&
                <Paginado
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames2.length}
                paginado={paginado}
                currentPage={currentPage}
                setcurrentPage={setCurrentPage}
                />
                } 
                </div>
            </div>
        )
        
}
    return (
        <Loading/>
    )
}


