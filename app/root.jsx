import { useState , useEffect} from "react"
import{
Meta,
Links,
Outlet,
Scripts,
LiveReload,
useCatch,
Link

 }from "@remix-run/react" //importamos un componente espcial de remix para rendirizarlo en el head , links para exportar una hojas de estilo
//al colocar el arroba tenemos diferentes export uno para cliente otro para el servidor , otro para dev, en este caso importamos para el cliente 
import styles from "~/styles/index.css" // importamos la hoja de estilo
import Header from "~/components/header" //usamos la ~ para cambiar de carpeta e ir a la carpeta raiz donde quereamos ir
import Footer from "~/components/footer"
import { json } from "@remix-run/node"

export function meta(){ //para agregar informacion meta o hojas de estilos tenemos que exportar una funcion llamada meta , en el momento que la exportamos se inyecta manualmente en esa ruta 
    return( //colocamos un objeto con la informacion que se va agregar a meta , tambien podemos agregar mas etiquetas meta para mejorar el CEO
        {
           charset:"utf-8",
           title: "GuitarraLA - Remix",
           viewport: "width=device-width,initial-scale=1"
        }
    )
}





export function links(){ // para agregar hojas de estilos exportamos la funcion llamada links
    return [
        {
         rel:"stylesheet",
         href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
        },
        {
            rel:"preconnect",
            href: "https://fonts.gstatic.com"
        },
        {
            rel:"preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin : "true"
        },
        {
            rel:"stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&family=Staatliches&display=swap" 
        },
        {
            rel:"stylesheet", //al ser un objeto tenemos que indicarle cual es su rel o su relacion
            href: styles //la hoja de estilo va ir a la carpeta y buscar ese archivo con los estilos css
        },

    ]
}

export default function App(){
    
    const carritoLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carrito")) ?? [] : null
    const [carrito , setCarrito] = useState(carritoLS)

    useEffect(() => {
      localStorage.setItem("carrito",JSON.stringify(carrito))
    }, [carrito])
    


    const agregarCarrito = (guitarra)=>{
        if(carrito.some(guitarraState=>guitarraState.id ==guitarra.id)){ 
            //itarear sobre el arreglo e identificar el elemento duplicado
        const carritoActualizado = carrito.map(guitarraState=>{
        if(guitarraState.id === guitarra.id){
            //Reescribimos la cantidad
            guitarraState.cantidad = guitarra.cantidad
          }
          return guitarraState
        })

        //añadir al carrito
        setCarrito(carritoActualizado)
      }else{
        setCarrito([...carrito,guitarra])
      }
    }
  
   const actualizarCantidad = guitarra =>{
     const carritoActulizado = carrito.map(guitarraState=>{
        if(guitarraState.id === guitarra.id){
            guitarraState.cantidad = guitarra.cantidad
        }
        return guitarraState
     })
     setCarrito(carritoActulizado)
   }

   const eliminarGuitarra = id=>{
    const carritoActualizado = carrito.filter(guitarraState=>guitarraState.id !==id)
    setCarrito(carritoActualizado)
   }

    return(
        <Document>
            <Outlet
            context={{
               agregarCarrito,
               carrito,
               actualizarCantidad,
               eliminarGuitarra
            }}
            /> 
        </Document>
    )
}

// todas las paginas que vamos creando , todo el contenido que tengan las rutas se van inyectando en el Outlet
//cargamos los metas al document
//cargamos las hojas de estilo  al document 
//importamos script para pasar navegar de forma optimizada
//importamos liveReload una ves que guardamos los cambios se muestra los cambios en pantalla , para no recargar la pagina y mostrar los cambios
function Document({children}){ // document layout principal , se recomienda usar document 
    return (
        <html lang="es">
            <head>
                <Meta />
                <Links /> 
            </head>
            <body>
                <Header/>
                {children}
                <Footer />
                <Scripts />
                <LiveReload/>
            </body>
        </html>
    )
}

/** Manejo de Errores*/

export function CatchBoundary(){
    const error = useCatch()
    return(
        <Document>
            <p className="error">{error.status} {error.statusText}</p>
            <Link className="error-enlace" to="/">Volver a la pagina principal </Link>
        </Document>
    )
}

export function ErrorBoundary({error}){
    return (
        <Document>
            <p className="error">{error.status} {error.statusText}</p>
            <Link className="error-enlace" to="/">Volver a la pagina principal </Link>
        </Document>
    )
}