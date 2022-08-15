import React from "react";
import { useDispatch } from "react-redux";
import {OrderByName} from "../../redux/actions";
import style from "../OrderByName/OrderByName.module.css"

export default function Order_Name({setCurrentPage, setOrden}){
    const dispatch = useDispatch();

    function handleOrderName(e){
        e.preventDefault();
        dispatch(OrderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`orden ${e.target.value}`)
    }
    return(
        <div>
             <select defaultValue="all" className={`${style.select}`} onChange={e =>{handleOrderName(e)}}>
                <option disabled value="all">Order</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
            <i></i>
        </div>
    )
}
