import React, { useState, useEffect } from "react";
import ImageUser from "../../Models/ImageUser";
import { imagePublic } from "../../Services/connexionService";
import serverAddress from "../../Services/Utile";
import { Link } from "react-router-dom";
import "./AllGetImagePublic.css";


export default function AllGetImagePublic() {

    const [listImage, setListeImage] = useState<ImageUser[]>();
    useEffect(() => {
        imagePublic().then((res) => {
            setListeImage(res);
        });
    }, []);


 return (
   <>
     <header>
       <nav>
         <ul>
           <li>
             <Link to="/createAccount">Inscription</Link>
           </li>
           <li>
             <Link to="/login">Connexion</Link>
           </li>
           <li>
             <Link to="/profil">Profil</Link>
           </li>
         </ul>
       </nav>
     </header>
     <div className="image-container">
       {listImage
         ? listImage.map((list, index) => (
             <div>
             <Link to={`/image/${list.url}`}>

                 <img key={index} src={serverAddress + list.name} alt="" />
               </Link>
             </div>
           ))
         : ""}
     </div>
   </>
 );

}
