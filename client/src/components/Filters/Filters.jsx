import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FilterGenres, FilterByOrigin, OrderByName, OrderByRating} from "../../redux/actions";
import style from "./Filters.module.css";
import {getVideogames, getGenres} from "../../redux/actions";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

export default function Filters({setCurrentPage,allGenres,setOrden}){
    const dispatch = useDispatch()
    const [/*order*/, setOrder] = useState('')
    const [loader, setLoader] = useState(false)


useEffect(() => {
    dispatch(getVideogames())
    dispatch(getGenres())

}, [dispatch])

const handleFilterGenre = (e) => {
    dispatch(FilterGenres(e.target.value))
    setCurrentPage(1)
    // setOrder('')
  }

const handlerFilterCreated = (e) => {
    dispatch(FilterByOrigin(e.target.value))
    setCurrentPage(1)
  }

const handleOrderName = (e) => {
    dispatch(OrderByName(e.target.value))
    setCurrentPage(1)
    setOrden(`orden ${e.target.value}`)
  }

const handlerOrderRating = (e) => {
    console.log(e.target.value)
    dispatch(OrderByRating(e.target.value))
    setCurrentPage(1)
    setOrden(`orden ${e.target.value}`)
  }

const handleClick = (e) => {
    setLoader(true)
    e.preventDefault();
    dispatch(getVideogames());
    setTimeout(() => {
      setLoader(false)
    }, 5000)
    setCurrentPage(1)
    setOrder('')
  }
  return (
    <div>
      {
        loader ? <Loading /> :
      <div className={style.filtersContainer}>
        
        {/*ORDER BY NAME */}
        <div>
             <select defaultValue="all" className={`${style.select}`} onChange={handleOrderName}>
                <option disabled value="all">Order</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
            <i></i>
        </div>

        {/* FILTER BY ORIGIN  */}
        <div>
           <select className={`${style.select}`} defaultValue={"default"} onChange={e =>handlerFilterCreated(e)}>
                <option className={`${style.option}`} value={"default"} hidden>Origin</option>
                <option className={`${style.option}`} value="All">All</option>
                <option className={`${style.option}`} value="Api">Api</option>
                <option className={`${style.option}`} value="Created">Created</option>
            </select>
            <i></i>
        </div>

        {/* FILTER BY GENRE */}
        <div>
             {
           <select className={`${style.select}`} onChange={e => handleFilterGenre(e)}>
                <option className={`${style.option}`} value="all">Genres</option>
                    {allGenres?.map((ele) => {
                          return (
                              <option key={ele.id} value={ele.name}  >
                                  {ele.name} 
                              </option>
                           );
                      })}
            </select>
            }
            <i></i>
        </div>

        {/* ORDER BY RATING */}
        <div className="containerRating">
        <select defaultValue="all" className={`${style.select}`} onChange={handlerOrderRating}>
            <option disabled value="all">Order By Rating</option>
            <option value="asc">Rating 0 - 5 </option>
            <option value="desc">Rating 5 - 0</option>
        </select>
        <i></i>
        </div>

{/*         <div>
          <button className={style.buttonReset} onClick={(e) => handleClick(e)}>Limpiar Filtros</button>
        </div> */}
      </div>
      }
    </div>
  );
}