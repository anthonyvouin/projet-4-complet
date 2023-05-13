import serverAddress from "./Utile";

export async function imagePublic() {
    const response = await fetch(serverAddress + 'images')
    const monObjet = response.json();
    return monObjet
}