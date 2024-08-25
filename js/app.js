const textarea = document.querySelector("#textarea");
const llavesEncriptacion = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

function verificarLetraEspecial() {
    const letrasEspeciales = /[áéíóúÁÉÍÓÚüÜA-Z]/;

    return letrasEspeciales.test(textarea.value); // Devolvera un booleano
}

function verificarCaracterEspecial() {
    const caracterEspecial = /[^a-zA-Z0-9ñ\sáéíóúÁÉÍÓÚüÜ]/;

    return caracterEspecial.test(textarea.value); // Devolvera un booleano
}

function logicaPrincipal(opcion) {
    const contieneLetraEspecial = verificarLetraEspecial();
    const contieneCaracterEspecial = verificarCaracterEspecial();
    let textoEncriptado = textarea.value;

    if (textoEncriptado === "") {
        asignarClaseError();
        asignarTextoElemento(".process__text", "El campo de texto es requerido");
    } else if (contieneLetraEspecial === true) {
        asignarClaseError();
        asignarTextoElemento(".process__text", "Ingrese solo letras minúsculas y sin acentos");
    } else if (contieneCaracterEspecial === true) {
        asignarClaseError();
        asignarTextoElemento(".process__text", "No se permiten caracteres especiales");
    } else {
        // Recorremos todas las llaves de encriptacion
        for (let i = 0; i < llavesEncriptacion.length; i++) {
            //Dependiendo del argumento pasado al parametro, se encriptara de una forma diferente
            if (opcion === "encriptar") {
                textoEncriptado = textoEncriptado.replaceAll(llavesEncriptacion[i][0], llavesEncriptacion[i][1]);
            } else if (opcion === "desencriptar") {
                textoEncriptado = textoEncriptado.replaceAll(llavesEncriptacion[i][1], llavesEncriptacion[i][0]);
            } else {
                alert("Ocurrio un problema muy grave, llamando a Alang Turing :D");
                break;
            }
        }

        // Llamamos la funcion para limpiar el textarea
        limpiarTextarea();

        // Asignamos al div view una clase view--changed, esto hara que se oculten elementos y el boton copiar aparezca debido a las reglas CSS de view--changed
        asignarClaseElemento(".view", "view--changed");

        // Asignamos el texto encriptado al parrafo del div view
        asignarTextoElemento(".view__paragraph", textoEncriptado);

        // Removemos la clase de error y asignamos el texto de informacion correcta
        removerClase(".process__info", "process__info--resalt");
        asignarTextoElemento(".process__text", "Solo letras minúsculas y sin acentos");
    }
}

function encriptar() {
    logicaPrincipal("encriptar");
}

function desencriptar() {
    logicaPrincipal("desencriptar");
}

function asignarTextoElemento(selector, texto) {
    const elemento = document.querySelector(selector);

    elemento.innerHTML = texto;
}

function asignarClaseElemento(selector, clase) {
    const elemento = document.querySelector(selector);

    elemento.classList.add(clase);
}

function asignarClaseElementoConTiempo(selector, clase, tiempo) {
    const elemento = document.querySelector(selector);
    elemento.classList.add(clase);

    setTimeout(() => {
        elemento.classList.remove(clase);
    }, tiempo);
}

function asignarClaseError() {
    asignarClaseElemento(".process__info", "process__info--resalt");
    asignarClaseElementoConTiempo(".process__info", "process__info--animation", 800);
}

function removerClase(selector, clase) {
    const elemento = document.querySelector(selector);

    elemento.classList.remove(clase);
}

function limpiarTextarea() {
    textarea.value = "";
}

function copiarTexto() {
    const textoCopiado = document.querySelector(".view__paragraph").textContent;

    navigator.clipboard.writeText(textoCopiado)
    
    alert("Texto copiado al portapapeles");
}