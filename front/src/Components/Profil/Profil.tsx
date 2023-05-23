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
  const [droppedImage, setDroppedImage] = useState("");
  const [imageFile, setImage] = useState<Blob | string>();

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

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const imageFile = e.dataTransfer.files[0];
    console.log(imageFile.name);
    const imageUrl = URL.createObjectURL(imageFile);
    setDroppedImage(imageUrl);
    setImage(imageFile);
  };

  function sendImage() {
    const url = serverAddress + "images"; // URL de l'endpoint de réception du fichier
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " +token,
      },
      body: formData,
    })
      .then((response) => {
        // Gérer la réponse de la requête ici
      })
      .catch((error) => {
        // Gérer les erreurs ici
      });
  }

  return (
    <>
      <h1>Page Profil</h1>
      <button onClick={deconnexion}>Se déconnecter</button>
      <br />

      <div>
        {" "}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{ width: "300px", height: "300px", border: "1px solid black" }}
        >
          {droppedImage ? (
            <img
              src={droppedImage}
              alt="Dropped Image"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <p>Drag and drop an image here</p>
          )}
        </div>
        <button onClick={sendImage}>Envoyer l'image</button>
      </div>

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
