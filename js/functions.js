function cargarDatos(){
    /* Función que carga datos guardados en almacenamiento local */
    if (localStorage.getItem("musiclibrary")){
        biblioteca.discos = JSON.parse(localStorage.getItem("musiclibrary"));
        biblioteca.updateInfo();
        mostrarDiscos();
    } else {
        console.log("No se encontraron datos en el almacenamiento local")
    }
}

function guardarDatos(){
    /* Función que guarda de datos en almacenamiento local */
    localStorage.setItem("musiclibrary",JSON.stringify(biblioteca.discos));
}

function buscarCodigo(c){
    /* Esta función busca dentro de la biblioteca de discos un código dado dentro del array "discos"
    y devuelve el índice del disco que tiene ese código y si no encuentra el código devuelve -1 */
    if (biblioteca.discos.length) {
        for (let i = 0; i < biblioteca.discos.length; i++) {
            if (biblioteca.discos[i].code == c){
                return i;
            }
        }
        return -1;
    } else {
        return -1;
    }
}

function validarString(mensaje){
    /* Esta función valida que el dato ingresado como String no esté vacío */
    let valor;
    do{
        valor = prompt(mensaje).toUpperCase();
        if ((valor == undefined) || (valor == '')){
            alert('El valor no puede estar vacío. Inténtelo nuevamente...');
        }
    }while ((valor == undefined) || (valor == ''));
    return valor;
}

function validarEntero(mensaje,min,max){
    /* Esta función valida que el dato dado sea un número entero entre un valor min y un valor max dados a la función. */
    let valor;
    do{
        valor = parseInt(prompt(mensaje));
        if (isNaN(valor)){
            alert('El valor ingresado debe ser numérico. Inténtelo nuevamente...');
        }
        if (valor == undefined){
            alert('El valor no puede estar vacío. Inténtelo nuevamente...');
        }
        if (valor < min){
            alert('El valor no puede ser menor a ' + min + '. Inténtelo nuevamente...');
        }
        if (valor > max){
            alert('El valor no puede ser mayor a ' + max + '. Inténtelo nuevamente...');
        }
    }while ((isNaN(valor)) || (valor == undefined) || (valor < min) || (valor > max));
    return valor;
}

function validarURL(linkURL){
    /* Esta función valida que un string enviado en la variable linkURL corresponda a una dirección URL válida.
    Para realizar la validación se verifica si el string comienza con "http://" ó "https://" */
    if ((isNaN(linkURL)) && ((linkURL.slice(0,8) == 'https://') || (linkURL.slice(0,7) == 'http://'))){
        return true;
    } else {
        return false;
    }
}

function formatTime(valor,opcion){
    if (!(isNaN(valor)) && (valor != undefined) && !(isNaN(opcion)) && (opcion != undefined)){
        let hours = addZeros(Math.floor(valor / 3600),2);
        let minutes = addZeros(Math.floor((valor - (hours * 3600)) / 60),2);
        let seconds = addZeros(Math.floor((valor - (hours * 3600)) % 60),2);
        if (hours == '00'){
            hours = '';
        } else {
            switch (opcion){
                case 0: hours += ':'; break;
                case 1: hours += 'h'; break;
                case 2: hours += '°'; break;
                case 3: hours += " horas "; break;
                default: hours += ':';
            }
        }
        switch (opcion){
            case 0: return hours + minutes + ":" + seconds; break;
            case 1: return hours + minutes + "m" + seconds + "s"; break;
            case 2: return hours + minutes + "\'" + seconds + "\""; break;
            case 3: return hours + minutes + " minutos " + seconds + " segundos "; break;
            default: return hours + minutes + ":" + seconds;
        }
    }
}

function addZeros(valor,cifras){
    if(!(isNaN(valor)) && (valor != undefined) && !(isNaN(cifras)) && (cifras != undefined)){
        let caracteres = valor.toString();
        if (caracteres.length < cifras){
            let ceros = cifras - caracteres.length;
            let cero = '';
            for (let i = 0; i < ceros; i++){
                cero += '0';
            }
            cero += caracteres;
            caracteres = cero;
        }
        return caracteres;
    }
}