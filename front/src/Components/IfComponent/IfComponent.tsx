import React from "react";

export default function IfComponent() {
    
    let Istrue : boolean= true;

    if (Istrue) {
        return(<p>Variable True</p>)
    } else if (!Istrue) {
        return(<p>Variable False</p>)
    }

    return (<>
    
    </>)
   
}