import React from "react";
import Personne from "../../Models/Personne";
import { people } from "../../Assets/Data";

export default function ExoComponent(props : any) {
    
       const ListeDePersonne: Personne[] = people;
       
       const listeFiltre = ListeDePersonne.filter(ListeDePersonne => ListeDePersonne.profession === props.name);
       
       return (<>
       
        <p>Listes des objets</p>
        {listeFiltre.map(personne => (
            <ul key={personne.id}>
              <li>Name {personne.name}</li>
              <li>Job {personne.profession}</li>
              <li>HF {personne.accomplishment}</li>     
              <li>Image {personne.imageId}</li>               
 
            </ul>))}
       
       </>)

    
   
}