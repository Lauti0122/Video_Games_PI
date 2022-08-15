import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getVideogamesByID, resetID, DeleteVideogame} from '../../redux/actions/index'
import {useHistory } from 'react-router-dom';
import style from "../Detail/Detail.module.css";
import Loading from '../Loading/Loading';
import { useState } from 'react';


export default function Detail (props){
    const dispatch = useDispatch();
    const history = useHistory()

    const videogameDetail = useSelector(state=> state.VideogameByID) // global state {}  
    const paramsID = props.match.params.id 
    const [loading, setLoading] = useState(true);


    console.log(videogameDetail)

    useEffect(()=>{
        dispatch(getVideogamesByID(paramsID))
       /*  return () => {dispatch(resetID())}  */
       dispatch(resetID())
    }, [dispatch,paramsID])

    /* DELETE */
    function HandleDelete(){
        dispatch(DeleteVideogame(paramsID))
        alert("Videojuego eliminado")
        history.push("/home")
    }

    if(videogameDetail && loading){
        setLoading(false);
    } 
    if(videogameDetail.name && !loading){
    return(
    
<div className={`${style.bkg}`}>
          {/*---------------------- BUTTON BACK-------------------------- */}
    <button onClick={()=> history.push("/home")} className={`${style.back}`} >BACK HOME</button>

         <div>
        {paramsID.length > 30 &&
        <button onClick={HandleDelete}>DELETE</button>
        }
         </div>

  <div className={`${style.conatinerCard}`}>
          {/*-------------------- IMG------------------------------------ */}
        <div className={`${style.img}`}><img src={videogameDetail.background_image} /></div>

        <div className={`${style.contH1}`} key={videogameDetail.id}> <h1>{videogameDetail.name}</h1></div>

        <div className={`${style.containerGenres}`}>
            <p>Genres:</p>
            <div className={`${style.Genres}`}>
                {videogameDetail.genres?.map(g=> {
                    return <div className={`${style.Genre}`} key={g.name}> | {g.name} | </div>
                })}
            </div>
        </div>

        <div className={`${style.containerPlatforms}`}>
            <p>Platforms:</p>
            <div className={`${style.Platforms}`}>
                {videogameDetail.platforms?.map((p,i)=>{
                    return <div className={`${style.Platform}`} key={i}> {p} |</div>
                })}
            </div>

        </div>

        <div className={`${style.description}`} dangerouslySetInnerHTML ={{__html: videogameDetail.description}}></div>

        <div className={`${style.released}`}> <h3>Release Date: {videogameDetail.released}</h3></div>

        <div className={`${style.rating}`}> <h2> <i class="fa-solid fa-star"></i> {videogameDetail.rating}</h2> </div>
  </div>
</div>
    )
    }
    return(
        <Loading/>
    )
}
