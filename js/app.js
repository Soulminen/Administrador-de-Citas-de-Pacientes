// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');


class Citas {
    constructor(){
        this.citas = [];
    }


    agregarCita(cita) {
        this.citas = [...this.citas, cita];

        console.log(this.citas);
    }
}

class UI {

    imprimirAlerta(mensaje, tipo ){
        // Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base al tipo de error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar la alerta después de 5 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 5000);


    }

}


const ui = new UI();
const administrarCitas = new Citas();


//Registrar eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

// Objeto con la infroamcion de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agrega datos al objeto de cita
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

}

// Valida y agrega nueva cita a la clase de citas

function nuevaCita(e) {
    e.preventDefault();

    // Extraer la informacion del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // validar

    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los campos son obligatorio', 'error')

        return;
    }

    // generar un id unico

    citaObj.id = Date.now();



    // Creando una nueva cita

    administrarCitas.agregarCita({...citaObj});

    // Reiniciar el objeto para la validación

    reiniciarObjeto();



    // Reinicia el formualrio
    formulario.reset();

    // Mostrar el HTML de las citas

}

function reiniciarObjeto() {
    citaObj.mascora = '';
    citaObj.propietario = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}