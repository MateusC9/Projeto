const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()

    if (questions.length === currentQuestionIndex) {
        return finishGame()
    }

    $questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAsnwer = document.createElement("button")
        newAsnwer.classList.add("button", "answer")
        newAsnwer.textContent = answer.text
        if (answer.correct) {
            newAsnwer.dataset.correct = answer.correct
        }
        $answersContainer.appendChild(newAsnwer)

        newAsnwer.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    const answerClicked = event.target

    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++
    } else {
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        button.disabled = true

        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestions = questions.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestions)

    let message = ""

    switch (true) {
        case (performance >= 90):
            message = "Excelente :)"
            break
        case (performance >= 70):
            message = "Muito bom :)"
            break
        case (performance >= 50):
            message = "Bom"
            break
        default:
            message = "Pode melhorar :("
    }

    $questionsContainer.innerHTML =
        `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}

var timer;
var ele = document.getElementById('tempo');
var isRunning = true;
var sec = 0;
var min = 0;

(function(){
    timer = setInterval(updateTime, 1000);
})();

function updateTime() {
    sec++;
    if (sec === 60) {
        min++;
        sec = 0;
    }
    ele.innerHTML = formatTime(min) + ':' + formatTime(sec);
}

function formatTime(time) {
    return (time < 10) ? '0' + time : time;
}

function togglePauseResume(button) {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        button.innerHTML = "Retomar";
        button.style.backgroundColor = "#4CAF50"; // Cor de fundo verde
    } else {
        timer = setInterval(updateTime, 1000);
        isRunning = true;
        button.innerHTML = "Parar";
        button.style.backgroundColor = "crimson"; // Cor de fundo vermelha
    }
}


const questions = [
    {
        question: "Qual dessas peças é responsável pelo armazenamento de dados da máquina?",
        answers: [
            { text: "Placa-Mãe (MB)", correct: false },
            { text: "Processador (CPU)", correct: false },
            { text: "Hard Disk (HD)", correct: true },
            { text: "O gabinete", correct: false }
        ]
    },
    {
        question: "Na informática, existe um sistema de medidas que é medido em números e letras, baseando-se na afirmação, qual é considerada a alternativa correta que representa uma dessas medidas.",
        answers: [
            { text: "10KG", correct: false },
            { text: "U2", correct: false },
            { text: "1GB", correct: true },
            { text: "500HZ", correct: false }
        ]
    },
    {
        question: "Qual desses Sistemas Operacionais é pertencente á Microsoft?",
        answers: [
            { text: "Windows", correct: true },
            { text: "Mac", correct: false },
            { text: "Linux", correct: false },
            { text: "Android", correct: false }
        ]
    },
    {
        question: 'Qual destes SO é totalmente gratuito e é um dos mais usados pelos sistemas acadêmicos?',
        answers: [
            { text: "Mac", correct: false },
            { text: "Windows", correct: false },
            { text: "Android", correct: false },
            { text: "Linux", correct: true }
        ]
    },
    {
        question: 'O que é Hardware?',
        answers: [
            { text: 'Parte logica do computador', correct: false },
            { text: 'Parte física do computador', correct: true },
            { text: 'Disco do computador', correct: false },
            { text: 'Aplicativo do computador', correct: false }
        ]
    },
    {
        question: 'O que é internet?',
        answers: [
            { text: 'Correio eletrônico', correct: false },
            { text: 'Uma rede local de computadores', correct: true },
            { text: 'Uma conexão sem fio', correct: false },
            { text: 'Uma ferramenta de maior Alcance', correct: false }
        ]
    },
    {
        question: 'O que são Dados?',
        answers: [
            { text: 'São as partes de programas', correct: true },
            { text: 'são resquícios de arquivos corrompidos', correct: false },
            { text: 'são informações desencontradas', correct: false },
            { text: 'São pentesters invasores', correct: false },
        ]
    },
    {
        question: 'Os princípios básicos da Segurança da Informação:',
        answers: [
            { text: 'Confidencialidade; não repúdio; disponibilidade; autenticidade', correct: false },
            { text: 'Confidencialidade; integridade; disponibilidade; autenticidade', correct: true },
            { text: 'Integridade; disponibilidade; autenticidade', correct: false },
            { text: 'Confidencialidade; disponibilidade; autenticidade', correct: false },
        ]
    },
    {
        question: 'Como inserir um comentário dentro do HTML?',
        answers: [
            { text: '/* Comentário */', correct: false },
            { text: '< Comentário >', correct: false },
            { text: '<!-- Comentário -->', correct: true },
            { text: '<! "Comentário">', correct: false },
        ]
    },
    {
        question: 'Onde as variáveis ficam armazenadas?',
        answers: [
            { text: 'Na memória ram do computador', correct: true },
            { text: 'No programa/software', correct: false },
            { text: 'No banco de dados', correct: false },
            { text: 'No banco de dados e na memória ram', correct: false },
        ]
    },
    {
        question: 'Tradicionalmente as turmas do 1ºano do Colégio Impacto fazem uma viagem para qual cidade histórica no sul do Piauí?',
        answers: [
            { text: 'Amarante', correct: false },
            { text: 'São Raimundo Nonato', correct: true },
            { text: 'Picos', correct: false },
            { text: 'São Francisco', correct: false },
        ]
    },
    {
        question: 'Qual desses temas NÃO foi tema da Semana Cultural?',
        answers: [
            { text: 'Décadas de IMPACTO', correct: false },
            { text: 'Revoluções que impactaram o mundo', correct: false },
            { text: 'Principais Artistas Romanos', correct: true },
            { text: 'Invenções tecnológicas que impactaram o mundo', correct: false },
        ]
    },
    {
        question: 'Qual desses temas NÃO foi tema da Semana Cultural?',
        answers: [
            { text: 'Décadas de IMPACTO', correct: false },
            { text: 'Revoluções que impactaram o mundo', correct: false },
            { text: 'Principais Artistas Romanos', correct: false },
            { text: 'Invenções tecnológicas que impactaram o mundo', correct: true },
        ]
    },
    {
        question: 'Qual desses temas NÃO foi tema da Semana Cultural?',
        answers: [
            { text: 'Décadas de IMPACTO', correct: true },
            { text: 'Revoluções que impactaram o mundo', correct: false },
            { text: 'Principais Artistas Romanos', correct: false },
            { text: 'Invenções tecnológicas que impactaram o mundo', correct: false },
        ]
    },
    {
        question: 'Qual desses temas NÃO foi tema da Semana Cultural?',
        answers: [
            { text: 'Décadas de IMPACTO', correct: false },
            { text: 'Revoluções que impactaram o mundo', correct: false },
            { text: 'Principais Artistas Romanos', correct: false },
            { text: 'Invenções tecnológicas que impactaram o mundo', correct: true },
        ]
    },
]