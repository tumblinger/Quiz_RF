// Answer's each option:
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

// All options:
const optionElements = document.querySelectorAll('.option');
const question = document.getElementById('question'); //current Question
const questionNumber = document.getElementById('number-of-question'), //number of the current Question
    numberOfQuestions = document.getElementById('number-of-all-questions'); //number of all Questions

// Indexes: 
let indexOfQuestion; // current question's Index
let indexOfPage = 0; // Page Index

const h1 = document.querySelector('h1');

const answersTracker = document.getElementById('answers-tracker');  // Container for tracking circles

const btnNext = document.getElementById('btn-next');  //Next button

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),  //correct answers' quantity
    allQuestionsNumber = document.getElementById('number-of-all-questions-2'),  //correct answers' quantity in modal window
    btnTryAgain = document.getElementById('btn-try-again');  //Try again button in modal window

// ============================================================================================

const quizQuestions = [
    {
        question: 'Which color is the top color of the Russian tricolor flag?',
        options: [
            'Red',
            'White',
            'Green',
            'Blue',
        ],
        correct: 2
    },
    {
        question: 'Can you name Russia-s largest island?',
        options: [
            'Taymyr',
            'Novaya Zemlya',
            'Bolshoy',
            'Sachalin',
        ],
        correct: 4
    },
    {
        question: 'Can you name Russia-s highest mountain?',
        options: [
            'Elbrus',
            'Kazbek',
            'Pic Pushkina',
            'Belukha',
        ],
        correct: 1
    },
    {
        question: 'Which river is widely regarded as the national river of Russia?',
        options: [
            'Amur',
            'Volga',
            'Don',
            'Neva',
        ],
        correct: 2
    },
    {
        question: 'Name the Russian exclave between Lithuania and Poland on the Baltic Sea?',
        options: [
            'Moscow',
            'Tula',
            'Kalingrad',
            'Novosibirsk',
        ],
        correct: 3
    },
    {
        question: 'Which mountain range runs from north to south through western Russia?',
        options: [
            'The Urals',
            'The Altai',
            'Sayan',
            'Kropotkin Range',
        ],
        correct: 1
    },
    {
        question: 'Who was the first Russian to be awarded the Nobel Prize for Literature?',
        options: [
            'Aleksandr Solzhenitsyn',
            'Ivan Bunin',
            'Boris Pasternak',
            'Mikhail Sholokhov',
        ],
        correct: 2
    },
]

// ============================================================================================

numberOfQuestions.innerHTML = quizQuestions.length;

const load = () => {
    question.innerHTML = quizQuestions[indexOfQuestion].question;

    option1.innerHTML = quizQuestions[indexOfQuestion].options[0];
    option2.innerHTML = quizQuestions[indexOfQuestion].options[1];
    option3.innerHTML = quizQuestions[indexOfQuestion].options[2];
    option4.innerHTML = quizQuestions[indexOfQuestion].options[3];

    questionNumber.innerHTML = indexOfPage + 1;
    indexOfPage++;
}

const answeredQuestions = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * quizQuestions.length);
    let isDuplicate = false;

    if (indexOfPage === quizQuestions.length) {
        quizOver();
    } else {
        if (answeredQuestions.length > 0) {
            answeredQuestions.forEach((item) => {
                if (item === randomNumber) {
                    isDuplicate = true;
                }
            });
            if (isDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (answeredQuestions.length === 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    answeredQuestions.push(indexOfQuestion);
};

const checkAnswer = (el) => {
    if (el.target.dataset.id == quizQuestions[indexOfQuestion].correct) {
        el.target.classList.add('correct');
        updateTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateTracker('wrong');
    }
    disableOptions();
}

for (option of optionElements) {
    option.addEventListener('click', (e) => checkAnswer(e))
};

const disableOptions = () => {
    optionElements.forEach((item) => {
        item.classList.add('disabled');
        if (item.dataset.id == quizQuestions[indexOfQuestion].correct) {
            item.classList.add('correct');
        }
    })
}

const removeClasses = () => {
    optionElements.forEach((item) => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const trackAnswers = () => {
    quizQuestions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateTracker = (status) => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const hasAnswer = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Choose an answer');
    } else {
        randomQuestion();
        removeClasses();
    }
};

btnNext.addEventListener('click', () => {
    hasAnswer()
});

const updateMessage = () => {
    if (score <= quizQuestions.length - 5) {
        h1.innerText = 'Oops... what did you do in your geography classes?'
    } else if (score <= quizQuestions.length - 3 && score > quizQuestions.length - 5) {
        h1.innerText = 'Not bad! Read more books though...'
    } else {
        h1.innerText = 'Hello professor :)'
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    allQuestionsNumber.innerHTML = quizQuestions.length;
    updateMessage();
};

const tryOver = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryOver);

window.addEventListener('load', () => {
    randomQuestion();
    trackAnswers();
});


