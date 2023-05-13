import React, { useState } from "react";
import Materiel from "../../Models/Materiel";
import Button from "@mui/material/Button"
import { Badge } from "@mui/material";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { imagePublic } from "../../Services/connexionService";

export default function CompteurComposent() {
    
   // let cpt: number = 0;

    const [cpt, setCpt] = useState<number>(0)
    const [nom, setNom] = useState<string>("nom")

    const [materiel, setMateriel] = useState<Materiel>({
        nom: "Souris",
        nombre : 1
    })

    function modifState() {
        setMateriel({
            ...materiel,
            nom: "Clavier Razer",
            nombre : 2
        })
    }



    return (<>
    
        <button onClick={() => { setCpt(cpt + 1) }}>Voici le nombre de clique : {cpt}</button>

        <ul>
            <li> {materiel.nom}</li>
            <li>{ materiel.nombre}</li>
        </ul>   

     

        <button onClick={modifState}>Nouvelle data: </button>
        
        <Button  variant="contained">Contained</Button>

        <ContactPhoneIcon />
        


    </>)
}