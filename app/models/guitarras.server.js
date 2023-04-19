import { fetch } from "@remix-run/web-fetch"


export async function getGuitarras(){ // al colocarle server le estamos diciendo a remix que este archivo solamente debe ejectuarse en la parte del servidor 
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`) //guardamos la url en una variable de entorno .env y mandamos la peticion a la API
    const resultado = await respuesta.json()
  
    return resultado
}

export async function getGuitarra(url){ //filtramos las guitarras por su url , creamos un metodo para leer esas guitarras
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
    return await respuesta.json()
}