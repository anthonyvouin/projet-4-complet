import React, { useState } from "react";
import Users from "../../Models/Users";
import { useNavigate } from "react-router-dom";
import serverAddress from "../../Services/Utile";


export default function NewAccount() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    function submit() {
        let data: Users = {
            email,
            password
        };

    const url = serverAddress + "account";
        fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        }).then(() => {
        navigate("/");
        });


    }

    function handleEmailChange(event: any) {
        setEmail(event.target.value);
    }

     function handlePasswordChange(event: any) {
       setPassword(event.target.value);
     }


  return (
    <> 
              <div className="container">

      <h1>Page de création</h1>

      <input
        type="text"
        placeholder="Email"
        id="email"
        value={email}
        onChange={handleEmailChange}
      ></input>
      <input
        type="password"
        placeholder="Mot de passe"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      ></input>
        <button onClick={submit}>Se connecter</button>
        </div>
    </>
  );
}
