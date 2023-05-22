import React, { useEffect } from "react";
import serverAddress from "../../Services/Utile";

export default function Profil() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    isAuthorised().then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log("Erreur lors de la vérification du token :", error);
    });
  }, []);

  async function isAuthorised() {
    const url = serverAddress + "verify-token";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token, // Ajouter un espace après "Bearer"
        },
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error("Erreur lors de la requête de vérification du token : " + error);
    }
  }

  return (
    <>
      <p>Page Profil</p>
    </>
  );
}
