import React from 'react'
import Materiel from '../../Models/Materiel';
import ComponentWithProps from '../ComponentWithProps/ComponentWithProps';

export default function InformationComposent() {
    
    // const text : string = "";
    const compteur: number = 77;
    // const table : number[] = [1]

    const monObjetJS = {
        nom: "Clavier",
        nombre: 1,
        utilisation: {
            ordinateur: "oui",
            phone: "non"
        }
    }

    const monObjetTS: Materiel = {
        nom: "Souris",
        nombre: 1,
        utilisation: [true, false, true, true]

    }
    
    // let variable: boolean = false;



    return (<>
    
        Nombre de clique : {monObjetJS.utilisation.ordinateur} 
        Nombre d'objet : <ComponentWithProps compteur = {compteur} nom = {monObjetTS.nom} ></ComponentWithProps>
        
    </>)
}