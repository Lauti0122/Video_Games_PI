import React from "react";
import style from "./Paginado.module.css"

export default function Paginado({paginado, videogamesPerPage, currentPage, allVideogames}) {
    const pageNumber = []   
                                                        // [1,2,3,4,5]
    for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {   
        pageNumber.push(i)
        }

   
    return (
        <nav className={`${style.nav}`}>

             {/* DESHABILITA EL BOTON INICIO */}
            <div className={`${style.divPagination}`}>
            {currentPage === 1 
            ? null
            : currentPage > 1 && <button className={`${style.pageItem} ${style.num}`} onClick={() => paginado(currentPage - 1)}>&lt;</button>}
        
            {pageNumber && pageNumber.map(number => (
                <button onClick={() => paginado(number)} className={ number === currentPage ? `${style.current} ${style.num}` : `${style.pageItem} ${style.num}`} key={number}>
                {number}
                </button>
                ))}

                {/* DESHABILITA EL BOTON FINAL */}
                    {currentPage === pageNumber.length 
                    ? null
                    : currentPage <= pageNumber.length - 1 && <button className={`${style.pageItem} ${style.num}`} onClick={() => paginado(currentPage + 1)}>&gt;</button>}
            </div>
        </nav>
    )
}