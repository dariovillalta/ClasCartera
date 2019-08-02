/*		HACER  METODO GIARDAR VALIDACION PARA GUARDAR A TABLAS	*/
/*		HACER  ARREGLOS DE RESULTADOS CON CALCULO MISMA VARIABLE PARA AHORRAR MEMORIA	*/
/*		ver cuaderno pasos			*/
/*		guardar bitacora moras		*/


/***************	VARIABLES	***************/
var arregloPagos = [];		//Arreglo que contiene los pagos individuales de los prestamos
/*					=arregloPagos=
	[cliente1]	[prestamo1]		[pago1, pago2, pago3]
				[prestamo2]		[pago1, pago2, pago3]
				[prestamo3]		[pago1, pago2, pago3]
	[cliente2]	[prestamo1]		[pago1, pago2, pago3]
				[prestamo2]		[pago1, pago2, pago3]
				[prestamo3]		[pago1, pago2, pago3]
*/
var arregloCreditos = [];		//Arreglo que contiene los prestamos ordenados ascendentemente por el id de cliente
/*					=arregloCreditos=
	[cliente1]	[prestamo1, prestamo2, prestamo3]
	[cliente2]	[prestamo1, prestamo2, prestamo3]
	[cliente3]	[prestamo1, prestamo2, prestamo3]
*/
var arregloClientes = [];		//Arreglo que contiene los clientes ordenados ascendentemente por id
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

function ordenarPagos (arregloCreditosTodos) {
	arregloCreditosTodos.sort(function(a, b){
            if(a.campoFecha.getTime() < b.campoFecha.getTime()) { return -1; }
            if(a.campoFecha.getTime() > b.campoFecha.getTime()) { return 1; }
            return 0;
        });
}


/*		
	DEF: Metodo para crear arreglo de clientes ordenados por id
	INPUT: arreglo de todos los pagos de credito ordenado por fecha
	OUTPUT: arreglo de clientes ordenados ascendentemente por id
*/

function crearArregloClientes (arregloCreditosTodos) {
	arregloClientes = [];
	for (var i = 0; i < arregloCreditosTodos.length; i++) {
		insercionBinaria(arregloCreditosTodos[i], 'clienteID', arregloClientes);
	};
}

/*		
	DEF: Metodo para crear arreglo de prestamos ordenados por id de cliente
	INPUT: arreglo de todos los pagos de credito ordenado por fecha
	OUTPUT: arreglo de prestamos ordenados por id de cliente
*/

function crearArregloCreditos (arregloCreditosTodos) {
	arregloCreditos = [];
	for (var i = 0; i < arregloCreditosTodos.length; i++) {
		insercionBinaria(arregloCreditosTodos[i], 'numeroCuenta', arregloCreditos);
	};
}

/*		
	DEF: Metodo para crear arreglo de pagos de prestamos ordenados por id de cliente
	INPUT: arreglo de todos los pagos de credito
	OUTPUT: arreglo de pagos de prestamos ordenados por id de cliente
*/

function crearArregloPagos (arregloCreditosTodos) {
	arregloPagos = [];
	for (var i = 0; i < arregloCreditosTodos.length; i++) {
		insercionBinaria(arregloCreditosTodos[i], 'numeroCuenta', arregloPagos);
	};
}


/*		
	DEF: Metodo para calcular los dias de mora
	INPUT: arreglo de todos los pagos de credito ordenado por fecha
	OUTPUT: arreglo de prestamos individuales con su valor de dias de mora
*/

function calcularDiasMora (arregloCreditosTodos) {
	var arregloPrestamos = [];
	for (var i = 0; i < arregloCreditosTodos.length; i++) {
		//i = posicion cliente
		for (var j = 0; j < arregloCreditosTodos[i].length; j++) {
			//j = posicion prestamo
			for (var k = 0; k < arregloCreditosTodos[i][j].length; k++) {
				//k = posicion pago
				arregloPagos[i][j][k];
			};
		};
	};
}

/*		
	DEF: Metodo para clasificar prestamos individuales
	INPUT: arreglo de todos los pagos de credito ordenado por fecha
	OUTPUT: arregloCreditos clasificado por prestamos individuales
*/

function clasificarCreditos (arregloCreditosTodos) {
	var arregloPrestamos = [];
	for (var i = 0; i < arregloCreditosTodos.length; i++) {
		//i = posicion cliente
		for (var j = 0; j < arregloCreditosTodos[i].length; j++) {
			//j = posicion prestamo
			for (var k = 0; k < Things.length; k++) {
				//k = posicion pago
			};
		};
	};
}



































/* ================================		INSERCION BINARIA		================================*/

/*		
	DEF: Metodo para insertar binariamente
	INPUT: valor a buscar, campo a comparar, arreglo donde insertar
	OUTPUT:
*/

function insercionBinaria (valor, campo, arregloAInsertar) {
}


/* ================================		UTILS		================================*/
