import React, { useEffect } from "react";
import serverAddress from "../../Services/Utile";
import { useNavigate } from "react-router-dom";


export default function Profil() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  useEffect(() => {
    isAuthorised().then((res) => {
      console.log(res);
      if (res == "connexion refusée") {
        navigate("/");
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

  return (
    <>
      <p>Page Profil</p>
    </>
  );
}
