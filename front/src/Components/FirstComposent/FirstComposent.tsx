import React from 'react'
import "./Style.css"


export default function FirstComponent() {

    // fonctions

    return (<>
        <div>Premier composant</div>
       <TestComponentSeconde></TestComponentSeconde>
        
    </>)
}




export function TestComponentSeconde(){    
    return (
        <p>Deuxieme composant</p>
    )
}