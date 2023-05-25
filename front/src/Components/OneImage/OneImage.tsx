import React, { useEffect, useState } from "react";
import ImageUser from "../../Models/ImageUser";
import { getOneImage } from "../../Services/connexionService";
import serverAddress from "../../Services/Utile";
import "./OneImage.css";


export default function OneImage() {
    const [image, setListImage] = useState<ImageUser>();
    const pathname = window.location.pathname;
    const slug = pathname.split("/")[2];
    console.log(slug);
    useEffect(() => {
        getOneImage(slug).then((res) => {
            console.log(res);
            setListImage(res);
        });
    }, []);
    return (
      <>
        <div className="oneImage">
          <img width={40} src={serverAddress + image?.name} alt="" />
        </div>
      </>
    );
}