const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull= document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 60
let questionCounter = 0
let availableQuestions = []
let timer

// questions in game total four(4).
let questions = [
    {
        question: 'What is an Array in JavaScript?',
        choice1: 'A bunch of random numbers.',
        choice2: 'It is a string.',
        choice3: 'It makes the code pretty.',
        choice4: 'An ordered list of values.',
        answer: '4',
    },
    {
        question: 'What is an Object in JavaScript?',
        choice1: 'An Object is a number.',
        choice2: 'An Object is a standlone entity, with properties and type.',
        choice3: 'An Object is word just for fun.',
        choice4: 'An Object is a bunch of random words.',
        answer: '2',
    },
    {
        question: 'What is JavaScript used for?',
        choice1: 'Javascript is used to make interactive web applications and browsers.',
        choice2: 'Javascript is used to style a web page.',
        choice3: 'Javascript is a coffee maker api.',
        choice4: 'Javascript is how Luke beat Darth Vader.',
        answer: '1',
    },
    {
        question: 'What is a var in Javascript?',
        choice1: 'A var is what helped Frodo destroy the ring.',
        choice2: 'A var is a header in HTML.',
        choice3: 'A var is short for variable in Javascript.',
        choice4: 'A var is what powers the Starship Enterprise.',
        answer: '3',
    },
]

const MAX_QUESTIONS = 4
// start game code which starts question counter at 0 out of 4
startGame = () => {
    questionCounter = 0
    availableQuestions = [...questions]
    getNewQuestion()

    timer = setInterval(countDown, 1000);    
}
// code for ending game if reaches 0 
let countDown = () => {
    score-- 
    scoreText.textContent = score

    if(score === 0) {
        clearInterval(timer)
        return window.location.assign('./end.html')
    }
}
// code for local storage of most recent score and returning to the end page
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }
// logic for the game questions
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
// code for determining true or false questions and for display of green or red
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false 
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset.number

        let classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 
        'incorrect'

// deducts points of 10 for inccorect answers from timer
        if (classToApply === 'incorrect') {
            score -= 10
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

startGame()




