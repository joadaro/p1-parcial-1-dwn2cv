function ingresarDisco(){
    /* Esta función se ejecuta al hacer click en el botón correspondiente del index.html y su funcionalidad consiste en cargar toda la información de un disco con sus validaciones */

    /* Acá se comienza a pedir los datos del objeto album validando los mismos mediante la utilización de funciones */
    let artista = validarString("Ingrese el nombre del Artista/Grupo");
    let titulo = validarString("Ingrese el nombre del Disco");
    let lanzamiento = validarEntero("Ingrese el año de lanzamiento del Disco",minYear,maxYear);
    /* A continuación se pide un código cuyo dato se valida primero, y luego se valida mediante otra función que ese dato no se encuentre repetido como código de otro disco ya ingresado */    
    let codigo;
    do {
        codigo = validarEntero(`Ingrese el código del disco titulado "${titulo}" de "${artista}"`,minCode,maxCode);
        // Luego busca ese código ingresado en todos los discos para verficiar que no existe uno igual ingresado
        if (buscarCodigo(codigo) != -1) {
            alert("El código ingresado está asignado a otro disco. A continuación ingrese otro código");
        }
        // Si encuentra que el código ya existe y está asignado a otro disco, vuelve a pedir otro código como dato
    } while (buscarCodigo(codigo) != -1);

    let disco = new Album(artista,titulo,lanzamiento,codigo,defaultCover);
    /* Se declaran variables para el ingreso de las pistas */
    let i = 0; // Almacena y muestra al usuario el número de pista que se está ingresando
    let pista; // Almacena el nombre de la pista que se está ingresando
    let tiempo; // Almacena la duración de la pista que se está ingresando
    /* Se pregunta al usuario si quiere cargar las pistas del disco */
    let continuar = confirm(`¿Desea ingresar las pistas del disco "${titulo}"?`);
    /* Si el usuario decide cargar pistas se ingresa al bucle de carga hasta que el usuario decida terminar */
    while (continuar){
        /* Dentro del bucle while se ingresa cada dato y se valida utilizando funciones de validación */
        pista = validarString(`Ingrese el nombre de la pista ${i + 1}`);
        tiempo = validarEntero(`Ingrese la duración (en segundos) de la pista nº ${i + 1} de título "${pista}"`,minSecs,maxSecs);
        /* Se guardan los datos validados en un objeto Track */
        let track = new Track(pista,tiempo);
        /* Se almacenan los datos de la pista ingresada al array de pistas del objeto disco */
        disco.tracks.push(track);
        i++;
        /* Se pregunta al usuario si desea continuar con el ingreso de la siguiente pista */
        continuar = confirm(`¿Desea ingresar otra pista para el disco "${titulo}"?`);
        /* Si el usuario decide continuar vuelve a ejecutar otro ciclo de carga */
    }
    /* Terminado el ciclo de carga de pistas se pregunta al usuario si desea ingresar el link de una imagen que corresponda a la portada del disco */
    continuar = confirm(`¿Desea ingresar el link de la imagen de portada del disco (acción recomendada sólo para usuarios avanzados)"${titulo}"?`);
    while (continuar){
        /* Se solicita al usuario el ingreso de la URL de la imagen que corresponde a la portada del disco */
        let imageURL = prompt(`Ingrese una URL de imagen que corresponda a la portada del disco "${titulo}" (se recomienda un tamaño máximo de 300x300p pixeles)`);
        /* Se valida el URL de la imagen para verificar que comience con "http://" ó  "https://" */
        if (validarURL(imageURL)){
            /* Si el dato se valida asigna a la propiedad coverURL del objeto album */
            disco.coverURL = imageURL;
            break;
        } else {
            /* Si el dato ingresado es incorrecto pregunta al usuario si desea ingresar otra URL */
            continuar = confirm("La URL de imagen ingresada no es válida. ¿Desea intentarlo nuevamente?");
            /* Si el usuario decide hacer otro intento se le solicita nuevamente el ingreso de una nueva URL válida */
        }
    }
    biblioteca.discos.push(disco);
    biblioteca.updateInfo();
    guardarDatos();
}

