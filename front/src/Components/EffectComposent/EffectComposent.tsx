import React, { useState } from "react";
import { useEffect } from "react";

export default function EffectComposent() {
    
    const [nombre, setNombre] = useState<number>(0);

    useEffect(() => {
        
        console.log("composant monte")
        console.log(nombre)
        setNombre(nombre + 1)
    },[])

    return (<>
    
    <p>test</p>
        
    </>);
}

