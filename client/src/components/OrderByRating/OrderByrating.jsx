import React from "react";
import {useDispatch} from "react-redux";
import {OrderByRating} from "../../redux/actions";
import style from "../OrderByRating/OrderByRating.module.css";

export default function OrderRating({setCurrentPage, setOrden}){
    const dispatch = useDispatch();

    function handleOrderRating(e){
        e.preventDefault()
        dispatch(OrderByRating(e.target.value))
        setCurrentPage(1)
        setOrden(`orden ${e.target.value}`)

    }
    return (
        <div className="containerRating">
        <select defaultValue="all" className={`${style.select}`} onChange={e =>{handleOrderRating(e)}}>
            <option disabled value="all">Order By Rating</option>
            <option value="asc">Rating 0 - 5 </option>
            <option value="desc">Rating 5 - 0</option>
        </select>
        <i></i>
        </div>
    )
}