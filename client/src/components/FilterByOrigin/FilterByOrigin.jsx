import React from "react";
import { useDispatch } from "react-redux";
import {Filter} from "../../redux/actions"
import style from "../FilterByOrigin/FilterByOrigin.module.css"

export default function FilterOrigin ({setCurrentPage, genre, setOrigin}){
    const dispatch = useDispatch();

    function handleFilter(e){
        e.preventDefault(e)
        setOrigin(
            e.target.value
        )
        dispatch(Filter(e.target.value, genre))
        setCurrentPage(1)
    }

    return (
        <div>
           <select className={`${style.select}`} defaultValue={"default"} onChange={e => handleFilter(e)}>
                <option className={`${style.option}`} value={"default"} hidden>Origin</option>
                <option className={`${style.option}`} value="All">All</option>
                <option className={`${style.option}`} value="Api">Api</option>
                <option className={`${style.option}`} value="Created">Created</option>
            </select>
            <i></i>
        </div>
    )
}