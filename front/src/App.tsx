import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import FirstComponent from "./Components/FirstComposent/FirstComposent";
import InformationComposent from "./Components/InformationComposent/InformationComposent";
import IfComponent from "./Components/IfComponent/IfComponent";
import ListMapComponent from "./Components/ListMapComponent/ListMapComponent";
import ExoComponent from "./Components/ExoComponent/ExoComponent";
import ButtonComposent from "./Components/ButtonComposent/ButtonComposent";
import CompteurComposent from "./Components/CompteurComposent/CompteurComposent";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { imagePublic } from "./Services/connexionService";
import ImageUser from "./Models/ImageUser";
import EffectComposent from "./Components/EffectComposent/EffectComposent";

function App() {
  // const [listImage, setListImage] = useState<ImageUser[]>();

  // // useEffect(() => {
  // //   imagePublic().then((res) => {
  // //     console.log(res);
  // //     setListImage(res);
  // //   });
  // // }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <p>       
         

          <ButtonComposent compteur={1} />
        
          <ExoComponent name={"chemist"} />
          <FirstComponent />
          <InformationComposent />
          <ListMapComponent></ListMapComponent>
        </p>
                   */}

        {/* <div className="image-container">
          {listImage && listImage.length > 0 && (
            <>
              <img
                src={`http://localhost:3000/uploads/1683917463744-ff.JPG`}
                alt=""
              />
              <p>{listImage[0].name}</p>
            </>
          )}
        </div> */}

        <img
          src={`http://localhost:3000/uploads/1684250295920-Capture.JPG`}
          alt=""
        />
        <Routes>
          <Route path="/test" element={<IfComponent />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
