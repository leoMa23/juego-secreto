//captura el h1 y trae el objeto a la variable 'titulo' 
//para luego trabajar con el
// let titulo = document.querySelector('h1');
// //reconoce a la variable de tipo HTMLHeadingElement
// titulo.innerHTML = 'Juego del número secreto'

// let parrafo = document.querySelector('p');
// //reconoce a la variable de tipo HTMLParagraphElement
// parrafo.innerHTML = 'Indica un número del 1 al 10';

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

//funcion para agregar texto a un elemento html
//la funcion debe ser generica para poder ser reutilizada
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return; //lo colocamos como buena practica
}
//declaramos la funcion del boton
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    console.log(intentos);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos == 1) ? 'un intento' : 'intentos'}`);
        //quitamos el atributo disabled al boton 'nuevo juego'
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acerto
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

//declaramos la funcion que genere el numero secreto y la retorne
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //si ya sorteamos todos los números
    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    }else{
        //si el numero generado esta incluido en la lista
        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

//funcion para limpiar el contenido del input
function limpiarCaja() {
    //usamos el queryselector para buscar por ID
    let valorCaja = document.querySelector('#valorUsuario');
    valorCaja.value = '';
}

//funcion para colocar el msj inicial
function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}
//funcion para volver a jugar
function reiniciarJuego() {
    //limpiar la caja
    limpiarCaja();
    //indicar mensaje de intervalo de número
    //generar el número aletorio
    //inicializar el número de intentos
    condicionesIniciales();
    //deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

/*HOISTING => mueve las variables y las funciones
al inicio del codigo para que pueda usarse en 
cualquier momento y no necesariamente luego de declarar 
la funcion
*/
//creamos una funcion para reutilizar codigo y poder escribir texto
//en las etiquetas HTML
condicionesIniciales();



