import { useLoaderData,} from "@remix-run/react"
import {getGuitarras } from "~/models/guitarras.server"
import ListadoGuitarras from "~/components/listado-guitarras"


export function meta(){
  return {
    title:"GuitarraLA - Tienda de Guitarras",
    description: "GuitarraLA - Nuestra coleccion de Guitarras"
  }
}



export async function loader(){

 const guitarras = await getGuitarras()
 return guitarras.data

  // console.log(resultado)
  // console.log(process.env.API_URL)
 
}

const Tienda = () => {

  const guitarras = useLoaderData()


  return (
   
    <ListadoGuitarras 
   guitarras={guitarras}
     />
   
   
  )
}

export default Tienda