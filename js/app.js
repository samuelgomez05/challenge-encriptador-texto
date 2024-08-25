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

function logicaPrincipal(opcion) {
    const contieneLetraEspecial = verificarLetraEspecial();
    let textoEncriptado = textarea.value;

    if (textoEncriptado === "") {
        alert("El campo de texto es requerido");
    } else if (contieneLetraEspecial === true) {
        alert("Ingrese solo letras minúsculas y sin acentos");
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
            }
        }

        // Llamamos la funcion para limpiar el textarea
        limpiarTextarea();

        // Asignamos al div view una clase view--changed, esto hara que se oculten elementos y el boton copiar aparezca debido a las reglas CSS de view--changed
        asignarClaseElemento(".view", "view--changed");

        // Asignamos el texto encriptado al parrafo del div view
        asignarTextoElemento(".view__paragraph", textoEncriptado);
    }
}

function encriptar() {
    logicaPrincipal("encriptar");
}

function desencriptar() {
    logicaPrincipal("desencriptar");
}

function asignarTextoElemento(selector, texto) {
    let elemento = document.querySelector(selector);

    elemento.innerHTML = texto;
}

function asignarClaseElemento(selector, clase) {
    let elemento = document.querySelector(selector);

    elemento.classList.add(clase);
}

function limpiarTextarea() {
    textarea.value = "";
}

function copiarTexto() {
    const textoCopiado = document.querySelector(".view__paragraph").textContent;

    navigator.clipboard.writeText(textoCopiado)
    
    alert("Texto copiado al portapapeles");
}