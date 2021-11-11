function ajax(url, metodo) {
    let xhr = new XMLHttpRequest
    xhr.open(metodo, url)
    xhr.send()

    return xhr

}

//funcion que retorna los archivos segun id
function getArchivo(id) {
    return "plantillas/" + id + ".html"
}


let header = document.querySelector("header")
let archivo = getArchivo("navbar")

let xhr = ajax(archivo, "get")
xhr.addEventListener("load", () => {
    if (xhr.status == 200) {
        header.innerHTML = xhr.response

        getPlantillas()
    }
})
/* ------------------------------------------------ */
/* Carga de las vistas de navegacion dentro de main */
/* ------------------------------------------------ */

function getPlantillas() {

    let main = document.querySelector("main")
    let links = document.querySelectorAll("a")


    //cargo por default la pagina de home
    let pagina = getArchivo("home")
    xhr = ajax(pagina, "get")
    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
            let plantilla = xhr.response
            main.innerHTML = plantilla

        }
    })

    //recorremos los links y detenemos el evento por default para no recargar la pagina
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault()
            let id = link.id
            //obtengo el id de cada link

            //agrego el id a cada archivo
            let archivo = getArchivo(id)

            //imprimo en pantalla el contenido de cada archivo

            xhr = ajax(archivo, "get")
            xhr.addEventListener("load", () => {
                if (xhr.status == 200) {
                    let plantilla = xhr.response
                    main.innerHTML = plantilla
                }
            })

        })

    });



}

