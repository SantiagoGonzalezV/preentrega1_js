// Verificar que el script se ha cargado correctamente
console.log('Script cargado');

/**
 * Verifica las credenciales del usuario.
 * @returns {boolean} True si las credenciales son correctas, false en caso contrario.
 */
function verificarCredenciales() {
    const usuario = prompt("Ingrese su nombre de usuario:");
    if (!usuario) return false; // El usuario canceló

    const contraseña = prompt("Ingrese su contraseña:");
    if (!contraseña) return false; // El usuario canceló

    // Verificar si las credenciales son correctas
    if (usuario === "Elon Musk" && contraseña === "TeslaSpaceX") {
        alert(`Bienvenido, ${usuario}. Acceso concedido.`);
        return true;
    } else {
        alert("Acceso denegado. Usuario o contraseña incorrectos.");
        return false;
    }
}

/**
 * Solicita y valida un número ingresado por el usuario.
 * @param {string} mensaje - El mensaje a mostrar en el prompt.
 * @returns {number|null} El número ingresado o null si el usuario cancela.
 */
function obtenerNumero(mensaje) {
    let valor;
    do {
        valor = prompt(mensaje);
        if (valor === null) return null; // El usuario canceló
        valor = parseFloat(valor);
    } while (isNaN(valor) || valor < 0);
    return valor;
}

/**
 * Obtiene los datos necesarios para la simulación del préstamo.
 * @returns {Object|null} Un objeto con los datos del préstamo o null si el usuario cancela.
 */
function obtenerDatosSimulacion() {
    const monto = obtenerNumero("Ingrese el monto total:");
    if (monto === null) return null;

    const cuotas = obtenerNumero("Ingrese el número de cuotas:");
    if (cuotas === null) return null;

    const interes = obtenerNumero("Ingrese la tasa de interés anual (%):");
    if (interes === null) return null;

    return { monto, cuotas, interes };
}

/**
 * Calcula los pagos del préstamo.
 * @param {number} monto - El monto total del préstamo.
 * @param {number} cuotas - El número de cuotas.
 * @param {number} interes - La tasa de interés anual.
 * @returns {Object} Un objeto con los resultados del cálculo.
 */
function calcularPagos(monto, cuotas, interes) {
    const tasaMensual = interes / 12 / 100;
    const cuotaMensual = (monto * tasaMensual * Math.pow(1 + tasaMensual, cuotas)) / (Math.pow(1 + tasaMensual, cuotas) - 1);
    const totalPagado = cuotaMensual * cuotas;
    const totalInteres = totalPagado - monto;

    return {
        cuotaMensual: cuotaMensual.toFixed(2),
        totalPagado: totalPagado.toFixed(2),
        totalInteres: totalInteres.toFixed(2)
    };
}

/**
 * Función principal que maneja el proceso de simulación de pagos.
 */
function simularPagos() {
    // Verificar credenciales antes de continuar
    if (!verificarCredenciales()) {
        alert("No se puede acceder a la simulación sin las credenciales correctas.");
        return;
    }

    // Obtener datos para la simulación
    const datos = obtenerDatosSimulacion();
    if (!datos) return;

    // Realizar cálculos
    const { monto, cuotas, interes } = datos;
    const resultado = calcularPagos(monto, cuotas, interes);

    // Mostrar resultados
    alert(
        `Resultado del cálculo:\n\n` +
        `Cuota mensual: $${resultado.cuotaMensual}\n` +
        `Total a pagar: $${resultado.totalPagado}\n` +
        `Total de intereses: $${resultado.totalInteres}`
    );

    // Preguntar si se desea realizar otro cálculo
    if (confirm("¿Desea realizar otro cálculo?")) {
        simularPagos();
    }
}

// Esperar a que el DOM esté completamente cargado antes de agregar el event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado');
    const btnAceptar = document.getElementById('btnAceptar');
    if (btnAceptar) {
        console.log('Botón encontrado');
        btnAceptar.addEventListener('click', simularPagos);
    } else {
        console.error('El botón "Aceptar" no se encontró en el DOM');
    }
});
