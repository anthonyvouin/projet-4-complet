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
      <header className="header">
        <nav className="nav">
          <ul className="nav-list">
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
        {listImage ? (
          <div className="grid">
            {listImage.map((list, index) => (
              <div key={index} className="image-item">
                <Link to={`/image/${list.url}`}>
                  <img src={serverAddress + list.name} alt="" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
