import React from "react";

export default function ButtonComposent({compteur } :any) {
    function handleClickButton() {
        alert("message" + compteur);
    }
    
    return (<>
        <button onClick={handleClickButton}>Mon button d'alerte</button>
        
       <div onClick={() => { alert('div')}} >
        <button onClick={(event) => { event.stopPropagation(); alert('bouton 1')}}>Mon bouton d'alerte</button>
        <button onClick={(event) => { event.stopPropagation(); alert('bouton 2')}}>Mon bouton d'alerte</button>
</div>
    </>);
}