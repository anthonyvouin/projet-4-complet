import React from "react";

export default function ComponentWithProps( props : any) {
    
    
    return (
        <>
        {props.compteur} {props.nom}
        </>
    );
}