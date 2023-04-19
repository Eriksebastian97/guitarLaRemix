import { useState} from "react"
import { useLoaderData , useOutletContext} from "@remix-run/react"
import { getGuitarra } from "~/models/guitarras.server" //importamos ese metodo


export async function loader({params}){ //en este loader vamos a tener un request o un params , nos muestra la infomracion la peticion que estamos realizando
  
  const {guitarraUrl} = params //estamos leyendo guitarraURLdinamicamente , para leer los datos url accedemos por el nombre que espeficificamos en la ruta

 const guitarra = await getGuitarra(guitarraUrl) //lee el valor que estamos obteniedo desde la URL


 if(guitarra.data.length === 0){
  throw new Response("",{
    status:404,
    statusText:"Guitarra no encontrada"
  })
 }
  return guitarra
}



export function meta({data}){

  if(!data){
    return {
      title:"GuitarraLA - Guitarra no encontrada ",
      description: `Guitarras , venta de guitarras , guitarra No encontrada`
    }
  }
  
return{
  title:`GuitarraLA -${data.data[0].attributes.nombre}`,
  description: `Guitarras , venta de guitarras , guitarra ${data.data[0].attributes.nombre}`
}
}

//creamos una carpeta guitarra que contenga un signo dolar en este caso $guitarraUrl.jsx para leer el atributo dinamicamente o con el nombre de la guitarra
// al tener el signo de $ lo hace una ruta dinamica 
//


function Guitarra () {

 const {agregarCarrito} = useOutletContext()

const [cantidad , setCantidad] = useState(0)
const guitarra = useLoaderData() //leemos y estamos obteniedo los resultado correctamente desde la API
const {nombre , descripcion , imagen , precio} = guitarra.data[0].attributes



const handleSubmit = e=>{
  e.preventDefault()
  if(cantidad < 1){
    alert("debes seleccionar una cantidad")
    return
  }

  const guitarraSeleccionada = {
    id: guitarra.data[0].id,
    imagen:imagen.data.attributes.url,
    nombre,
    precio,
    cantidad
  }
 agregarCarrito(guitarraSeleccionada)
}

  return (
    <div className="guitarra"> 
     <img className="imagen" src={imagen.data.attributes.url} alt={`iamgen de la guitarra ${nombre}`} />
     
     <div className="contenido">
      <h3  className="contenido">{nombre}</h3>
      <p className="texto">
       {descripcion}
      </p>
      <p className="precio">${precio}</p>
      <form onSubmit={handleSubmit} className="formulario">
        <label htmlFor="cantidad">Cantidad</label>
        <select 
        onChange={e=>setCantidad(parseInt(e.target.value))}
        id="cantidad">
          <option value="0"> --Seleccione</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <input
         type="submit"
         value="Agregar al Carrito"
        />
      </form>
     </div>
    </div>
  )
}

export default Guitarra