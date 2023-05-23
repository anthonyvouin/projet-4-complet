import React from "react";
import AllGetImagePublic from "./Components/AllGetImagePublic/AllGetImagePublic";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NewAccount from "./Components/NewAccount/NewAccount";
import Login from "./Components/Login/Login";
import Profil from "./Components/Profil/Profil";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/createAccount" element={<NewAccount></NewAccount>} />
        <Route path="/" element={<AllGetImagePublic></AllGetImagePublic>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/profil" element={<Profil></Profil>} />
      </Routes>
    </div>
  );
}

export default App;
