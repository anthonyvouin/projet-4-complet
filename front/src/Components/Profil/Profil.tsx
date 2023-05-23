import React, { useEffect, useState } from "react";
import serverAddress from "../../Services/Utile";
import { useNavigate } from "react-router-dom";
import {
  changeVisibilityImageUser,
  imageByUser,
} from "../../Services/connexionService";
import ImageUser from "../../Models/ImageUser";

export default function Profil() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [listImage, setListeImage] = useState<ImageUser[]>();

  useEffect(() => {
    isAuthorised().then((res) => {
      console.log(res);
      if (res == "connexion refusée") {
        navigate("/");
      }
    });

    imageByUser().then((res) => {
      console.log(res);
      if (res.response !== "Authentification invalide") {
        setListeImage(res);
      }
    });
  }, []);

  async function isAuthorised() {
    const url = serverAddress + "verify-token";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const responseData = await response.json();
    return responseData.response;
  }

  function deconnexion() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function changeVibility(id: string | undefined) {
    changeVisibilityImageUser(id).then((res) => {
      console.log(res);
      setListeImage((prevState) => {
        const updatedList = prevState!.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isPublic: !item.isPublic,
            };
          }
          return item;
        });

        return updatedList;
      });
    });
  }

  return (
    <>
      <h1>Page Profil</h1>
      <button onClick={deconnexion}>Se déconnecter</button>
      <br />

      <div className="image-container">
        {listImage
          ? listImage.map((list, index) => (
              <div>
                <button onClick={() => changeVibility(list.id)}>
                  Changer la visibilité
                </button>

                <p>{list.isPublic ? "Public" : "Privé"}</p>
                <img key={index} src={serverAddress + list.name} alt="" />
              </div>
            ))
          : ""}
      </div>
    </>
  );
}
