"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constructor = constructor;
exports.retornarClientes = retornarClientes;
exports.retornarPrestamos = retornarPrestamos;

var _momentMin = _interopRequireDefault(require("../libs/moment/min/moment.min.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//importScripts('./libs/moment/min/moment.min.js');
function constructor(arreglo) {
  //e.data[1] = props
  //e.data[2] = arreglo
  if (arreglo[0].localeCompare("iniciarArregloClientes") == 0) {
    crearArregloClientes(arreglo[1], arreglo[2], arreglo[3], arreglo[4], arreglo[5]);
  } else if (arreglo[0].localeCompare("iniciarArregloPrestamos") == 0) {
    crearArregloCreditos(arreglo[1], arreglo[2], arreglo[3], arreglo[4], arreglo[5], arreglo[6], arreglo[7]);
  } else if (arreglo[0].localeCompare("comportamientoPago") == 0) {
    comportamientoPago(arreglo[1], arreglo[2], arreglo[3], arreglo[4], arreglo[5]);
  } else if (arreglo[0].localeCompare("tiposCredito") == 0) {
    console.log("JIJIJIJIJIJIJIJIJIJI");
    tipoCredito(arreglo[1], arreglo[2], arreglo[3]);
  } else if (arreglo[0].localeCompare("categoriasClasificacion") == 0) {
    console.log("JOJOJOJOJOJOJOJOJOJO");
    categoriasClasificacion(arreglo[1], arreglo[2], arreglo[3]);
  } else if (arreglo[0].localeCompare("estimacionDeterioro") == 0) {
    estimacionDeterioro(arreglo[1]);
  }
}
/*		HACER  METODO GUARDAR VALIDACION PARA GUARDAR A TABLAS (Porque fue calificado el prestamo)	*/

/*		HACER  ARREGLOS DE RESULTADOS CON CALCULO MISMA VARIABLE PARA AHORRAR MEMORIA	*/

/*		ver cuaderno pasos			*/

/*		guardar bitacora moras		*/

/***************	VARIABLES	***************/


var arregloPlanPagos = []; //Arreglo que contiene el plan de pagos individuales de los prestamos

/*					=arregloPlanPagos=
	[cliente1]	[prestamo1]		[pago1, pago2, pago3]
				[prestamo2]		[pago1, pago2, pago3]
				[prestamo3]		[pago1, pago2, pago3]
	[cliente2]	[prestamo1]		[pago1, pago2, pago3]
				[prestamo2]		[pago1, pago2, pago3]
				[prestamo3]		[pago1, pago2, pago3]
*/

var arregloPagos = []; //Arreglo que contiene los pagos individuales de los prestamos

/*					=arregloPagos=
	[cliente1]	[prestamo1]		[pago1, pago2, pago3]
				[prestamo2]		[pago1, pago2, pago3]
				[prestamo3]		[pago1, pago2, pago3]
	[cliente2]	[prestamo1]		[pago1, pago2, pago3]
				[prestamo2]		[pago1, pago2, pago3]
				[prestamo3]		[pago1, pago2, pago3]
*/

var arregloCreditos = []; //Arreglo que contiene los prestamos ordenados ascendentemente por el id de cliente

/*					=arregloCreditos=
	[cliente1]	[prestamo1, prestamo2, prestamo3]
	[cliente2]	[prestamo1, prestamo2, prestamo3]
	[cliente3]	[prestamo1, prestamo2, prestamo3]
*/

var arregloClientes = []; //Arreglo que contiene los clientes ordenados ascendentemente por id

/*					=arregloClientes=
	[cliente1]
	[cliente2]
	[cliente3]
*/

/*		
	DEF: Ordenar arreglo de pagos por fecha
	INPUT: arreglo de todos los pagos de credito ordenado por fecha
	OUTPUT: arreglo de pagos ordenado por fecha
*/

function ordenarPagos(arregloCreditosTodos, campoFecha) {
  arregloCreditosTodos.sort(function (a, b) {
    if (a[campoFecha].getTime() < b[campoFecha].getTime()) {
      return -1;
    }

    if (a[campoFecha].getTime() > b[campoFecha].getTime()) {
      return 1;
    }

    return 0;
  });
}
/*		
	DEF: Metodo para crear arreglo de clientes ordenados por id
	INPUT: arreglo de todos los pagos de credito ordenado por fecha
	OUTPUT: arreglo de clientes ordenados ascendentemente por id
*/


function crearArregloClientes(arregloCreditosTodos, campoClienteID, tipoCampoCliente, camposAGuardarCreditosDeTablas, retornarArreglos) {
  //arregloClientes = [];
  if (tipoCampoCliente == 'varchar' || tipoCampoCliente == 'int' || tipoCampoCliente == 'decimal') {
    for (var i = 0; i < arregloCreditosTodos.length; i++) {
      insercionBinariaClientes(arregloCreditosTodos[i], campoClienteID, tipoCampoCliente, camposAGuardarCreditosDeTablas);
    }

    ;
    console.log("FIN ARREGLO CLIENTES");
    console.log(arregloClientes); //retornarArreglos = el ultimo arreglo que deberia ser creado para retornar el mensaje
    //if(retornarArreglos)

    postMessage("terminoCrearArreglos");
  } else {//add bitacora no se permite tipo id
  }
}
/*export const prueba =  () => {
	console.log("SIII");
}*/

/*		
	DEF: Metodo para crear arreglo de prestamos ordenados por id de cliente
	INPUT: arreglo de todos los pagos de credito ordenado por fecha
	OUTPUT: arreglo de prestamos ordenados por id de cliente
*/


function crearArregloCreditos(arregloCreditosTodos, campoClienteID, campoPrestamoID, tipoCampoCliente, tipoCampoNumCuenta, camposAGuardarCreditosDeTablas, retornarArreglos) {
  //arregloCreditos = [];
  if (tipoCampoCliente == 'varchar' || tipoCampoCliente == 'int' || tipoCampoCliente == 'decimal') {
    if (tipoCampoNumCuenta == 'varchar' || tipoCampoNumCuenta == 'int' || tipoCampoNumCuenta == 'decimal') {
      for (var i = 0; i < arregloCreditosTodos.length; i++) {
        insercionBinariaCreditos(arregloCreditosTodos[i], campoClienteID, campoPrestamoID, tipoCampoCliente, tipoCampoNumCuenta, camposAGuardarCreditosDeTablas);
      }

      ;
      console.log("FIN ARREGLO CREDITOS");
      console.log(arregloCreditos); //retornarArreglos = el ultimo arreglo que deberia ser creado para retornar el mensaje
      //if(retornarArreglos)

      postMessage("terminoCrearArreglos");
    } else {//add bitacora no se permite tipo id
    }
  } else {//add bitacora no se permite tipo id
    }
}
/*		
	DEF: Metodo para crear arreglo de pagos de prestamos ordenados por id de cliente
	INPUT: arreglo de todos los pagos de credito
	OUTPUT: arreglo de pagos de prestamos ordenados por id de cliente
*/


function crearArregloPagos(arregloCreditosTodos) {
  arregloPagos = [];

  for (var i = 0; i < arregloCreditosTodos.length; i++) {
    insercionBinaria(arregloCreditosTodos[i], 'numeroCuenta', arregloPagos);
  }

  ;
}
/*		
	DEF: Metodo para calcular los dias de mora
	INPUT: arreglo de todos los pagos de credito ordenado por fecha
	OUTPUT: arreglo de prestamos individuales con su valor de dias de mora
*/


function calcularDiasMora(arregloCreditosTodos) {
  var arregloPrestamos = [];

  for (var i = 0; i < arregloCreditosTodos.length; i++) {
    //i = posicion cliente
    for (var j = 0; j < arregloCreditosTodos[i].length; j++) {
      //j = posicion prestamo
      for (var k = 0; k < arregloCreditosTodos[i][j].length; k++) {
        //k = posicion pago
        arregloPagos[i][j][k];
      }

      ;
    }

    ;
  }

  ;
}
/*		
	DEF: Metodo para clasificar prestamos individuales
	INPUT: arreglo de todos los pagos de credito ordenado por fecha
	OUTPUT: arregloCreditos clasificado por prestamos individuales
*/


function clasificarCreditos(arregloCreditosTodos) {
  var arregloPrestamos = [];

  for (var i = 0; i < arregloCreditosTodos.length; i++) {
    //i = posicion cliente
    for (var j = 0; j < arregloCreditosTodos[i].length; j++) {
      //j = posicion prestamo
      for (var k = 0; k < Things.length; k++) {//k = posicion pago
      }

      ;
    }

    ;
  }

  ;
}
/*		
	DEF: Metodo que retorna los arreglos para guardar los resultados
	INPUT: boleans que dicen que arreglos retornar
	OUTPUT: arreglo a guardar
*/

/*function retornarArreglos (retornarClientes, retornarCreditos, retornarPagos, retornarPlanPagos) {
	if(retornarClientes) {
		postMessage(["guardarResultados", arregloClientes]);
	}
	if(retornarCreditos) {
		postMessage(["guardarResultados", arregloPrestamos]);
	}
	if(retornarPagos) {
		postMessage(["guardarResultados", arregloPagos]);
	}
	if(retornarPlanPagos) {
		postMessage(["guardarResultados", arregloPlanPagos]);
	}
}*/


function retornarClientes() {
  return arregloClientes;
}

function retornarPrestamos() {
  return arregloCreditos;
}
/*			COMPORTAMIENTO DE PAGO			*/


function comportamientoPago(prestamoCampos, valoresPrestamos, planPagoCampos, valoresPlanPago, comportamientoPago) {
  console.log("prestamoCampos");
  console.log(prestamoCampos);
  console.log("valoresPrestamos");
  console.log(valoresPrestamos);
  console.log("planPagoCampos");
  console.log(planPagoCampos);
  console.log("valoresPlanPago");
  console.log(valoresPlanPago);
  console.log("comportamientoPago");
  console.log(comportamientoPago);
  var idClientePrestamoCampoID = prestamoCampos.filter(function (object) {
    return object.ID == comportamientoPago.idClientePrestamoCampoID;
  });
  var idClientePlanPagoCampoID = planPagoCampos.filter(function (object) {
    return object.ID == comportamientoPago.idClientePlanPagoCampoID;
  });
  var numeroPrestamoCampoID = prestamoCampos.filter(function (object) {
    return object.ID == comportamientoPago.numeroPrestamoCampoID;
  });
  var numeroPlanPagoCampoID = planPagoCampos.filter(function (object) {
    return object.ID == comportamientoPago.numeroPlanPagoCampoID;
  });
  var pagoCapitalPrestamoCampoID = prestamoCampos.filter(function (object) {
    return object.ID == comportamientoPago.pagoCapitalPrestamoCampoID;
  });
  var pagoCapitalPlanPagoCampoID = planPagoCampos.filter(function (object) {
    return object.ID == comportamientoPago.pagoCapitalPlanPagoCampoID;
  });
  var pagoImpuestosPrestamoCampoID = prestamoCampos.filter(function (object) {
    return object.ID == comportamientoPago.pagoImpuestosPrestamoCampoID;
  });
  var pagoImpuestosPlanPagoCampoID = planPagoCampos.filter(function (object) {
    return object.ID == comportamientoPago.pagoImpuestosPlanPagoCampoID;
  });
  var fechaPrestamoCampoID = prestamoCampos.filter(function (object) {
    return object.ID == comportamientoPago.fechaPrestamoCampoID;
  });
  var fechaPlanPagoCampoID = planPagoCampos.filter(function (object) {
    return object.ID == comportamientoPago.fechaPlanPagoCampoID;
  });
  console.log("idClientePrestamoCampoID");
  console.log(idClientePrestamoCampoID);
  console.log("idClientePlanPagoCampoID");
  console.log(idClientePlanPagoCampoID);
  console.log("numeroPrestamoCampoID");
  console.log(numeroPrestamoCampoID);
  console.log("numeroPlanPagoCampoID");
  console.log(numeroPlanPagoCampoID);
  console.log("pagoCapitalPrestamoCampoID");
  console.log(pagoCapitalPrestamoCampoID);
  console.log("pagoCapitalPlanPagoCampoID");
  console.log(pagoCapitalPlanPagoCampoID);
  console.log("pagoImpuestosPrestamoCampoID");
  console.log(pagoImpuestosPrestamoCampoID);
  console.log("pagoImpuestosPlanPagoCampoID");
  console.log(pagoImpuestosPlanPagoCampoID);
  console.log("fechaPrestamoCampoID");
  console.log(fechaPrestamoCampoID);
  console.log("fechaPlanPagoCampoID");
  console.log(fechaPlanPagoCampoID); //insertarPagoPrestamoArreglos();

  for (var i = 0; i < valoresPrestamos.length; i++) {
    /*insercionBinariaClientes(valoresPrestamos[i], idClientePrestamoCampoID[0].nombre, idClientePrestamoCampoID[0].tipo, idClientePrestamoCampoID);
    insercionBinariaCreditos(valoresPrestamos[i], idClientePrestamoCampoID[0].nombre, numeroPrestamoCampoID[0].nombre, idClientePrestamoCampoID[0].tipo, numeroPrestamoCampoID[0].tipo, idClientePrestamoCampoID, numeroPrestamoCampoID);*/
    insercionBinariaPagos(valoresPrestamos[i], idClientePrestamoCampoID[0].nombre, numeroPrestamoCampoID[0].nombre, idClientePrestamoCampoID[0].tipo, numeroPrestamoCampoID[0].tipo, idClientePrestamoCampoID, numeroPrestamoCampoID, pagoCapitalPrestamoCampoID.concat(pagoImpuestosPrestamoCampoID, fechaPrestamoCampoID));
  }

  ;

  for (var i = 0; i < valoresPlanPago.length; i++) {
    insercionBinariaPlanPagos(valoresPlanPago[i], idClientePrestamoCampoID[0].nombre, numeroPrestamoCampoID[0].nombre, idClientePrestamoCampoID[0].tipo, numeroPrestamoCampoID[0].tipo, idClientePrestamoCampoID, numeroPrestamoCampoID, pagoCapitalPrestamoCampoID.concat(pagoImpuestosPrestamoCampoID, fechaPrestamoCampoID));
  }

  ;

  for (var i = 0; i < arregloPagos.length; i++) {
    for (var j = 0; j < arregloPagos[i].length; j++) {
      if (arregloPagos[i][j] != undefined) {
        ordenarPagos(arregloPagos[i][j], fechaPrestamoCampoID[0].nombre);
      }
    }

    ;
  }

  ;

  for (var i = 0; i < arregloPlanPagos.length; i++) {
    for (var j = 0; j < arregloPlanPagos[i].length; j++) {
      if (arregloPlanPagos[i][j] != undefined) {
        ordenarPagos(arregloPlanPagos[i][j], fechaPlanPagoCampoID[0].nombre);
      }
    }

    ;
  }

  ;
  console.log(valoresPrestamos);
  console.log(valoresPlanPago);
  console.log(arregloClientes);
  console.log(arregloCreditos);
  console.log(arregloPagos);
  console.log(arregloPlanPagos);
  initEvalcomportamientoPago(pagoCapitalPrestamoCampoID[0].nombre, pagoCapitalPlanPagoCampoID[0].nombre, pagoImpuestosPrestamoCampoID[0].nombre, pagoImpuestosPlanPagoCampoID[0].nombre, fechaPrestamoCampoID[0].nombre, fechaPlanPagoCampoID[0].nombre);
}

function initEvalcomportamientoPago(capitalPago, capitalPlanPago, impuestoPago, impuestoPlanPago, fechaPago, fechaPlanPago) {
  for (var i = 0; i < arregloClientes.length; i++) {
    var numPagosAtrasadosCliente = 0;
    var diasMoraCliente = 0;
    var totalCapitalPagado = 0;
    var totalImpuestosPagado = 0;
    var totalCapitalPlanPagos = 0;
    var totalImpuestosPlanPagos = 0;
    console.log("ENTRE CLIENTES = " + i);

    for (var j = 0; j < arregloCreditos[i].length; j++) {
      var mesViejo = new Date(2019, 0, 1);
      var totalCapitalPagadoPrestamo = 0;
      var totalImpuestosPagadoPrestamo = 0;
      var totalCapitalPlanPagoPrestamo = 0;
      var totalImpuestosPlanPagoPrestamo = 0;
      console.log("ENTRE PRESTAMOS = " + j);

      if (arregloPlanPagos[i][j].length > 0) {
        var fechaPactadaPago = arregloPlanPagos[i][j][0][fechaPlanPago];
        var banderaVerFechaPactada = true;
        var arregloPlanPagosDeCredito = [];

        for (var k = 0; k < arregloPagos[i][j].length; k++) {
          //validando cuando cambia de mes, para ver si el pago se hizo a tiempo
          if (mesViejo.getMonth() < arregloPagos[i][j][k][fechaPago].getMonth()) {
            mesViejo = arregloPagos[i][j][k][fechaPago];
            banderaVerFechaPactada = true;
          }

          if (mesViejo.getMonth() == arregloPagos[i][j][k][fechaPago].getMonth() && banderaVerFechaPactada) {
            if (fechaPactadaPago.getDate() > arregloPagos[i][j][k][fechaPago].getDate()) {
              numPagosAtrasadosCliente++;
            } else {
              banderaVerFechaPactada = false;
            }
          }

          totalCapitalPagado += arregloPagos[i][j][k][capitalPago];
          totalCapitalPagadoPrestamo += arregloPagos[i][j][k][capitalPago];
          totalImpuestosPagado += arregloPagos[i][j][k][impuestoPago];
          totalImpuestosPagadoPrestamo += arregloPagos[i][j][k][impuestoPago];
        }

        ;

        for (var k = 0; k < arregloPlanPagos[i][j].length; k++) {
          var index = -1;

          for (var p = 0; p < arregloPlanPagosDeCredito.length; p++) {
            if (arregloPlanPagosDeCredito[p].mes.getMonth() == arregloPlanPagos[i][j][k][fechaPlanPago].getMonth()) {
              index = p;
            }
          }

          ;

          if (index != -1) {
            arregloPlanPagosDeCredito[index].montoCapital += arregloPlanPagos[i][j][k][capitalPlanPago];
            arregloPlanPagosDeCredito[index].montoImpuesto += arregloPlanPagos[i][j][k][impuestoPlanPago];
          } else {
            if (arregloPlanPagosDeCredito.length > 0) {
              arregloPlanPagosDeCredito.push({
                mes: arregloPlanPagos[i][j][k][fechaPlanPago],
                montoCapital: arregloPlanPagos[i][j][k][capitalPlanPago],
                montoImpuesto: arregloPlanPagos[i][j][k][impuestoPlanPago],
                montoCapitalTotal: arregloPlanPagosDeCredito[arregloPlanPagosDeCredito.length - 1].montoCapitalTotal + arregloPlanPagos[i][j][k][capitalPlanPago],
                montoImpuestoTotal: arregloPlanPagosDeCredito[arregloPlanPagosDeCredito.length - 1].montoImpuestoTotal + arregloPlanPagos[i][j][k][impuestoPlanPago]
              });
            } else {
              arregloPlanPagosDeCredito.push({
                mes: arregloPlanPagos[i][j][k][fechaPlanPago],
                montoCapital: arregloPlanPagos[i][j][k][capitalPlanPago],
                montoImpuesto: arregloPlanPagos[i][j][k][impuestoPlanPago],
                montoCapitalTotal: arregloPlanPagos[i][j][k][capitalPlanPago],
                montoImpuestoTotal: arregloPlanPagos[i][j][k][impuestoPlanPago]
              });
            }
          }

          totalCapitalPlanPagos += arregloPlanPagos[i][j][k][capitalPlanPago];
          totalCapitalPlanPagoPrestamo += arregloPlanPagos[i][j][k][capitalPlanPago];
          totalImpuestosPlanPagos += arregloPlanPagos[i][j][k][impuestoPlanPago];
          totalImpuestosPlanPagoPrestamo += arregloPlanPagos[i][j][k][impuestoPlanPago];
        }

        ;
        var mesDelPlan,
            posicionPlan = -1;

        for (var p = 0; p < arregloPlanPagosDeCredito.length; p++) {
          console.log("SIIIISUAISUAHSJKAHSKJAHSKJHKJSH");
          console.log(arregloPlanPagosDeCredito);

          if (totalCapitalPagadoPrestamo >= arregloPlanPagosDeCredito[p].montoCapitalTotal && totalImpuestosPlanPagoPrestamo >= arregloPlanPagosDeCredito[p].montoImpuestoTotal) {
            console.log("NOOOOOOO");
            mesDelPlan = arregloPlanPagosDeCredito[p].mes;
            posicionPlan = p; //break;
          }
        }

        ;

        if (posicionPlan != -1) {
          var fechaInicial = arregloPlanPagosDeCredito[0].mes.getDate();
          var fechaAIniciarContar = new Date(arregloPlanPagosDeCredito[0].mes.getFullYear(), arregloPlanPagosDeCredito[0].mes.getMonth(), fechaInicial + 1);
          var hoy = (0, _momentMin["default"])();
          var momentFechaPlan = (0, _momentMin["default"])(mesDelPlan);
          var diferenciaDias = hoy.diff(momentFechaPlan, 'days');
          console.log("---------------------");
          console.log("MES DEL PLAN");
          console.log(mesDelPlan);
          console.log("HOY");
          console.log(hoy);
          console.log("DIFF DIAS");
          console.log(diferenciaDias);
          console.log("CREDITO");
          console.log(arregloCreditos[i][j]);
          console.log("///////////////////");
          arregloCreditos[i][j]["mesDelPlan"] = mesDelPlan;
          arregloCreditos[i][j]["diasMora"] = diferenciaDias;
        }
      } else {
        //agregar no existe plan pagos para tal prestamo de tal cliente
        totalCapitalPagadoPrestamo = 0;
        totalImpuestosPagadoPrestamo = 0;
        totalCapitalPlanPagoPrestamo = 0;
        totalImpuestosPlanPagoPrestamo = 0;
      }

      arregloCreditos[i][j]["t0talC4pitalPagado"] = totalCapitalPagadoPrestamo;
      arregloCreditos[i][j]["t0talC4pitalD3beriaPagado"] = totalCapitalPlanPagoPrestamo;
      arregloCreditos[i][j]["t0tal1mpu3stosPagado"] = totalImpuestosPagadoPrestamo;
      arregloCreditos[i][j]["t0tal1mpu3stosD3beriaPagado"] = totalImpuestosPlanPagoPrestamo;
    }

    ;
    arregloClientes[i]["t0talC4pitalPagado"] = totalCapitalPagado;
    arregloClientes[i]["t0talC4pitalD3beriaPagado"] = totalCapitalPlanPagos;
    arregloClientes[i]["t0tal1mpu3stosPagado"] = totalImpuestosPagado;
    arregloClientes[i]["t0tal1mpu3stosD3beriaPagado"] = totalImpuestosPlanPagos;
  }

  ;
}

function getPagoAtrasadoFechaPactada() {// body...
}

function saveClientsDB(valorAGuardar) {
  var camposAGuardar = Object.getOwnPropertyNames(a);

  for (var i = 0; i < camposAGuardar.length; i++) {
    var esValidoCampo = valorAGuardar[camposAGuardar[i]];
  }

  ;
}
/*

FUTURE----
________________________________________________________________________________________________________________________________________________________________
|	AGREGAR TOTALES DE MONTOS, DE LOS SALDOS PAGADOS EN CAPITAL E IMPUESTOS ,POR PAGO A PRESTAMO Y PLAN PAGO,
|
|	AGREGAR MONTOS POR CATEGORIA DE CAPACIDAD DE PAGO DEL DEUDOR, TIPO DE CREDITO, CATEGORIAS DE CLASIFICACION, CRITERIO DETERIORO
|_________________________________________________________________________________________________________________________________________________________________

		^^^^PERO AGREGAR POR CADA CATEGORIA DE CAPACIDAD DE PAGO DEL DEUDOR, TIPO DE CREDITO, CATEGORIAS DE CLASIFICACION, CRITERIO DETERIORO

	GUARDAR VALOR PROMEDIO DE (PAGADO, VA A PAGAR) POR CATEGORIA DE CAPACIDAD DE PAGO DEL DEUDOR, TIPO DE CREDITO, CATEGORIAS DE CLASIFICACION, CRITERIO DETERIORO
			
			PAGADO: SALDO CAPITAL
			VA A PAGAR(DEBERIA PAGAR^^^^[ANOTHER PART CODE]):PLAN DE PAGO

	[los saldos por categoria van en otra tabla de totales]
*/

/* ================================		TIPO DE CREDITO		================================ */

/*		
	DEF: Metodo para actualizar el campo de tipo de credito de prestamo
	INPUT: tipos de creditos, reglas de tipos de creditos, valores de clientes a evaluar
	OUTPUT:

	n = arreglo de tipos de creditos = [tipo1, tipo2 ...]
	m = arreglo de reglas de tipos de creditos = [[regla1, regla2], [regla3, regla2]]
*/


function tipoCredito(tiposCreditos, reglasTiposCreditos) {
  for (var i = 0; i < arregloCreditos.length; i++) {
    for (var j = 0; j < arregloCreditos[i].length; j++) {
      arregloCreditos[i][j].tipoCredito = 'No Tiene';

      for (var n = 0; n < tiposCreditos.length; n++) {
        var contadorCumpleParametros = 0;

        for (var m = 0; m < reglasTiposCreditos[n].length; m++) {
          //reglasTiposCreditos[n][m]
          var objeto = '';
          console.log('reglasTiposCreditos[n][m]');
          console.log(reglasTiposCreditos[n][m]);
          if (reglasTiposCreditos[n][m].campoValor.tabla.localeCompare("Cliente") == 0) objeto = "arregloClientes[i]";else objeto = "arregloCreditos[i][j]";
          /*console.log('n = '+n+'\tm = '+m);
          console.log('reglasTiposCreditos[n][m]');
          console.log(reglasTiposCreditos[n][m]);
          console.log('reglasTiposCreditos[n][m].valorValores');
          console.log(reglasTiposCreditos[n][m].valorValores);*/

          var condicionRegla = getEvalCodeCondition(reglasTiposCreditos[n][m], objeto);
          /*console.log('condicionRegla');
          console.log(condicionRegla);*/

          if (eval(condicionRegla)) {
            contadorCumpleParametros++; //console.log('CUMPLIO');
          } else {
            //console.log('NO CUMPLIO');
            break;
          }
          /*console.log('contadorCumpleParametros');
          console.log(contadorCumpleParametros);
          console.log('reglasTiposCreditos[n].length');
          console.log(reglasTiposCreditos[n].length);*/


          if (reglasTiposCreditos[n].length - 1 == m && contadorCumpleParametros == reglasTiposCreditos[n].length) {
            arregloCreditos[i][j].tipoCredito = tiposCreditos[n].nombre;
            arregloCreditos[i][j].tipoCreditoID = tiposCreditos[n].ID;
          }
        }

        ;
      }

      ;
    }

    ;
  }

  ;
}
/* ================================		CATEGORIAS DE CLASIFICACION		================================ */

/*		
	DEF: Metodo para actualizar el campo de tipo de credito de prestamo
	INPUT: tipos de creditos, reglas de tipos de creditos, valores de clientes a evaluar
	OUTPUT:

	n = arreglo de tipos de creditos = [tipo1, tipo2 ...]
	m = arreglo de reglas de tipos de creditos = [[regla1, regla2], [regla3, regla2]]
*/


function categoriasClasificacion(tiposCreditos, reglasTiposCreditos) {
  console.log("categoriasClasificacion  categoriasClasificacion  categoriasClasificacion");

  for (var i = 0; i < arregloCreditos.length; i++) {
    for (var j = 0; j < arregloCreditos[i].length; j++) {
      arregloCreditos[i][j].categoriaClasificacion = 'No Tiene';

      for (var n = 0; n < tiposCreditos.length; n++) {
        var contadorCumpleParametros = 0;

        for (var m = 0; m < reglasTiposCreditos[n].length; m++) {
          //reglasTiposCreditos[n][m]
          var objeto = '';
          if (reglasTiposCreditos[n][m].campoValor.tabla.localeCompare("Cliente") == 0) objeto = "arregloClientes[i]";else objeto = "arregloCreditos[i][j]";
          /*console.log('n = '+n+'\tm = '+m);
          console.log('reglasTiposCreditos[n][m]');
          console.log(reglasTiposCreditos[n][m]);
          console.log('reglasTiposCreditos[n][m].valorValores');
          console.log(reglasTiposCreditos[n][m].valorValores);*/

          var condicionRegla = getEvalCodeCondition(reglasTiposCreditos[n][m], objeto);

          if (eval(condicionRegla)) {
            contadorCumpleParametros++; //console.log('CUMPLIO');
          } else {
            //console.log('NO CUMPLIO');
            break;
          }
          /*console.log('contadorCumpleParametros');
          console.log(contadorCumpleParametros);
          console.log('reglasTiposCreditos[n].length');
          console.log(reglasTiposCreditos[n].length);*/


          if (reglasTiposCreditos[n].length - 1 == m && contadorCumpleParametros == reglasTiposCreditos[n].length) {
            arregloCreditos[i][j].categoriaClasificacion = tiposCreditos[n].tipoCredito;
            arregloCreditos[i][j].categoriaClasificacionID = tiposCreditos[n].ID;
          }
        }

        ;
      }

      ;
    }

    ;
  }

  ;
}
/* ================================		ESTIMACIONES DETERIORO		================================ */

/*		
	DEF: Metodo para actualizar el campo de estimacion por deterioro, a nivel de cliente, prestamo
	INPUT: tipos de creditos, reglas de tipos de creditos, valores de clientes a evaluar
	OUTPUT:

	n = arreglo de tipos de creditos = [tipo1, tipo2 ...]
	m = arreglo de reglas de tipos de creditos = [[regla1, regla2], [regla3, regla2]]
*/


function estimacionDeterioro(estimacionesDeterioro) {
  for (var i = 0; i < arregloClientes.length; i++) {
    arregloClientes[i].estimacionDeterioro = 0;

    for (var j = 0; j < arregloCreditos[i].length; j++) {
      arregloCreditos[i][j].estimacionDeterioro = 0;
      arregloCreditos[i][j].categoriaEstimacionDeterioro = 'No Tiene';

      for (var n = 0; n < estimacionesDeterioro.length; n++) {
        if (estimacionesDeterioro[n].categoriaClasPadre == arregloCreditos[i][j].categoriaClasificacionID && estimacionesDeterioro[n].tipoDeCredito == arregloCreditos[i][j].tipoCreditoID && estimacionesDeterioro[n].inicioMora <= arregloCreditos[i][j].diasMora && estimacionesDeterioro[n].finMora >= arregloCreditos[i][j].diasMora) {
          arregloCreditos[i][j].estimacionDeterioro = arregloCreditos[i][j].t0talC4pitalPagado * estimacionesDeterioro[n].estimacionDeterioro;
          arregloCreditos[i][j].categoriaEstimacionDeterioro = estimacionesDeterioro[n].categoria;
          arregloClientes[i].estimacionDeterioro += arregloCreditos[i][j].estimacionDeterioro;
        }
      }

      ;
    }

    ;
  }

  ;
}
/*		
	DEF: Metodo para crear cadena lista para ser evaluada windows[]
	INPUT: arreglo de regla con valores y campos ya colocados como campos, nombre de funcion a retornar
	OUTPUT: cadena con contenido para ser introducido al objeto windows[] retornando a la funcion pasada como parametro
*/


function getWindowsCodeFromRules(arregloReglas, nombreFunRet, nombreArreglo) {
  for (var i = 0; i < arregloReglas.length; i++) {
    var codigoRegla = getEvalCode(arregloReglas[i], "");
  }

  ;
}
/*		
	DEF: Metodo para regresar cadena lista para ser evaluada en eval
	INPUT: regla con valores
	OUTPUT: cadena con contenido para ser introducido al if
*/


function getEvalCodeCondition(regla, objeto) {
  var codigo = '';
  var codigoCampo = objeto + "." + regla.campoValor.nombre;
  var valores = regla.valorValores;

  for (var i = 0; i < valores.length; i++) {
    if (regla.operacion.localeCompare("sumIf") == 0 && codigo.length > 0) codigo += " || ";else if (codigo.length > 0) codigo += " && ";

    if (regla.campoTipo.localeCompare("int") == 0 || regla.campoTipo.localeCompare("decimal") == 0) {
      codigo += " " + codigoCampo + " " + regla.operacion + " " + valores[i].valor;
    } else if (regla.campoTipo.localeCompare("varchar") == 0) {
      codigo += " " + codigoCampo + ".localeCompare('" + valores[i].valor + "') == 0 ";
    } else if (regla.campoTipo.localeCompare("date") == 0) {
      var operacion;

      if (regla.operacion.localeCompare("==") == 0) {
        codigo += " moment(" + codigoCampo + ").isSame(" + valores[i].valor + ", 'day') ";
      } else if (regla.operacion.localeCompare("!=") == 0) {
        codigo += " !moment(" + codigoCampo + ").isSame(" + valores[i].valor + ", 'day') ";
      } else if (regla.operacion.localeCompare("<") == 0) {
        codigo += " !moment(" + codigoCampo + ").isBefore(" + valores[i].valor + ", 'day') ";
      } else if (regla.operacion.localeCompare("<=") == 0) {
        codigo += " !moment(" + codigoCampo + ").isSameOrBefore(" + valores[i].valor + ", 'day') ";
      } else if (regla.operacion.localeCompare(">") == 0) {
        codigo += " !moment(" + codigoCampo + ").isAfter(" + valores[i].valor + ", 'day') ";
      } else if (regla.operacion.localeCompare(">=") == 0) {
        codigo += " !moment(" + codigoCampo + ").isSameOrAfter(" + valores[i].valor + ", 'day') ";
      }
    } else if (regla.campoTipo.localeCompare("bool") == 0) {
      codigo += " " + codigoCampo + " " + regla.operacion + " " + valores[i].valor;
    }
  }

  ;
  return codigo;
} //Puede ser int o decimal
//Puede ser date
//Puede ser varchar
//Puede ser bool

/* ================================		INSERCION BINARIA		================================*/

/*		
	DEF: Metodo para insertar binariamente
	INPUT: valor a buscar, campo a comparar, arreglo donde insertar
	OUTPUT:
*/


function insercionBinariaClientes(valor, campo, tipoCampo, camposAGuardarCreditosDeTablas, startVal, endVal) {
  var length = arregloClientes.length;
  var start = typeof startVal != 'undefined' ? startVal : 0;
  var end = typeof endVal != 'undefined' ? endVal : length - 1; //!! endVal could be 0 don't use || syntax

  var m = start + Math.floor((end - start) / 2);
  var esString, esInt, esDec;

  if (tipoCampo == 'varchar') {
    esString = true;
  } else if (tipoCampo == 'int') {
    esInt = true;
  } else if (tipoCampo == 'decimal') {
    esDec = true;
  }

  if (length == 0) {
    var newObject = {};

    for (var i = 0; i < camposAGuardarCreditosDeTablas.length; i++) {
      var valorAInsertar = valor[camposAGuardarCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarCreditosDeTablas[i].tipo);

      var validarVariable = true;

      if (validarVariable) {
        newObject[camposAGuardarCreditosDeTablas[i].nombre] = valorAInsertar;
      } else {//bitacora add error porque no inserto variable
      }
    }

    ;
    arregloClientes.push(newObject);
    return;
  }

  if ((esInt || esDec) && valor[campo] == arregloClientes[m][campo] || esString && valor[campo].localeCompare(arregloClientes[m][campo]) == 0) {
    for (var i = 0; i < camposAGuardarCreditosDeTablas.length; i++) {
      var valorAInsertar = valor[camposAGuardarCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarCreditosDeTablas[i].tipo);

      var validarVariable = true;

      if (validarVariable) {
        arregloClientes[m][camposAGuardarCreditosDeTablas[i].nombre] = valor[camposAGuardarCreditosDeTablas[i].nombre];
      } else {//bitacora add error porque no inserto variable
      }
    }

    ;
    return;
  }

  if ((esInt || esDec) && valor[campo] > arregloClientes[end][campo] || esString && valor[campo].localeCompare(arregloClientes[end][campo]) > 0) {
    var newObject = {};

    for (var i = 0; i < camposAGuardarCreditosDeTablas.length; i++) {
      var valorAInsertar = valor[camposAGuardarCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarCreditosDeTablas[i].tipo);

      var validarVariable = true;

      if (validarVariable) {
        newObject[camposAGuardarCreditosDeTablas[i].nombre] = valorAInsertar;
      } else {//bitacora add error porque no inserto variable
      }
    }

    ;
    arregloClientes.splice(end + 1, 0, newObject);
    return;
  }

  if ((esInt || esDec) && valor[campo] < arregloClientes[start][campo] || esString && valor[campo].localeCompare(arregloClientes[start][campo]) < 0) {
    //!!
    var newObject = {};

    for (var i = 0; i < camposAGuardarCreditosDeTablas.length; i++) {
      var valorAInsertar = valor[camposAGuardarCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarCreditosDeTablas[i].tipo);

      var validarVariable = true;

      if (validarVariable) {
        newObject[camposAGuardarCreditosDeTablas[i].nombre] = valorAInsertar;
      } else {//bitacora add error porque no inserto variable
      }
    }

    ;
    arregloClientes.splice(start, 0, newObject);
    return;
  }

  if (start >= end) {
    return;
  }

  if ((esInt || esDec) && valor[campo] < arregloClientes[m][campo] || esString && valor[campo].localeCompare(arregloClientes[m][campo]) < 0) {
    insercionBinariaClientes(valor, campo, tipoCampo, camposAGuardarCreditosDeTablas, start, m - 1);
    return;
  }

  if ((esInt || esDec) && valor[campo] > arregloClientes[m][campo] || esString && valor[campo].localeCompare(arregloClientes[m][campo]) > 0) {
    insercionBinariaClientes(valor, campo, tipoCampo, camposAGuardarCreditosDeTablas, m + 1, end);
    return;
  }
}

function insercionBinariaCreditos(valor, campoCliente, campoNumCuenta, tipoCampoCliente, tipoCampoNumCuenta, camposAGuardarDeCreditosCreditosDeTablas, startVal, endVal) {
  var length = arregloClientes.length;
  var start = typeof startVal != 'undefined' ? startVal : 0;
  var end = typeof endVal != 'undefined' ? endVal : length - 1; //!! endVal could be 0 don't use || syntax

  var m = start + Math.floor((end - start) / 2);
  var esStringCampoCliente, esIntCampoCliente, esDecCampoCliente;

  if (tipoCampoCliente == 'varchar') {
    esStringCampoCliente = true;
  } else if (tipoCampoCliente == 'int') {
    esIntCampoCliente = true;
  } else if (tipoCampoCliente == 'decimal') {
    esDecCampoCliente = true;
  }

  var esStringCampoNumCuenta, esIntCampoNumCuenta, esDecCampoNumCuenta;

  if (tipoCampoNumCuenta == 'varchar') {
    esStringCampoNumCuenta = true;
  } else if (tipoCampoNumCuenta == 'int') {
    esIntCampoNumCuenta = true;
  } else if (tipoCampoNumCuenta == 'decimal') {
    esDecCampoNumCuenta = true;
  }

  if (length == 0) {
    if (arregloClientes.length > 0) {
      if (arregloCreditos[0] == undefined) arregloCreditos[0] = [];
      if (arregloPagos[0] == undefined) arregloPagos[0] = [];
      if (arregloPagos[0][0] == undefined) arregloPagos[0][0] = []; //var newObject = {};

      /*for (var i = 0; i < camposAGuardarDeClientesCreditosDeTablas.length; i++) {
      var valorAInsertar = valor[camposAGuardarDeClientesCreditosDeTablas[i].nombre];
      //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeClientesCreditosDeTablas[i].tipo);
      var validarVariable = true;
      if( validarVariable ) {
      newObject[camposAGuardarDeClientesCreditosDeTablas[i].nombre] = valorAInsertar;
      } else {
      //bitacora add error porque no inserto variable
      }
      };*/

      var newObjectCredito = {};

      for (var i = 0; i < camposAGuardarDeCreditosCreditosDeTablas.length; i++) {
        var valorAInsertar = valor[camposAGuardarDeCreditosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeCreditosCreditosDeTablas[i].tipo);

        var validarVariable = true;

        if (validarVariable) {
          newObjectCredito[camposAGuardarDeCreditosCreditosDeTablas[i].nombre] = valorAInsertar;
        } else {//bitacora add error porque no inserto variable
        }
      }

      ; //arregloClientes.push(newObject);

      arregloCreditos[0].push(newObjectCredito);
    }

    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] == arregloClientes[m][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[m][campoCliente]) == 0) {
    if (arregloCreditos[m] == undefined) arregloCreditos[m] = [];
    var existeCredito = false;

    for (var i = 0; i < arregloCreditos[m].length; i++) {
      if ((esIntCampoNumCuenta || esDecCampoNumCuenta) && valor[campoNumCuenta] == arregloCreditos[m][i][campoNumCuenta] || esStringCampoNumCuenta && arregloCreditos[m][i][campoNumCuenta].localeCompare(valor[campoNumCuenta]) == 0) {
        existeCredito = true;
        break;
      }
    }

    ;

    if (!existeCredito) {
      var newObject = {};

      for (var i = 0; i < camposAGuardarDeCreditosCreditosDeTablas.length; i++) {
        var valorAInsertar = valor[camposAGuardarDeCreditosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeCreditosCreditosDeTablas[i].tipo);

        var validarVariable = true;

        if (validarVariable) {
          newObject[camposAGuardarDeCreditosCreditosDeTablas[i].nombre] = valorAInsertar;
        } else {//bitacora add error porque no inserto variable
        }
      }

      ;
      arregloCreditos[m].push(newObject);
    } else {
      for (var j = 0; j < camposAGuardarDeCreditosCreditosDeTablas.length; j++) {
        var valorAInsertar = valor[camposAGuardarDeCreditosCreditosDeTablas[j].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeCreditosCreditosDeTablas[i].tipo);

        var validarVariable = true;

        if (validarVariable) {
          arregloCreditos[m][i][camposAGuardarDeCreditosCreditosDeTablas[j].nombre] = valorAInsertar;
        } else {//bitacora add error porque no inserto variable
        }
      }

      ;
    }

    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] > arregloClientes[end][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[end][campoCliente]) > 0) {
    //var newObject = {};

    /*for (var i = 0; i < camposAGuardarDeClientesCreditosDeTablas.length; i++) {
    var valorAInsertar = valor[camposAGuardarDeClientesCreditosDeTablas[i].nombre];
    //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeClientesCreditosDeTablas[i].tipo);
    var validarVariable = true;
    if( validarVariable ) {
    newObject[camposAGuardarDeClientesCreditosDeTablas[i].nombre] = valorAInsertar;
    } else {
    //bitacora add error porque no inserto variable
    }
    };*/
    var newObjectCredito;

    for (var i = 0; i < camposAGuardarDeCreditosCreditosDeTablas.length; i++) {
      var valorAInsertar = valor[camposAGuardarDeCreditosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeCreditosCreditosDeTablas[i].tipo);

      var validarVariable = true;

      if (validarVariable) {
        newObjectCredito[camposAGuardarDeCreditosCreditosDeTablas[i].nombre] = valorAInsertar;
      } else {//bitacora add error porque no inserto variable
      }
    }

    ;
    var newArray = [newObjectCredito]; //arregloClientes.splice(end + 1, 0, newObject);

    arregloCreditos.splice(end + 1, 0, newArray);
    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] < arregloClientes[start][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[start][campoCliente]) < 0) {
    //!!
    //var newObject = {};

    /*for (var i = 0; i < camposAGuardarDeClientesCreditosDeTablas.length; i++) {
    var valorAInsertar = valor[camposAGuardarDeClientesCreditosDeTablas[i].nombre];
    //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeClientesCreditosDeTablas[i].tipo);
    var validarVariable = true;
    if( validarVariable ) {
    newObject[camposAGuardarDeClientesCreditosDeTablas[i].nombre] = valorAInsertar;
    } else {
    //bitacora add error porque no inserto variable
    }
    };*/
    var newObjectCredito;

    for (var i = 0; i < camposAGuardarDeCreditosCreditosDeTablas.length; i++) {
      var valorAInsertar = valor[camposAGuardarDeCreditosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeCreditosCreditosDeTablas[i].tipo);

      var validarVariable = true;

      if (validarVariable) {
        newObjectCredito[camposAGuardarDeCreditosCreditosDeTablas[i].nombre] = valorAInsertar;
      } else {//bitacora add error porque no inserto variable
      }
    }

    ;
    var newArray = [newObjectCredito]; //arregloClientes.splice(start, 0, newObject);

    arregloCreditos.splice(start, 0, newArray);
    return;
  }

  if (start >= end) {
    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] < arregloClientes[m][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[m][campoCliente]) < 0) {
    insercionBinariaCreditos(valor, campoCliente, campoNumCuenta, tipoCampoCliente, tipoCampoNumCuenta, camposAGuardarDeCreditosCreditosDeTablas, start, m - 1);
    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] > arregloClientes[m][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[m][campoCliente]) > 0) {
    insercionBinariaCreditos(valor, campoCliente, campoNumCuenta, tipoCampoCliente, tipoCampoNumCuenta, camposAGuardarDeCreditosCreditosDeTablas, m + 1, end);
    return;
  }
}

