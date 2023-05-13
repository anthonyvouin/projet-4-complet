import React from "react";
import Materiel from "../../Models/Materiel";

export default function MapComponent() {

    const ListeDeMateriels: Materiel[] = [{
        nom: "Souris",
        nombre: 2,
        utilisation: [true]
    }, {
        
        nom: "Chaise",
        nombre: 22,
        utilisation: [false]
    
    }
    ];

    const listeFiltre = ListeDeMateriels.filter(ListeDeMateriels => ListeDeMateriels.nom === "Souris");



    const listeDesPrenoms: Array<string> = ["Naruto", "Sasuke", "Itachi"]
    return (<>
    
        {listeDesPrenoms.map(listeDesPrenom => (<p>{listeDesPrenom}</p>))}
        <p>Listes des objets</p>
        {ListeDeMateriels.map(materiel => (
            <ul>
                <li>Nom de l'objet { materiel.nom}</li>
                <li>Nombre d'objet { materiel.nombre}</li>
               
            </ul>))}
        
        <p>Listes des souris</p>
        {listeFiltre.map(filtre => (
            <ul>
                <li>Nom :  { filtre.nom}</li>
            </ul>
        ))}
    </>);
}