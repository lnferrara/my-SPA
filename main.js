function ajax(url, metodo) {
    let xhr = new XMLHttpRequest
    xhr.open(metodo, url)
    xhr.send()

    return xhr

}

//funcion que retorna los archivos segun id
function getArchivo(id) {
    return "plantillas/" + (id || "home") + ".html" //--> shortcircuit operator
    /* return "plantillas/" + (id? id: "home") + ".html" * --->operador ternario */
}


let header = document.querySelector("header")
let archivo = getArchivo("navbar")

let xhr = ajax(archivo, "get")
xhr.addEventListener("load", () => {
    if (xhr.status == 200) {
        header.innerHTML = xhr.response

        getPlantillasConHash()
    }
})
/* ------------------------------------------------ */
/* Carga de las vistas de navegacion dentro de main */
/* ------------------------------------------------ */

function getPlantillasConHash() {

    let main = document.querySelector("main")
    let links = document.querySelectorAll("a")


    //cargo por default la pagina de home
    let id= location.hash.slice(1)
    let pagina = getArchivo(id)
    xhr = ajax(pagina, "get")
    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {

            main.innerHTML = xhr.response
        }
    })

    //recorremos los links y detenemos el evento por default para no recargar la pagina
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault()
            let id = link.id
            //obtengo el id de cada link

            //Agrego al elemento location el id para la navegación
            location.hash = id 

            //agrego el id a cada archivo
           
            })

        })
        window.addEventListener("hashchange", ()=>{
            let id= location.hash.slice(1)
            
            let archivo = getArchivo(id)

            //imprimo en pantalla el contenido de cada archivo

            xhr = ajax(archivo, "get")
            xhr.addEventListener("load", () => {
                if (xhr.status == 200) {
                    main.innerHTML = xhr.response
                }
        })
    });



}

