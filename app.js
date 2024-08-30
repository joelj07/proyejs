// Objeto para manejar todo el quiz
const quizApp = {
    preguntasYRespuestas: [], // Inicialmente vacío, cargaremos las preguntas desde un JSON externo
    comentarios: [
        "¡No te preocupes! ¡Puedes intentarlo de nuevo y mejorar tu puntaje!",
        "¡Bien hecho! Tienes un conocimiento bueno sobre Naruto.",
        "¡Increíble! ¡Eres un verdadero fan de Naruto!",
        "¡Impresionante! ¡Eres un hokage!"
    ],
    score: 0, // Puntaje inicializado en 0
    store: [], // Almacén de respuestas

    // Función para cargar las preguntas y respuestas desde un JSON externo
    // Función para cargar las preguntas y respuestas desde un JSON externo
cargarPreguntas: async function() {
    try {
        // AQUÍ ESTÁ LO QUE ME PIDES
        // Intentamos obtener los datos de preguntas desde un archivo JSON externo
        const response = await fetch('./info.json');

        // Verificamos si la respuesta es correcta
        if (!response.ok) {
            this.mostrarMensaje(`Error en la solicitud: ${response.status}`);
            return;
        }

        // Convertimos la respuesta a formato JSON
        const data = await response.json();

        // Guardamos las preguntas y respuestas obtenidas
        this.preguntasYRespuestas = data;  // Cambiado para asignar directamente `data`
        
        // Mostrar las preguntas después de cargarlas
        this.mostrarPreguntas();

    } catch (error) {
        // Capturamos cualquier error que ocurra durante `fetch` o el manejo de la respuesta
        this.mostrarMensaje('Ocurrió un error al cargar las preguntas: ' + error.message);
    }
},


    // Función para mostrar las preguntas
    // Función para mostrar las preguntas
    mostrarPreguntas: function() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Limpiar cualquier contenido previo
    this.preguntasYRespuestas.forEach((preguntaObj, index) => {
        const preguntaDiv = document.createElement("div");

        // Crear título de la pregunta
        const preguntaTitulo = document.createElement("h3");
        preguntaTitulo.textContent = (index + 1) + ". " + preguntaObj.pregunta;
        preguntaDiv.appendChild(preguntaTitulo);

        // Crear opciones
        preguntaObj.opciones.forEach((opcion, opcionIndex) => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "pregunta" + index;
            radio.value = opcionIndex.toString(); // Asignamos el índice como valor
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opcion));
            preguntaDiv.appendChild(label);
            preguntaDiv.appendChild(document.createElement("br"));
        });

        quizContainer.appendChild(preguntaDiv);
    });
}
,

    // Función para calcular el resultado
    calcularResultado: function() {
        this.score = 0; // Reiniciar el puntaje cada vez que se calcula el resultado
        this.store = []; // Reiniciar las respuestas almacenadas
    
        this.preguntasYRespuestas.forEach((preguntaObj, index) => {
            const userAnswer = document.querySelector(`input[name="pregunta${index}"]:checked`);
            if (userAnswer && parseInt(userAnswer.value) === preguntaObj.respuesta) {
                this.score++;
                this.store.push({
                    pregunta: preguntaObj.pregunta,
                    respuestaCorrecta: preguntaObj.respuesta,
                    respuestaUsuario: userAnswer.value,
                    correcta: true
                });
            } else {
                this.store.push({
                    pregunta: preguntaObj.pregunta,
                    respuestaCorrecta: preguntaObj.respuesta,
                    respuestaUsuario: userAnswer ? userAnswer.value : "No respondida",
                    correcta: false
                });
            }
        });
    
        localStorage.setItem('quizScore', this.score);
        localStorage.setItem('quizStore', JSON.stringify(this.store));
    
        this.mostrarResultado();
    }
    ,

    // Función para mostrar el resultado final
    mostrarResultado: function() {
        const resultContainer = document.getElementById("result-container");
        resultContainer.innerHTML = `<h2>Tu puntuación final es: ${this.score} de ${this.preguntasYRespuestas.length}.</h2>`;

        let comentarioFinal;
        if (this.score === 0) {
            comentarioFinal = this.comentarios[0];
        } else if (this.score === 1) {
            comentarioFinal = this.comentarios[1];
        } else if (this.score === 2) {
            comentarioFinal = this.comentarios[2];
        } else {
            comentarioFinal = this.comentarios[3];
        }

        const evaluacion = document.createElement("p");
        this.store.forEach(item => {
            evaluacion.innerHTML += `- Pregunta: ${item.pregunta}<br>   Respuesta correcta: ${item.respuestaCorrecta}, ingresaste ${item.respuestaUsuario}.<br>   Correcta: ${item.correcta ? "Sí" : "No"}<br><br>`;
        });

        evaluacion.innerHTML += `<p>${comentarioFinal}</p>`;
        evaluacion.innerHTML += `<p>Espero que hayan disfrutado de estas preguntas del Quiz de Naruto, te esperamos de vuelta.</p>`;
        resultContainer.appendChild(evaluacion);
    },

    // Función para cargar los datos del storage al iniciar el quiz
    cargarDatosStorage: function() {
        // Aquí está el storage: Cargar el puntaje y respuestas desde localStorage
        const storedScore = localStorage.getItem('quizScore');
        const storedStore = localStorage.getItem('quizStore');
        if (storedScore && storedStore) {
            this.score = parseInt(storedScore);
            this.store = JSON.parse(storedStore);
        }
    },

    // Función para mostrar mensajes en el DOM en lugar de usar console o alert
    mostrarMensaje: function(mensaje) {
        const mensajeContainer = document.getElementById("mensaje-container");
        mensajeContainer.textContent = mensaje;
    },

    // Inicializar el quiz
    iniciarQuiz: function() {
        this.cargarDatosStorage(); // Cargar datos guardados del storage
        this.cargarPreguntas(); // Cargar preguntas desde el JSON externo
        document.getElementById("submit-button").addEventListener("click", () => this.calcularResultado());
    }
};

// Inicializar el quiz cuando se cargue la página
quizApp.iniciarQuiz();
