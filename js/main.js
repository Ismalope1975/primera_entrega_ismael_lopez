
window.onload = (event) => {
    console.log('Pagina html cargada');

     //validar numero de cedula formato 8 digitos y sin guiones
    function validarCedula(doc) {
        if (doc.length !== 8) return false;
        for (let i = 0; i < doc.length; i++) {
            if (isNaN(doc[i])) return false;
        }
        return true;
    }
    //validar si los datos de nombre etc no estan vacios y no tienen numeros
    function contieneNumeros(str) {
        for (let i = 0; i < str.length; i++) {
            if (!isNaN(str[i]) && str[i] !== ' ') {
                return true;
            }
        }
        return false;
    }
    // calcular interes a aplicar segun la cantidad de cuotas
    function calculointeres(cuotas) {
        switch (true) {
            case (cuotas >= 1 && cuotas <= 2):
                return 0.15;
            case (cuotas >= 3 && cuotas <= 5):
                return 0.50;
            case (cuotas >= 6 && cuotas <= 10):
                return 0.75;
            case (cuotas >= 11 && cuotas <= 18):
                return 0.80;
            case (cuotas >= 19 && cuotas <= 24):
                return 1.10;
            case (cuotas >= 25 && cuotas <= 36):
                return 1.45;
            default:
                return 0;
        }
    }
    //calcular totales de financiacion, cuotas , intereses
    function calculartotales(ingresopromedio, totalpedido, cuotas) {
        const interestRango = calculointeres(cuotas);
        const montototal = totalpedido * (1 + interestRango);
        const montocuota = montototal / cuotas;
        const maximovalorcuota = ingresopromedio * 0.25;
        //validar que la cuota no exceda el 25% del salario
        if (montocuota > maximovalorcuota) {
            return `La cuota no puede superar el 25% de los ingresos mensuales. Máximo permitido: ${maximovalorcuota.toFixed(2)}`;
        }
        return {
            montocuota: montocuota.toFixed(2),
            totalaPagar: montototal.toFixed(2)
        };
    }
    //funcion ppal para pedir y validar los datos
    function main() {
        let vendedorName, clientName, apellidoname, documentoId, ingresopromedio, totalpedido, cuotas;

        while (true) {

            vendedorName = prompt("Ingrese el nombre del vendedor:").toUpperCase();
            while (vendedorName === "" || contieneNumeros(vendedorName)) {
                vendedorName = prompt("El nombre del vendedor no puede estar vacío ni contener números. Ingrese el nombre del vendedor:").toUpperCase();
            }
            clientName = prompt("Ingrese el nombre del cliente:").toUpperCase();
            while (clientName === "" || contieneNumeros(clientName)) {
                clientName = prompt("El nombre del cliente no puede estar vacío ni contener números. Ingrese el nombre del cliente:").toUpperCase();
            }
            apellidoname = prompt("Ingrese el apellido del cliente:").toUpperCase();
            while (apellidoname === "" || contieneNumeros(apellidoname)) {
                apellidoname = prompt("El nombre del cliente no puede estar vacío ni contener números. Ingrese el nombre del cliente:").toUpperCase();
            }
            while (true) {
                documentoId = prompt("Ingrese el documento de identidad (8 dígitos):");
                if (!validarCedula(documentoId)) {
                    alert("Documento de identidad inválido. Debe tener 8 dígitos sin guiones");
                    continue;
                }
                break;
            }
            while (true) {
                ingresopromedio = parseFloat(prompt("Digite los ingresos mensuales promedio:"));
                
                if (isNaN(ingresopromedio)) {
                    alert("Por favor, ingrese un valor válido para los ingresos mensuales.");
                } else if (ingresopromedio <= 20000) {
                    alert("Los ingresos mensuales deben ser mayores a 20,000.");
                } else {
                    break;
                }
            }
            while (true) {
                totalpedido = parseFloat(prompt("Ingrese el monto que desea solicitar en préstamo:"));
                
                if (isNaN(totalpedido)) {
                    alert("Por favor, ingrese un valor numérico válido para el monto del préstamo.");
                } else if (totalpedido > ingresopromedio * 6) {
                    alert("El monto del préstamo no puede ser mayor a 6 veces los ingresos mensuales.");
                } else {
                    break;
                }
            }
            while (true) {
            cuotas = parseInt(prompt("Ingrese la cantidad de cuotas:"));
            if (isNaN(cuotas) || cuotas < 1 || cuotas > 36) {
                alert("Por favor, ingrese un valor numérico válido para la cantidad de cuotas (entre 1 y 36).");
                continue;
            }
            break;
            }

        break;
        }

        const result = calculartotales(ingresopromedio, totalpedido, cuotas);

        if (typeof result === 'string') {
            alert(result);
        } 
        else {
            mensaje = "PRESTAMO SOLICITADO:";
            mensaje +="\nNombre del vendedor: " + vendedorName;
            mensaje +="\nNombre del cliente: " + apellidoname + " " + clientName;
            mensaje +="\nDocumento de identidad: " + documentoId;
            mensaje +="\nMonto: $" + totalpedido.toFixed(2);
            mensaje +="\nPlazo financiación: " + cuotas + " Meses";
            mensaje +="\nValor de Cuota: $" + result.montocuota + " pesos";
            mensaje +="\nTotal final a pagar: " + result.totalaPagar;
            alert(mensaje)
        }

        if (confirm("¿Desea generar otra simulación?")) {
            main();
        } else {
            alert("Gracias por trabajar con nosotros.");
        }
    }
    main();
};
