const questions = [
  {
    type: 'single', // single choice
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Rome'],
    answer: 'Paris'
  },
  {
    type: 'fill', // fill in the blank
    question: 'Fill in the blank: The chemical symbol for water is ___',
    answer: 'H2O'
  },
  {
    type: 'single',
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    answer: 'Mars'
  }
];

let currentQuestion = 0;
let score = 0;

const questionBox = document.getElementById('question-box');
const answerBox = document.getElementById('answer-box');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const scoreDisplay = document.getElementById('score');

function loadQuestion() {
  const q = questions[currentQuestion];
  questionBox.textContent = q.question;
  answerBox.innerHTML = '';

  if (q.type === 'single') {
    q.options.forEach(option => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.value = option;
      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      answerBox.appendChild(label);
      answerBox.appendChild(document.createElement('br'));
    });
  } else if (q.type === 'fill') {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'fill-answer';
    answerBox.appendChild(input);
  }
}

function checkAnswer() {
  const q = questions[currentQuestion];
  let userAnswer = '';

  if (q.type === 'single') {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
      userAnswer = selected.value;
    }
  } else if (q.type === 'fill') {
    userAnswer = document.getElementById('fill-answer').value.trim();
  }

  if (userAnswer.toLowerCase() === q.answer.toLowerCase()) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quiz-box').classList.add('hidden');
  resultBox.classList.remove('hidden');
  scoreDisplay.textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  resultBox.classList.add('hidden');
  document.getElementById('quiz-box').classList.remove('hidden');
  loadQuestion();
}

nextBtn.addEventListener('click', checkAnswer);

// Load the first question on start
loadQuestion();