function limpiarListado(){
    /* Esta función limpia el listado de discos mostrados en pantalla */
    document.getElementById("main").innerHTML = `
    <div class="ext-container row-flex">
    <div class="int-container">
        <div class="info-div info">
            <h3 class="titulo">INFORMACION DE LA COLECCION</h3>
            <hr>
            <h4 class="subtitulo">CANTIDAD</h4>
            <p>DISCOS:<span id="discos">0</span></p>
            <p>CANCIONES:<span id="pistas">0</span></p>
            <h4 class="subtitulo">DURACION</h4>
            <p>TIEMPO TOTAL:<span id="duracion">00m00s</span></p>
            <p>TIEMPO PROMEDIO POR DISCO:<span id="promdurdiscos">00m00s</span></p>
            <p>TIEMPO PROMEDIO POR CANCION:<span id="promdurpistas">00m00s</span></p>
            <h4 class="subtitulo">OTROS DATOS DE DURACION</h4>
            <p>DISCO DE MENOR DURACION:<span id="menordurdisco">00m00s</span></p>
            <div class="menor" id="menordisco"></div>
            <p>DISCO DE MAYOR DURACION:<span id="mayordurdisco">00m00s</span></p>
            <div class="mayor" id="mayordisco"></div>
            <p>CANCION DE MENOR DURACION:<span id="menordurpista">00m00s</span></p>
            <div class="menor" id="menorpista"></div>
            <p>CANCION DE MAYOR DURACION:<span id="mayordurpista">00m00s</span></p>
            <div class="mayor" id="mayorpista"></div>
        </div>
    </div>
    <div class="mid-divisor"></div>
    <div class="int-container">
        <div class="instructions-div">
            <h3 class="titulo">BOTONES DE COMANDO</h3>
            <hr>
            <h4 class="btngreen">CARGAR DISCO</h4>
            <p class="justify">Permite cargar la información y pistas de un nuevo disco.</p>
            <h4 class="btngreen">LIMPIAR PANTALLA</h4>
            <p class="justify">Permite limpiar de la pantalla las fichas de información de los discos visualizados.</p>
            <h4 class="btnblue">MOSTRAR DISCO</h4>
            <p class="justify">Permite ingresar un código de disco y muestra en pantalla la ficha de información de ese disco.</p>
            <h4 class="btnblue">MOSTRAR TODO</h4>
            <p class="justify">Muestra en pantalla las fichas de información y pistas de todos los discos de la biblioteca.</p>
        </div>
    </div>
</div>    `;
    biblioteca.updateInfo();
}

function mostrarCodigo(){
    /* Esta función muestra un disco que corresponda al código ingresado por el usuario siempre que este exista */
    if (biblioteca.discos.length){
        let codigo = validarEntero("Ingrese el código de un disco de la biblioteca",minCode,maxCode);
        let indice = buscarCodigo(codigo);
        if (indice != -1){
            let disco = biblioteca.discos[indice];
            let htmlalbum = '';    
            let spandisco = "<span>";
            if (biblioteca.getAlbumDuration(disco) == biblioteca.getMaxDuration()){
                spandisco = `<span class="color-rojo">`;
            }
            let htmltracks = '';
            for (let trk = 0; trk < disco.tracks.length; trk++){
                let span =  "<span>";
                if (disco.tracks[trk].time > colorDuration){
                    span = `<span class="color-rojo">`;
                }
                htmltracks += `<li><span>${disco.tracks[trk].track}${span}${formatTime(disco.tracks[trk].time,1)}</span></span></li>`;                
            }
            limpiarListado();
            htmlalbum += `
            <div class="ext-container row-flex" id="disco${disco.code}">
            <div class="int-container">
                <div class="poster-div">
                    <img src="${disco.coverURL}" alt="Portada Codigo ${disco.code}">
                </div>
                <div class="info-div">
                    <h3 class="titulo info-album">INFORMACION DEL DISCO<span>CODIGO:<span class="nrocod">#${disco.code}</span></span></h3>
                    <hr>
                    <p class="subtitulo">TITULO DEL DISCO:<span>${disco.title}</span></p>
                    <p class="subtitulo">ARTISTA/GRUPO:<span>${disco.artist}</span></p>
                    <hr>
                    <p class="subtitulo">AÑO DE LANZAMIENTO:<span>${disco.release}</span></p>
                    <p class="subtitulo">CANTIDAD DE PISTAS:<span>${disco.tracks.length}</span></p>
                    <p class="subtitulo">DURACION TOTAL:${spandisco}${formatTime(biblioteca.getAlbumDuration(disco),1)}</span></p>
                    <hr>
                    <p class="subtitulo">PISTA DE MENOR DURACION:<span>${formatTime(biblioteca.getAlbumMinTime(disco).time,1)}</span></p>
                    <p class="subtitulo">PISTA DE MAYOR DURACION:<span>${formatTime(biblioteca.getAlbumMaxTime(disco).time,1)}</span></p>
                </div>
            </div>
            <div class="mid-divisor"></div>
            <div class="int-container">
                <div class="track-div">
                    <hr class="horizontal-bar">
                    <h3 class="titulo">LISTA DE PISTAS</h3>
                    <hr>
                    <ol class="list">
                        ${htmltracks}
                    </ol> 
                </div>
            </div>
        </div>
        `;
        document.getElementById("main").innerHTML += htmlalbum;
        } else {
            alert(`No se encontró o no existe un disco con el código "${codigo}" ingresado.`);
        }    
    } else {
        alert(`No existe ningún disco cargado en la biblioteca`);
    }
}

