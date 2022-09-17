

const administrarCitas = new Citas();
const ui = new UI();

let editando;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agrega datos al objeto de cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;

}

// Valida y agrega nueva cita a la clase de citas

export function nuevaCita(e) {
    e.preventDefault();

    // Extraer la informacion del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // validar

    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los campos son obligatorio', 'error')

        return;
    }

    if(editando) {
        ui.imprimirAlerta('Editado Correctamente');

        // Pasar el objeto de la cita a edición
        administrarCitas.editarCita({...citaObj})

        // Regresar el texto del Boton a su estado original

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //Quitar modo edición

        editando = false;

    } else {
        // generar un id unico
        citaObj.id = Date.now();


        // Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        // Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agregó correctamente');
    }

    

    // Reiniciar el objeto para la validación

    reiniciarObjeto();



    // Reinicia el formualrio
    formulario.reset();

    // Mostrar el HTML de las citas

    ui.imprimirCitas(administrarCitas);


}

export function reiniciarObjeto() {
    citaObj.mascora = '';
    citaObj.propietario = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    // Eliminar la cita
    administrarCitas.eliminarCita(id);

    // Muestra un mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    // Refrescar las citas

    ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edicion
export function cargarEdicion(cita){
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenar los inputs

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el objeto

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambiar el texto del Botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}