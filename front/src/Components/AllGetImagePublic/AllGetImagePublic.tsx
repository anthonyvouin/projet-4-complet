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
      <Link to="/createAccount"> Inscription</Link>
      <Link to="/login"> Connexion</Link>
      <Link to="/profil"> Profil</Link> <br />
      <div className="image-container">
        {listImage
          ? listImage.map((list) => (
              <img src={serverAddress + listImage[0].name} alt="" />
            ))
          : ""}
      </div>
    </>
  );
}