function mostrarDiscos(){
    /* Esta función muestra en pantalla la información de todos los discos cargados */
    if (biblioteca.discos.length){
        let htmlalbum = '';    
        for (let disco of biblioteca.discos){
            let spandisco = `<span>`;
            if (biblioteca.getAlbumDuration(disco) == biblioteca.getMaxDuration()){
                spandisco = `<span class="color-rojo">`;
            }
            let htmltracks = '';
            for (let trk = 0; trk < disco.tracks.length; trk++){
                let span =  `<span>`;
                if (disco.tracks[trk].time > colorDuration){
                    span = `<span class="color-rojo">`;
                }
                htmltracks += `<li><span>${disco.tracks[trk].track}${span}${formatTime(disco.tracks[trk].time,1)}</span></span></li>`;
            }
            limpiarListado();
            htmlalbum += `
            <div class="ext-container row-flex" id="disco${disco.code}">
            <div class="int-container">
                <div class="poster-div">
                    <img src="${disco.coverURL}" alt="Portada Codigo ${disco.code}">
                </div>
                <div class="info-div">
                <h3 class="titulo info-album">INFORMACION DEL DISCO<span>CODIGO:<span class="nrocod">#${disco.code}</span></span></h3>
                    <hr>
                    <p class="subtitulo">TITULO DEL DISCO:<span>${disco.title}</span></p>
                    <p class="subtitulo">ARTISTA/GRUPO:<span>${disco.artist}</span></p>
                    <hr>
                    <p class="subtitulo">AÑO DE LANZAMIENTO:<span>${disco.release}</span></p>
                    <p class="subtitulo">CANTIDAD DE PISTAS:<span>${disco.tracks.length}</span></p>
                    <p class="subtitulo">DURACION TOTAL:${spandisco}${formatTime(biblioteca.getAlbumDuration(disco),1)}</span></p>
                    <hr>
                    <p class="subtitulo">PISTA DE MENOR DURACION:<span>${formatTime(biblioteca.getAlbumMinTime(disco).time,1)}</span></p>
                    <p class="subtitulo">PISTA DE MAYOR DURACION:<span>${formatTime(biblioteca.getAlbumMaxTime(disco).time,1)}</span></p>
                </div>
            </div>
            <div class="mid-divisor"></div>
            <div class="int-container">
                <div class="track-div">
                    <hr class="horizontal-bar">
                    <h3 class="titulo">LISTA DE PISTAS</h3>
                    <hr>
                    <ol class="list">
                        ${htmltracks}
                    </ol> 
                </div>
            </div>
        </div>
        `;
        }
        document.getElementById("main").innerHTML += htmlalbum;
    } else {
        alert(`No existe ningún disco cargado en la biblioteca`);
    }
}