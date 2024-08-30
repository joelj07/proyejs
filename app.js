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
    cargarPreguntas: async function() {
        try {
            const response = await fetch('./info.json');
            if (!response.ok) {
                this.mostrarMensaje(`Error en la solicitud: ${response.status}`);
                return;
            }
            const data = await response.json();
            this.preguntasYRespuestas = data;
            this.mostrarPreguntas(); // Llamada a la nueva función mostrarPreguntas
        } catch (error) {
            this.mostrarMensaje('Ocurrió un error al cargar las preguntas: ' + error.message);
        }
    },

    // Función para mostrar las preguntas con SweetAlert y deshabilitar opciones después de seleccionar
    mostrarPreguntas: function() {
        const quizContainer = document.getElementById("quiz-container");
        quizContainer.innerHTML = ""; // Limpiar cualquier contenido previo
        this.preguntasYRespuestas.forEach((ele, index) => {
            const div = document.createElement("div");
            const h3 = document.createElement("h3");
            const ul = document.createElement("ul");

            h3.innerText = ele.pregunta;
            ele.opciones.forEach((e, opcionIndex) => {
                const li = document.createElement("li");
                li.innerText = e;
                li.dataset.index = index; // Guardar el índice de la pregunta
                li.dataset.opcionIndex = opcionIndex; // Guardar el índice de la opción

                li.addEventListener("click", () => {
                    Swal.fire({
                        title: opcionIndex === ele.respuesta ? "Correcto" : "Equivocado",
                        text: `La respuesta correcta es ${ele.opciones[ele.respuesta]}`,
                        icon: opcionIndex === ele.respuesta ? "success" : "error"
                    }).then(() => {
                        const opciones = ul.querySelectorAll("li");
                        opciones.forEach(opcion => {
                            opcion.style.pointerEvents = "none"; // Deshabilitar clics adicionales
                            opcion.style.opacity = "0.6"; // Cambiar apariencia para indicar que está deshabilitado
                        });

                        // Guardar la respuesta del usuario
                        this.store[index] = opcionIndex;
                    });
                });

                ul.appendChild(li);
            });
            div.appendChild(h3);
            div.appendChild(ul);
            quizContainer.appendChild(div);
        });
    },

    // Función para calcular el resultado del quiz
    calcularResultado: function() {
        this.score = 0;

        this.preguntasYRespuestas.forEach((preguntaObj, index) => {
            const respuestaUsuario = this.store[index];

            if (respuestaUsuario === preguntaObj.respuesta) {
                this.score++;
                this.store[index] = {
                    pregunta: preguntaObj.pregunta,
                    respuestaCorrecta: preguntaObj.respuesta,
                    respuestaUsuario: respuestaUsuario,
                    correcta: true
                };
            } else {
                this.store[index] = {
                    pregunta: preguntaObj.pregunta,
                    respuestaCorrecta: preguntaObj.respuesta,
                    respuestaUsuario: respuestaUsuario !== undefined ? respuestaUsuario : "No respondida",
                    correcta: false
                };
            }
        });

        localStorage.setItem('quizScore', this.score);
        localStorage.setItem('quizStore', JSON.stringify(this.store));

        this.mostrarResultado();
    },

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
            if (typeof item === 'object') {
                evaluacion.innerHTML += `- Pregunta: ${item.pregunta}<br>   Respuesta correcta: ${item.respuestaCorrecta}, ingresaste ${item.respuestaUsuario}.<br>   Correcta: ${item.correcta ? "Sí" : "No"}<br><br>`;
            }
        });

        evaluacion.innerHTML += `<p>${comentarioFinal}</p>`;
        evaluacion.innerHTML += `<p>Espero que hayas disfrutado de estas preguntas del Quiz de Naruto, te esperamos de vuelta.</p>`;
        resultContainer.appendChild(evaluacion);
    },

    // Función para cargar los datos del storage al iniciar el quiz
    cargarDatosStorage: function() {
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
        this.cargarDatosStorage();
        this.cargarPreguntas();
        document.getElementById("submit-button").addEventListener("click", () => this.calcularResultado());
    }
};

// Inicializar el quiz cuando se cargue la página
quizApp.iniciarQuiz();