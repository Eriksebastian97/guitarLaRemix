import imagen from "../../public/img/nosotros.jpg"
import styles from "~/styles/nosotros.css"


export function meta(){
  return {
    title:"GuitarraLA - Sobre Nosotros",
    description:"Venta de Guitarras"
  }
}

export function links(){
  return [
    {
      rel:"stylesheet",
      href: styles
    },
    { 
    rel:"preload", //agregar una imagen o un video o un archivo de html o de css
    href:imagen,
    as:"image" //espeficar lo que estas cargando
  }
  ]
}

const Nosotros = () => {

 
  return (
   <main className="contenedor nosotros">
   <h2 className="heading">Nosotros</h2>

   <div className="contenido">
    <img src={imagen} alt="Imagen sobre nosotrs" />

    <div>
      <p>Sed congue, ex eget mollis dictum, sem est faucibus felis, non elementum nibh ante at turpis. Donec dictum mattis mi, et efficitur ligula commodo id. Proin eleifend eleifend pretium. Integer ac sodales purus. Aliquam rhoncus ex mauris, vitae aliquam felis laoreet sed. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus aliquet metus, nec scelerisque augue. Donec semper in urna quis mattis. Suspendisse a consequat lorem. Integer placerat feugiat metus, ut tristique dui. Ut orci odio, aliquet ut commodo ac, vulputate non mauris.</p>
      
      <p> Sed congue, ex eget mollis dictum, sem est faucibus felis, non elementum nibh ante at turpis. Donec dictum mattis mi, et efficitur ligula commodo id. Proin eleifend eleifend pretium. Integer ac sodales purus. Aliquam rhoncus ex mauris, vitae aliquam felis laoreet sed. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed luctus aliquet metus, nec scelerisque augue. Donec semper in urna quis mattis. Suspendisse a consequat lorem. Integer placerat feugiat metus, ut tristique dui. Ut orci odio, aliquet ut commodo ac, vulputate non mauris.</p>
    </div>
   </div>
   </main>
  )
}

export default Nosotros