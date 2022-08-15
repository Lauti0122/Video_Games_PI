import React from "react";
import {useDispatch} from "react-redux";
import {FilterGenres, Filter} from "../../redux/actions"
import style from "../FilterByGenres/FilterByGenres.module.css";

export default function FilterByGenres({setCurrentPage, allGenres, origin, setGenre,}){
    const dispatch = useDispatch()


    function handleFilter(e){
        e.preventDefault(e)
        setGenre(
            e.target.value
        )
        dispatch(Filter(origin, e.target.value))
        setCurrentPage(1)
    }

    return (
        <div>
             {
           <select className={`${style.select}`} onChange={e => handleFilter(e)}>
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
    )
}