function insercionBinariaPagos(valor, campoCliente, campoNumCuenta, tipoCampoCliente, tipoCampoNumCuenta, camposAGuardarDeClientesCreditosDeTablas, camposAGuardarDeCreditosCreditosDeTablas, camposAGuardarDePagosCreditosDeTablas, startVal, endVal) {
  var length = arregloClientes.length;
  var start = typeof startVal != 'undefined' ? startVal : 0;
  var end = typeof endVal != 'undefined' ? endVal : length - 1; //!! endVal could be 0 don't use || syntax

  var m = start + Math.floor((end - start) / 2);
  var esStringCampoCliente, esIntCampoCliente, esDecCampoCliente;

  if (tipoCampoCliente == 'varchar') {
    esStringCampoCliente = true;
  } else if (tipoCampoCliente == 'int') {
    esIntCampoCliente = true;
  } else if (tipoCampoCliente == 'decimal') {
    esDecCampoCliente = true;
  }

  var esStringCampoNumCuenta, esIntCampoNumCuenta, esDecCampoNumCuenta;

  if (tipoCampoNumCuenta == 'varchar') {
    esStringCampoNumCuenta = true;
  } else if (tipoCampoNumCuenta == 'int') {
    esIntCampoNumCuenta = true;
  } else if (tipoCampoNumCuenta == 'decimal') {
    esDecCampoNumCuenta = true;
  }

  if (length == 0) {
    if (arregloClientes.length > 0) {
      if (arregloCreditos[0] == undefined) arregloCreditos[0] = [];
      if (arregloPagos[0] == undefined) arregloPagos[0] = [];
      if (arregloPagos[0][0] == undefined) arregloPagos[0][0] = [];
      var newObject = {};

      for (var i = 0; i < camposAGuardarDeClientesCreditosDeTablas.length; i++) {
        var valorAInsertar = valor[camposAGuardarDeClientesCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeClientesCreditosDeTablas[i].tipo);

        var validarVariable = true;

        if (validarVariable) {
          newObject[camposAGuardarDeClientesCreditosDeTablas[i].nombre] = valorAInsertar;
        } else {//bitacora add error porque no inserto variable
        }
      }

      ;
      var newObjectCredito = {};

      for (var i = 0; i < camposAGuardarDeCreditosCreditosDeTablas.length; i++) {
        var valorAInsertar = valor[camposAGuardarDeCreditosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeCreditosCreditosDeTablas[i].tipo);

        var validarVariable = true;

        if (validarVariable) {
          newObjectCredito[camposAGuardarDeCreditosCreditosDeTablas[i].nombre] = valorAInsertar;
        } else {//bitacora add error porque no inserto variable
        }
      }

      ;
      var newObjectPago = {};

      for (var i = 0; i < camposAGuardarDePagosCreditosDeTablas.length; i++) {
        var valorAInsertar = valor[camposAGuardarDePagosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDePagosCreditosDeTablas[i].tipo);

        var validarVariable = true;

        if (validarVariable) {
          newObjectPago[camposAGuardarDePagosCreditosDeTablas[i].nombre] = valorAInsertar;
        } else {//bitacora add error porque no inserto variable
        }
      }

      ;
      arregloClientes.push(newObject);
      arregloCreditos[0].push(newObjectCredito);
      arregloPagos[0][0].push(newObjectPago);
    }

    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] == arregloClientes[m][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[m][campoCliente]) == 0) {
    if (arregloCreditos[m] == undefined) arregloCreditos[m] = [];
    var existeCredito = false;

    for (var i = 0; i < arregloCreditos[m].length; i++) {
      if ((esIntCampoNumCuenta || esDecCampoNumCuenta) && valor[campoNumCuenta] == arregloCreditos[m][i][campoNumCuenta] || esStringCampoNumCuenta && arregloCreditos[m][i][campoNumCuenta].localeCompare(valor[campoNumCuenta]) == 0) {
        existeCredito = true;
        var newObjectPago = {};

        for (var j = 0; j < camposAGuardarDePagosCreditosDeTablas.length; j++) {
          var valorAInsertar = valor[camposAGuardarDePagosCreditosDeTablas[j].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDePagosCreditosDeTablas[j].tipo);

          var validarVariable = true;

          if (validarVariable) {
            newObjectPago[camposAGuardarDePagosCreditosDeTablas[j].nombre] = valorAInsertar;
          } else {//bitacora add error porque no inserto variable
          }
        }

        ;
        if (arregloPagos[m] == undefined) arregloPagos[m] = [];
        if (arregloPagos[m][i] == undefined) arregloPagos[m][i] = [];
        arregloPagos[m][i].push(newObjectPago);
        break;
      }
    }

    ;

    if (!existeCredito) {
      var newObject = {};

      for (var i = 0; i < camposAGuardarCreditosDeTablas.length; i++) {
        var valorAInsertar = valor[camposAGuardarCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarCreditosDeTablas[i].tipo);

        var validarVariable = true;

        if (validarVariable) {
          newObject[camposAGuardarCreditosDeTablas[i].nombre] = valorAInsertar;
        } else {//bitacora add error porque no inserto variable
        }
      }

      ;
      var newObjectPago = {};

      for (var i = 0; i < camposAGuardarDePagosCreditosDeTablas.length; i++) {
        var valorAInsertar = valor[camposAGuardarDePagosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDePagosCreditosDeTablas[i].tipo);

        var validarVariable = true;

        if (validarVariable) {
          newObjectPago[camposAGuardarDePagosCreditosDeTablas[i].nombre] = valorAInsertar;
        } else {//bitacora add error porque no inserto variable
        }
      }

      ;
      arregloCreditos[m].push(newObject);
      if (arregloPagos[m][0] == undefined) arregloPagos[m][0] = [];
      arregloPagos[m][0].push(newObjectPago);
    }

    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] > arregloClientes[end][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[end][campoCliente]) > 0) {
    /*var newObject = {};
    for (var i = 0; i < camposAGuardarDeClientesCreditosDeTablas.length; i++) {
    var valorAInsertar = valor[camposAGuardarDeClientesCreditosDeTablas[i].nombre];
    //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeClientesCreditosDeTablas[i].tipo);
    var validarVariable = true;
    if( validarVariable ) {
    newObject[camposAGuardarDeClientesCreditosDeTablas[i].nombre] = valorAInsertar;
    } else {
    //bitacora add error porque no inserto variable
    }
    };
    var newObjectCredito = {};
    for (var i = 0; i < camposAGuardarDeCreditosCreditosDeTablas.length; i++) {
    var valorAInsertar = valor[camposAGuardarDeCreditosCreditosDeTablas[i].nombre];
    //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeCreditosCreditosDeTablas[i].tipo);
    var validarVariable = true;
    if( validarVariable ) {
    newObjectCredito[camposAGuardarDeCreditosCreditosDeTablas[i].nombre] = valorAInsertar;
    } else {
    //bitacora add error porque no inserto variable
    }
    };
    var newArray = [newObjectCredito];*/
    var newObjectPago = {};

    for (var i = 0; i < camposAGuardarDePagosCreditosDeTablas.length; i++) {
      var valorAInsertar = valor[camposAGuardarDePagosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDePagosCreditosDeTablas[i].tipo);

      var validarVariable = true;

      if (validarVariable) {
        newObjectPago[camposAGuardarDePagosCreditosDeTablas[i].nombre] = valorAInsertar;
      } else {//bitacora add error porque no inserto variable
      }
    }

    ;
    var newArrayPagos = [[newObjectPago]];
    /*arregloClientes.splice(end + 1, 0, newObject);
    arregloCreditos.splice(end + 1, 0, newArray);*/

    arregloPagos.splice(end + 1, 0, newArrayPagos);
    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] < arregloClientes[start][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[start][campoCliente]) < 0) {
    //!!

    /*var newObject = {};
       for (var i = 0; i < camposAGuardarDeClientesCreditosDeTablas.length; i++) {
    	var valorAInsertar = valor[camposAGuardarDeClientesCreditosDeTablas[i].nombre];
    	//var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeClientesCreditosDeTablas[i].tipo);
    	var validarVariable = true;
    	if( validarVariable ) {
    		newObject[camposAGuardarDeClientesCreditosDeTablas[i].nombre] = valorAInsertar;
    	} else {
    		//bitacora add error porque no inserto variable
    	}
    };
    var newObjectCredito = {};
       for (var i = 0; i < camposAGuardarDeCreditosCreditosDeTablas.length; i++) {
    	var valorAInsertar = valor[camposAGuardarDeCreditosCreditosDeTablas[i].nombre];
    	//var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeCreditosCreditosDeTablas[i].tipo);
    	var validarVariable = true;
    	if( validarVariable ) {
    		newObjectCredito[camposAGuardarDeCreditosCreditosDeTablas[i].nombre] = valorAInsertar;
    	} else {
    		//bitacora add error porque no inserto variable
    	}
    };
    var newArray = [newObjectCredito];*/
    var newObjectPago = {};

    for (var i = 0; i < camposAGuardarDePagosCreditosDeTablas.length; i++) {
      var valorAInsertar = valor[camposAGuardarDePagosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDePagosCreditosDeTablas[i].tipo);

      var validarVariable = true;

      if (validarVariable) {
        newObjectPago[camposAGuardarDePagosCreditosDeTablas[i].nombre] = valorAInsertar;
      } else {//bitacora add error porque no inserto variable
      }
    }

    ;
    var newArrayPagos = [[newObjectPago]];
    /*arregloClientes.splice(start, 0, newObject);
    arregloCreditos.splice(start, 0, newArray);*/

    arregloPagos.splice(start, 0, newArrayPagos);
    return;
  }

  if (start >= end) {
    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] < arregloClientes[m][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[m][campoCliente]) < 0) {
    insercionBinariaPagos(valor, campoCliente, campoNumCuenta, tipoCampoCliente, tipoCampoNumCuenta, camposAGuardarDeClientesCreditosDeTablas, camposAGuardarDeCreditosCreditosDeTablas, camposAGuardarDePagosCreditosDeTablas, start, m - 1);
    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] > arregloClientes[m][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[m][campoCliente]) > 0) {
    insercionBinariaPagos(valor, campoCliente, campoNumCuenta, tipoCampoCliente, tipoCampoNumCuenta, camposAGuardarDeClientesCreditosDeTablas, camposAGuardarDeCreditosCreditosDeTablas, camposAGuardarDePagosCreditosDeTablas, m + 1, end);
    return;
  }
}

