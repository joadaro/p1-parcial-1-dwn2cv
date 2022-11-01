/* Declaración de Constantes */
const date = new Date();
const maxYear = date.getFullYear();
const minYear = maxYear-70;
const minSecs = 0;
const maxSecs = 7200;
const minCode = 1;
const maxCode = 999;
const colorDuration = 180;
const defaultCover = "./images/nodiscimg1.png";
/* Declaración de Clase Track */
class Track{
    track; // Almacena el nombre de la pista
    time; // Almacena la duración de la pista
    constructor(track,time){
        this.track = track;
        this.time = time;
    };
}
/* Declaración de Clase Album */
class Album{
    artist; // Almacena el nombre del artista
    title; // Almacena el titulo del disco
    release; // Almacena el año de lanzamiento del disco
    code; // Almacena el código del disco
    tracks = []; // Almacena las pistas del disco (array de datos de clase Track)
    coverURL; // Almacena la dirección URL de la imagen de portada del disco
    constructor(artist,title,release,code,coverURL){
        this.artist = artist;
        this.title = title;
        this.release = release;
        this.code = code;
        this.coverURL = coverURL;
    };
}
/* Declaración de Objeto Biblioteca */
const biblioteca = {
    /* Objeto global biblioteca en el que se almacena un array discos con todos los objetos disco que se vayan cargando (con sus propiedades y métodos) */
    discos: [], // Array de discos (datos de clase Album)
    /* Métodos de la totalidad de la Biblioteca */
    buscarCodigo: function(c){ // Busca si existe un disco con código "c" enviado a la función
        if (this.discos.length) {
            for (let i = 0; i < this.discos.length; i++) {
                if (this.discos[i].code == c){
                    return i;
                }
            }
            return -1;
        } else {
            return -1;
        }
    },
    getTotalDuration: function(){ // Devuelve la duración total de la bibliotea de discos
        if (this.discos.length){
            let duration = 0;
            for (let disco of this.discos){
                duration += this.getAlbumDuration(disco);
            }
            return duration;
        } else {
            return 0;
        }
    },
    getTotalTracks: function(){ // Devuelve la cantidad total de pistas de la biblioteca de discos
        if (this.discos.length){
            let count = 0;
            for(let disco of this.discos){
                count += disco.tracks.length;
            }
            return count;
        } else {
            return 0;
        }
    },
    getAvgDuration: function(){ // Devuelve el promedio de duración de los discos de la biblioteca
        if (this.discos.length){
            return (this.getTotalDuration() / this.discos.length).toFixed(0);
        } else {
            return 0;
        }
    },
    getMinDuration: function(){ // Devuelve el disco de menor duración de la biblioteca (sólo el tiempo)
        if (this.discos.length){
            let duration;
            let min = maxSecs * 2;
            for (let disco of this.discos){
                duration = this.getAlbumDuration(disco);
                if (duration < min){
                    min = duration;
                }
            }
            return min;
        } else {
            return 0;
        }
    },
    getMaxDuration: function(){ // Devuelve el disco de mayor duración de la biblioteca (sólo el tiempo)
        if (this.discos.length){
            let duration;
            let max = minSecs - 1;
            for (let disco of this.discos){
                duration = this.getAlbumDuration(disco);
                if (duration > max){
                    max = duration;
                }
            }
            return max;
        } else {
            return 0;
        }
    },
    getAvgDurationTracks: function(){ // Devuelve el promedio de duración de la totalidad de pistas de la biblioteca
        if((this.discos.length) && (this.getTotalTracks())){
            return (this.getTotalDuration() / this.getTotalTracks()).toFixed(0);
        } else {
            return 0;
        }
    },
    getMinDurationTrack: function(){ // Devuelve la pista de menor duración en toda la biblioteca
        let returnTrack = new Track('',0);;
        if(this.discos.length){
            let minTrack;
            let min = maxSecs + 1;
            for (let disco of this.discos){
                minTrack = this.getAlbumMinTime(disco);
                if (minTrack.time < min){
                    returnTrack = minTrack;
                    min = minTrack.time;
                }
            }
            return returnTrack;
        } else {
            return returnTrack;
        }
    },
    getMaxDurationTrack: function(){ // Devuelve la pista de mayor duración en toda la biblioteca
        let returnTrack = new Track('',0);;
        if(this.discos.length){
            let maxTrack;
            let max = minSecs - 1;
            for (let disco of this.discos){
                maxTrack = this.getAlbumMaxTime(disco);
                if (maxTrack.time > max){
                    returnTrack = maxTrack;
                    max = maxTrack.time;
                }
            }
            return returnTrack;
        } else {
            return returnTrack;
        }
    },
    updateInfo: function(){
        document.getElementById("discos").innerHTML = this.discos.length;
        document.getElementById("pistas").innerHTML = this.getTotalTracks();
        document.getElementById("duracion").innerHTML = formatTime(this.getTotalDuration(),1);
        document.getElementById("promdurdiscos").innerHTML = formatTime(this.getAvgDuration(),1);
        document.getElementById("promdurpistas").innerHTML = formatTime(this.getAvgDurationTracks(),1);
        document.getElementById("menordurdisco").innerHTML = formatTime(this.getMinDuration(),1);
        document.getElementById("mayordurdisco").innerHTML = formatTime(this.getMaxDuration(),1);
        document.getElementById("menordurpista").innerHTML = formatTime(this.getMinDurationTrack().time,1);
        document.getElementById("mayordurpista").innerHTML = formatTime(this.getMaxDurationTrack().time,1);    
    },
    /* Métodos de Album específico de la Biblioteca */
    getAlbumDuration: function(album){ // Devuelve la duración total del album
        if (album.tracks.length){
            let seconds = 0;
            for (let trk of album.tracks){
                seconds += trk.time;
            }
            return seconds;
        } else {
            return 0;
        }
    },
    getAlbumAvgTime: function(album){ // Devuelve el promedio de duración de pistas del album
        if (album.tracks.length){
            return (parseFloat((this.getAlbumDuration(album) / album.tracks.length).toFixed(0)));
        }
        return 0;
    },
    getAlbumMinTime: function(album){ // Devuelve la pista de menor duración del album (dato de clase Track)
        if (album.tracks.length){
            let track;
            let min = maxSecs + 1;
            for (let trk of album.tracks){
                if (trk.time < min){
                    min = trk.time;
                    track = trk;
                }
            }
            return track;
        } else {
            return new Track();
        }
    },
    getAlbumMaxTime: function(album){ // Devuelve la pista de mayor duración del album (dato de clase Track)
        if (album.tracks.length){
            let track;
            let max = minSecs - 1;
            for (let trk of album.tracks){
                if (trk.time > max){
                    max = trk.time;
                    track = trk;
                }
            }
            return track;
        } else {
            return new Track();
        }
    }
}