// Array que contiene las preguntas y las respuestas correctas
const preguntasYRespuestas = [
    {
        pregunta: "¿De qué color es el pelo de Naruto?",
        opciones: ["Negro", "Verde", "Amarillo", "Morado"],
        respuesta: "C"
    },
    {
        pregunta: "¿Cuál es el apellido de Naruto?",
        opciones: ["Uzumaki", "Uchiha", "Hyuga", "Nara"],
        respuesta: "A"
    },
    {
        pregunta: "¿Cuál es la comida favorita de Naruto?",
        opciones: ["Sushi", "Ramen", "Empanadas Tucumanas", "Queso de cabra"],
        respuesta: "B"
    }
];

// Array que contiene los comentarios finales según el puntaje
const comentarios = [
    "¡No te preocupes! ¡Puedes intentarlo de nuevo y mejorar tu puntaje!",
    "¡Bien hecho! Tienes un conocimiento bueno sobre Naruto.",
    "¡Increíble! ¡Eres un verdadero fan de Naruto!",
    "¡Impresionante! ¡Eres un hokage!"
];

// Variable para almacenar el puntaje
let score = 0;

// Variable `store` para almacenar detalles del quiz
let store = [];

// Función que genera el HTML de las preguntas
function mostrarPreguntas() {
    const quizContainer = document.getElementById("quiz-container");
    preguntasYRespuestas.forEach((preguntaObj, index) => {
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
            radio.value = String.fromCharCode(65 + opcionIndex); // Convertir a 'A', 'B', etc.
            label.appendChild(radio);
            label.appendChild(document.createTextNode(opcion));
            preguntaDiv.appendChild(label);
            preguntaDiv.appendChild(document.createElement("br"));
        });

        quizContainer.appendChild(preguntaDiv);
    });
}

// Función que calcula el puntaje y muestra el resultado
function calcularResultado() {
    preguntasYRespuestas.forEach((preguntaObj, index) => {
        const userAnswer = document.querySelector(`input[name="pregunta${index}"]:checked`);
        if (userAnswer && userAnswer.value === preguntaObj.respuesta) {
            score++;
            store.push({
                pregunta: preguntaObj.pregunta,
                respuestaCorrecta: preguntaObj.respuesta,
                respuestaUsuario: userAnswer.value,
                correcta: true
            });
        } else {
            store.push({
                pregunta: preguntaObj.pregunta,
                respuestaCorrecta: preguntaObj.respuesta,
                respuestaUsuario: userAnswer ? userAnswer.value : "No respondida",
                correcta: false
            });
        }
    });

    mostrarResultado();
}

// Función que muestra el resultado final y el comentario basado en el puntaje
function mostrarResultado() {
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = `<h2>Tu puntuación final es: ${score} de 3.</h2>`;

    let comentarioFinal;
    if (score === 0) {
        comentarioFinal = comentarios[0];
    } else if (score === 1) {
        comentarioFinal = comentarios[1];
    } else if (score === 2) {
        comentarioFinal = comentarios[2];
    } else {
        comentarioFinal = comentarios[3];
    }

    const evaluacion = document.createElement("p");
    store.forEach(item => {
        evaluacion.innerHTML += `- Pregunta: ${item.pregunta}<br>   Respuesta correcta: ${item.respuestaCorrecta}, ingresaste ${item.respuestaUsuario}.<br>   Correcta: ${item.correcta ? "Sí" : "No"}<br><br>`;
    });

    evaluacion.innerHTML += `<p>${comentarioFinal}</p>`;
    evaluacion.innerHTML += `<p>Espero que hayan disfrutado de estas preguntas del Quiz de Naruto, te esperamos de vuelta.</p>`;
    resultContainer.appendChild(evaluacion);
}

// Mostrar las preguntas cuando se carga la página
mostrarPreguntas();

// Agregar evento al botón para calcular el resultado
document.getElementById("submit-button").addEventListener("click", calcularResultado);
