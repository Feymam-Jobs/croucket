function eliminarResaltado(elemento) {
    if (elemento.nodeType === 3) { // Es un nodo de texto
        elemento.parentNode.innerHTML = elemento.parentNode.innerHTML.replace(/<span class="resaltado">(.*?)<\/span>/g, "$1");
    } else if (elemento.nodeType === 1) { // Es un nodo de elemento
        elemento.childNodes.forEach(eliminarResaltado);
    }
}

function resaltarTexto(elemento, palabra) {
    if (elemento.nodeType === 3) { // Si es un nodo de texto
        let texto = elemento.nodeValue;
        let regex = new RegExp(`(${palabra})`, "gi");
        let nuevoHtml = texto.replace(regex, '<span class="resaltado">$1</span>');

        if (nuevoHtml !== texto) {
            let span = document.createElement("span");
            span.innerHTML = nuevoHtml;
            elemento.parentNode.replaceChild(span, elemento);
        }
    } else if (elemento.nodeType === 1 && elemento.tagName !== "SCRIPT" && elemento.tagName !== "STYLE") {
        elemento.childNodes.forEach(child => resaltarTexto(child, palabra));
    }
}

function buscarEnPagina() {
    let input = document.getElementById("buscador").value.trim().toLowerCase();

    if (input === "") {
        alert("Por favor, escribe algo en el buscador.");
        return;
    }

    // Eliminar resaltados previos
    eliminarResaltado(document.body);

    // Resaltar nuevas coincidencias
    resaltarTexto(document.body, input);
}
