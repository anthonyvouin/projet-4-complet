import serverAddress from "./Utile";

export async function imagePublic() {
    const response = await fetch(serverAddress + 'images')
    const monObjet = response.json();
    return monObjet;
}


export async function imageByUser() {
    const url = serverAddress + "imagesUser";
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const responseData = await response.json();
    return responseData;
}

export async function changeVisibilityImageUser(id : string | undefined) {
       const url = serverAddress + "images/" + id;
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const responseData = await response.json();
    return responseData;
}