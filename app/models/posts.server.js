export async function getPosts(){ // al colocarle server le estamos diciendo a remix que este archivo solamente debe ejectuarse en la parte del servidor 
    const respuesta = await fetch(`${process.env.API_URL}/posts?populate=imagen`) 
    const resultado = await respuesta.json()
  
    return resultado
}

export async function getPost(url){ //filtramos las guitarras por su url , creamos un metodo para leer esas guitarras
    const respuesta = await fetch(`${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`)
    return await respuesta.json()
}
