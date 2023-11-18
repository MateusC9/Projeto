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
        case (performance >= 50):
            message = "Muito bom :)"
            break
        case (performance >= 30):
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


const questions = [
    {
        question: "Marcos Aurélio sempre teve uma motivação afetiva com a Educação e depois de buscar parcerias, seguiu seu caminho juntos aos seus, família!  Onde em abril de 2003 começou a funcionar noturnamente o Impacto Pré-Vestibulares:",
        answers: [
            { text: "Colégio Sobral Neto", correct: false },
            { text: "Colégio Fácil", correct: false },
            { text: "SESC", correct: true },
            { text: "Colégio Sagrado Coração de Jesus", correct: false }
        ]
    },
    {
        question: "O que significa a águia o símbolo do Colégio Impacto?",
        answers: [
            { text: "Força", correct: false },
            { text: "Visão", correct: false },
            { text: "Persistência", correct: true },
            { text: "Sutileza", correct: false }
        ]
    },
    {
        question: "A Sede do Colégio Impacto era inicialmente: ",
        answers: [
            { text: "Residência do Governador do Piauí", correct: true },
            { text: "Centro Odontológico", correct: false },
            { text: "SESC", correct: false },
            { text: "Biblioteca", correct: false }
        ]
    },
    {
        question: 'Quando o Impacto Pré-Vestibulares se transformou em Colégio Impacto e Pré-Vestibulares?',
        answers: [
            { text: "2008", correct: false },
            { text: "2007", correct: true },
            { text: "2006", correct: false },
            { text: "2005", correct: false }
        ]
    },
    {
        question: 'Qual foi o tema da primeira Semana Cultural do Colégio Impacto:',
        answers: [
            { text: 'Brasil Mostra Sua Cara', correct: false },
            { text: 'Piauí Terra Querida', correct: true },
            { text: 'Amores de IMPACTO', correct: false },
            { text: 'Décadas de IMPACTO', correct: false }
        ]
    },
    {
        question: 'O Colégio Impacto tem uma relação muito forte com a preservação da nossa história e as aulas passeio que fazemos.Da qual delas criamos um vínculo anual:',
        answers: [
            { text: 'Campo Maior e a Batalha do Genipapo', correct: false },
            { text: 'Coronel José Dias com a Serra da Capivara', correct: true },
            { text: 'Oeiras e a Luta pela Independência do Piauí', correct: false },
            { text: 'Parnaíba com a Balaiada', correct: false }
        ]
    },
    {
        question: 'O Café Aula do Colégio Impacto e Pré-Vestibulares recebia estudantes em caravanas do Piauí e Maranhão com mais de 1.500 alunos. Em que ano o Colégio Impacto obteve o maior índice de aprovação no Piauí?',
        answers: [
            { text: '2009', correct: true },
            { text: '2010', correct: false },
            { text: '2011', correct: false },
            { text: '2012', correct: false },
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
]