function insercionBinariaPlanPagos(valor, campoCliente, campoNumCuenta, tipoCampoCliente, tipoCampoNumCuenta, camposAGuardarDeClientesCreditosDeTablas, camposAGuardarDeCreditosCreditosDeTablas, camposAGuardarDePagosCreditosDeTablas, startVal, endVal) {
  var length = arregloClientes.length;
  var start = typeof startVal != 'undefined' ? startVal : 0;
  var end = typeof endVal != 'undefined' ? endVal : length - 1; //!! endVal could be 0 don't use || syntax

  var m = start + Math.floor((end - start) / 2);
  var esStringCampoCliente, esIntCampoCliente, esDecCampoCliente;

  if (tipoCampoCliente == 'varchar') {
    esStringCampoCliente = true;
  } else if (tipoCampoCliente == 'int') {
    esIntCampoCliente = true;
  } else if (tipoCampoCliente == 'decimal') {
    esDecCampoCliente = true;
  }

  var esStringCampoNumCuenta, esIntCampoNumCuenta, esDecCampoNumCuenta;

  if (tipoCampoNumCuenta == 'varchar') {
    esStringCampoNumCuenta = true;
  } else if (tipoCampoNumCuenta == 'int') {
    esIntCampoNumCuenta = true;
  } else if (tipoCampoNumCuenta == 'decimal') {
    esDecCampoNumCuenta = true;
  }

  if (length == 0) {
    if (arregloClientes.length > 0) {
      if (arregloCreditos[0] == undefined) arregloCreditos[0] = [];
      if (arregloPlanPagos[0] == undefined) arregloPlanPagos[0] = [];
      if (arregloPlanPagos[0][0] == undefined) arregloPlanPagos[0][0] = [];
      /*var newObject = {};
         for (var i = 0; i < camposAGuardarDeClientesCreditosDeTablas.length; i++) {
      	var valorAInsertar = valor[camposAGuardarDeClientesCreditosDeTablas[i].nombre];
      	//var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeClientesCreditosDeTablas[i].tipo);
      	var validarVariable = true;
      	if( validarVariable ) {
      		newObject[camposAGuardarDeClientesCreditosDeTablas[i].nombre] = valorAInsertar;
      	} else {
      		//bitacora add error porque no inserto variable
      	}
      };
      var newObjectCredito = {};
         for (var i = 0; i < camposAGuardarDeCreditosCreditosDeTablas.length; i++) {
      	var valorAInsertar = valor[camposAGuardarDeCreditosCreditosDeTablas[i].nombre];
      	//var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeCreditosCreditosDeTablas[i].tipo);
      	var validarVariable = true;
      	if( validarVariable ) {
      		newObjectCredito[camposAGuardarDeCreditosCreditosDeTablas[i].nombre] = valorAInsertar;
      	} else {
      		//bitacora add error porque no inserto variable
      	}
      };*/

      var newObjectPago = {};

      for (var i = 0; i < camposAGuardarDePagosCreditosDeTablas.length; i++) {
        var valorAInsertar = valor[camposAGuardarDePagosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDePagosCreditosDeTablas[i].tipo);

        var validarVariable = true;

        if (validarVariable) {
          newObjectPago[camposAGuardarDePagosCreditosDeTablas[i].nombre] = valorAInsertar;
        } else {//bitacora add error porque no inserto variable
        }
      }

      ;
      /*arregloClientes.push(newObject);
         arregloCreditos[0].push(newObjectCredito);*/

      arregloPlanPagos[0][0].push(newObjectPago);
    }

    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] == arregloClientes[m][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[m][campoCliente]) == 0) {
    if (arregloCreditos[m] == undefined) arregloCreditos[m] = [];
    var existeCredito = false;

    for (var i = 0; i < arregloCreditos[m].length; i++) {
      if ((esIntCampoNumCuenta || esDecCampoNumCuenta) && valor[campoNumCuenta] == arregloCreditos[m][i][campoNumCuenta] || esStringCampoNumCuenta && arregloCreditos[m][i][campoNumCuenta].localeCompare(valor[campoNumCuenta]) == 0) {
        existeCredito = true;
        var newObjectPago = {};

        for (var j = 0; j < camposAGuardarDePagosCreditosDeTablas.length; j++) {
          var valorAInsertar = valor[camposAGuardarDePagosCreditosDeTablas[j].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDePagosCreditosDeTablas[j].tipo);

          var validarVariable = true;

          if (validarVariable) {
            newObjectPago[camposAGuardarDePagosCreditosDeTablas[j].nombre] = valorAInsertar;
          } else {//bitacora add error porque no inserto variable
          }
        }

        ;
        if (arregloPlanPagos[m] == undefined) arregloPlanPagos[m] = [];
        if (arregloPlanPagos[m][i] == undefined) arregloPlanPagos[m][i] = [];
        arregloPlanPagos[m][i].push(newObjectPago);
        break;
      }
    }

    ;

    if (!existeCredito) {
      var newObject = {};

      for (var i = 0; i < camposAGuardarCreditosDeTablas.length; i++) {
        var valorAInsertar = valor[camposAGuardarCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarCreditosDeTablas[i].tipo);

        var validarVariable = true;

        if (validarVariable) {
          newObject[camposAGuardarCreditosDeTablas[i].nombre] = valorAInsertar;
        } else {//bitacora add error porque no inserto variable
        }
      }

      ;
      var newObjectPago = {};

      for (var i = 0; i < camposAGuardarDePagosCreditosDeTablas.length; i++) {
        var valorAInsertar = valor[camposAGuardarDePagosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDePagosCreditosDeTablas[i].tipo);

        var validarVariable = true;

        if (validarVariable) {
          newObjectPago[camposAGuardarDePagosCreditosDeTablas[i].nombre] = valorAInsertar;
        } else {//bitacora add error porque no inserto variable
        }
      }

      ;
      arregloCreditos[m].push(newObject);
      if (arregloPlanPagos[m][0] == undefined) arregloPlanPagos[m][0] = [];
      arregloPlanPagos[m][0].push(newObjectPago);
    }

    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] > arregloClientes[end][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[end][campoCliente]) > 0) {
    /*var newObject = {};
    for (var i = 0; i < camposAGuardarDeClientesCreditosDeTablas.length; i++) {
    var valorAInsertar = valor[camposAGuardarDeClientesCreditosDeTablas[i].nombre];
    //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeClientesCreditosDeTablas[i].tipo);
    var validarVariable = true;
    if( validarVariable ) {
    newObject[camposAGuardarDeClientesCreditosDeTablas[i].nombre] = valorAInsertar;
    } else {
    //bitacora add error porque no inserto variable
    }
    };
    var newObjectCredito = {};
    for (var i = 0; i < camposAGuardarDeCreditosCreditosDeTablas.length; i++) {
    var valorAInsertar = valor[camposAGuardarDeCreditosCreditosDeTablas[i].nombre];
    //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeCreditosCreditosDeTablas[i].tipo);
    var validarVariable = true;
    if( validarVariable ) {
    newObjectCredito[camposAGuardarDeCreditosCreditosDeTablas[i].nombre] = valorAInsertar;
    } else {
    //bitacora add error porque no inserto variable
    }
    };
    var newArray = [newObjectCredito];*/
    var newObjectPago = {};

    for (var i = 0; i < camposAGuardarDePagosCreditosDeTablas.length; i++) {
      var valorAInsertar = valor[camposAGuardarDePagosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDePagosCreditosDeTablas[i].tipo);

      var validarVariable = true;

      if (validarVariable) {
        newObjectPago[camposAGuardarDePagosCreditosDeTablas[i].nombre] = valorAInsertar;
      } else {//bitacora add error porque no inserto variable
      }
    }

    ;
    var newArrayPagos = [[newObjectPago]];
    /*arregloClientes.splice(end + 1, 0, newObject);
    arregloCreditos.splice(end + 1, 0, newArray);*/

    arregloPlanPagos.splice(end + 1, 0, newArrayPagos);
    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] < arregloClientes[start][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[start][campoCliente]) < 0) {
    //!!

    /*var newObject = {};
       for (var i = 0; i < camposAGuardarDeClientesCreditosDeTablas.length; i++) {
    	var valorAInsertar = valor[camposAGuardarDeClientesCreditosDeTablas[i].nombre];
    	//var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeClientesCreditosDeTablas[i].tipo);
    	var validarVariable = true;
    	if( validarVariable ) {
    		newObject[camposAGuardarDeClientesCreditosDeTablas[i].nombre] = valorAInsertar;
    	} else {
    		//bitacora add error porque no inserto variable
    	}
    };
    var newObjectCredito = {};
       for (var i = 0; i < camposAGuardarDeCreditosCreditosDeTablas.length; i++) {
    	var valorAInsertar = valor[camposAGuardarDeCreditosCreditosDeTablas[i].nombre];
    	//var validarVariable = checkVariable(valorAInsertar, camposAGuardarDeCreditosCreditosDeTablas[i].tipo);
    	var validarVariable = true;
    	if( validarVariable ) {
    		newObjectCredito[camposAGuardarDeCreditosCreditosDeTablas[i].nombre] = valorAInsertar;
    	} else {
    		//bitacora add error porque no inserto variable
    	}
    };
    var newArray = [newObjectCredito];*/
    var newObjectPago = {};

    for (var i = 0; i < camposAGuardarDePagosCreditosDeTablas.length; i++) {
      var valorAInsertar = valor[camposAGuardarDePagosCreditosDeTablas[i].nombre]; //var validarVariable = checkVariable(valorAInsertar, camposAGuardarDePagosCreditosDeTablas[i].tipo);

      var validarVariable = true;

      if (validarVariable) {
        newObjectPago[camposAGuardarDePagosCreditosDeTablas[i].nombre] = valorAInsertar;
      } else {//bitacora add error porque no inserto variable
      }
    }

    ;
    var newArrayPagos = [[newObjectPago]];
    /*arregloClientes.splice(start, 0, newObject);
    arregloCreditos.splice(start, 0, newArray);*/

    arregloPlanPagos.splice(start, 0, newArrayPagos);
    return;
  }

  if (start >= end) {
    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] < arregloClientes[m][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[m][campoCliente]) < 0) {
    insercionBinariaPlanPagos(valor, campoCliente, campoNumCuenta, tipoCampoCliente, tipoCampoNumCuenta, camposAGuardarDeClientesCreditosDeTablas, camposAGuardarDeCreditosCreditosDeTablas, camposAGuardarDePagosCreditosDeTablas, start, m - 1);
    return;
  }

  if ((esIntCampoCliente || esDecCampoCliente) && valor[campoCliente] > arregloClientes[m][campoCliente] || esStringCampoCliente && valor[campoCliente].localeCompare(arregloClientes[m][campoCliente]) > 0) {
    insercionBinariaPlanPagos(valor, campoCliente, campoNumCuenta, tipoCampoCliente, tipoCampoNumCuenta, camposAGuardarDeClientesCreditosDeTablas, camposAGuardarDeCreditosCreditosDeTablas, camposAGuardarDePagosCreditosDeTablas, m + 1, end);
    return;
  }
}
/* ================================		UTILS		================================*/
//# sourceMappingURL=ClasificarCreditoD.js.map
