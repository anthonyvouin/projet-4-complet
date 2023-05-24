import React, { useEffect, useState } from "react";
import serverAddress from "../../Services/Utile";
import { useNavigate } from "react-router-dom";
import "./Profil.css";


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
        Authorization: "Bearer " + token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData: ImageUser) => {
        setListeImage((prevState) => [...prevState!, responseData]);
        setDroppedImage("");
      })
      .catch((error) => {
        // Gérer les erreurs ici
      });
  }

  function deleteAccount() {
    const url = "http://localhost:3000/account";

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        // Gérer la réponse de la requête ici
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        // Gérer les erreurs ici
      });
  }

  function deleteImage(id: string | undefined) {
    const url = "http://localhost:3000/deleteImage/" + id;

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(() => {
        setListeImage((prevState) =>
          prevState!.filter((image) => image.id !== id)
        );
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
          style={{
            width: "500px",
            height: "500px",
            border: "1px solid black",
            marginLeft: "510px",
          }}
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
                <p>{list.isPublic ? "Public" : "Privé"}</p>
                <img key={index} src={serverAddress + list.name} alt="" />
                <button onClick={() => changeVibility(list.id)}>
                  Changer la visibilité
                </button>
                <button
                  onClick={() => deleteImage(list.id)}
                  style={{ backgroundColor: "purple" }}
                >
                  Supprimer une image
                </button>
              </div>
            ))
          : ""}
      </div>

      <button onClick={deleteAccount} style={{ backgroundColor: "red" }}>
        Supprimer le compte
      </button>
    </>
  );
}
