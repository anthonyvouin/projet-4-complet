import React, { useState } from "react";
import Users from "../../Models/Users";
import { useNavigate } from "react-router-dom";
import serverAddress from "../../Services/Utile";
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function submit() {
    let data: Users = {
      email,
      password,
    };

    const url = serverAddress + "login";
      
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
        const responseData = await response.json();
        const token = responseData.token;
        console.log(token);

        localStorage.setItem("token", token);
      
      // Effectuer d'autres actions en fonction de la réponse
      navigate("/profil");
    } catch (error) {
      console.log(error);
    }
  }

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: any) {
    setPassword(event.target.value);
  }

  return (
    <>
      <div className="container-login">
        <h1>Page de connexion</h1>

        <input
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="login-input"
        ></input>
        <input
          type="password"
          placeholder="Mot de passe"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="login-input"
        ></input>
        <button onClick={submit} className="login-button">
          Se connecter
        </button>
      </div>
    </>
  );
}
