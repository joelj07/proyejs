alert("Bienvenidos al Quiz de Naruto, donde pondremos tu conocimiento a prueba sobre el mejor anime de la historia. Escribe 'A', 'B' o 'C' con la respuesta correcta.");

const preguntasYRespuestas = [
    {
        pregunta: "¿De qué color es el pelo de Naruto? \n A | Negro\n B | Verde\n C | Amarillo \n D | Morado",
        respuesta: "C"
    },
    {
        pregunta: "¿Cuál es el apellido de Naruto? \n A | Uzumaki\n B | Uchiha\n C | Hyuga \n D | Nara",
        respuesta: "A"
    },
    {
        pregunta: "¿Cuál es la comida favorita de Naruto? \n A | Sushi\n B | Ramen\n C | Empanadas Tucumanas \n D | Queso de cabra",
        respuesta: "B"
    }
];

const comentarios = [
    "¡No te preocupes! ¡Puedes intentarlo de nuevo y mejorar tu puntaje!",
    "¡Bien hecho! Tienes un conocimiento bueno sobre Naruto.",
    "¡Increíble! ¡Eres un verdadero fan de Naruto!",
    "¡Impresionante! ¡Eres un hokage!"
];

let score = 0;

function hacerPregunta(preguntaObj) {
    let userAnswer = prompt(preguntaObj.pregunta).toUpperCase();
    if (userAnswer === preguntaObj.respuesta) {
        alert("¡Correcto!");
        score++;
        return `- Pregunta: ${preguntaObj.pregunta}\nRespuesta correcta: ${preguntaObj.respuesta}, ingresaste ${userAnswer}.\n`;
    } else {
        alert("Incorrecto :(");
        return `- Pregunta: ${preguntaObj.pregunta}\nRespuesta correcta: ${preguntaObj.respuesta}, ingresaste ${userAnswer}.\n`;
    }
}

function mostrarResultado(score) {
    alert("Tu puntuación final es: " + score + " de 3.");

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

    const despedida = "\nEspero que hayan disfrutado de estas preguntas del Quiz de Naruto, te esperamos de vuelta.";
    return comentarioFinal + despedida;
}

let evaluacion = "Este es tu resultado:\n";

preguntasYRespuestas.forEach(preguntaObj => {
    evaluacion += hacerPregunta(preguntaObj);
});

alert(evaluacion + mostrarResultado(score));

