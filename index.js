'use strict';

const $ = document.querySelector.bind(document);

const refs = {
  quiz: $('.quiz'),
  warning: $('.warning'),
  nextBtn: $('.quiz__next-btn'),
  closeModalBtn: $('[data-modal-close]'),
  backdrop: $('[data-modal]'),
  modal: $('.modal'),
  restartBtn: $('.result__restart'),
};

refs.closeModalBtn.addEventListener('click', handleModalClose);
refs.backdrop.addEventListener('click', toggleModal);
refs.modal.addEventListener('click', stopPropagation);
refs.nextBtn.addEventListener('click', nextQuestion);
refs.restartBtn.addEventListener('click', () => {
  clearInterval(intervalId);
});

let count = 0;
let score = 0;
let intervalId = null;

initializeQuiz();

function initializeQuiz() {
  if (typeof questions !== 'undefined' && questions.length > 0) {
    refs.quiz.classList.remove('hidden');
    showQuestions(count);
  } else {
    showWarning();
  }
}

function showWarning() {
  refs.warning.classList.remove('hidden');
}

function showQuestions(index) {
  const questionData = questions[index];
  displayQuestionTitle(questionData);
  displayOptions(questionData);
  displayTotal(index);
  displayProgress(index);
}

function optionSelect(answer) {
  const userAnswer = getUserAnswer(answer);
  const correctAnswer = getCorrectAnswer();
  const options = getOptions();
  if (userAnswer === correctAnswer) {
    handleCorrectAnswer(answer);
  } else {
    handleIncorrectAnswer(answer, correctAnswer, options);
  }
  disableOptions(options);
  options.forEach(item => item.classList.add('disabled'));
}

function nextQuestion() {
  const option = $('.quiz__option');
  const result = $('.result');
  const resultText = $('.result__text');
  const resultTextFinal = $('.result__text-final');

  if (isLastQuestionAndOptionDisabled(option)) {
    displayFinalResult(result, resultTextFinal);
    displayCanvas();
    fireAnimator.startFireWork();
    intervalId = setInterval(() => {
      fireAnimator.restartFireWork();
    }, 6000);

    return;
  }
  if (option.classList.contains('disabled')) {
    displayScoreAndMoveToNextQuestion(resultText);
    count++;
    showQuestions(count);
  } else {
    toggleModal();
  }
}

function disableOptions(options) {
  options.forEach(item => item.classList.add('disabled'));
}

function toggleModal() {
  document.body.classList.toggle('modal-open');
  refs.backdrop.classList.toggle('backdrop--hidden');
}
function handleModalClose(e) {
  e.stopPropagation();
  toggleModal();
}
function stopPropagation(e) {
  e.stopPropagation();
}

// display functions
function displayQuestionTitle(questionData) {
  const title = $('.quiz__title');
  title.innerHTML = `${questionData.question}`;
}

function displayOptions(questionData) {
  const list = $('.quiz__list');
  list.innerHTML = ``;

  questionData.options.forEach((item, i) => {
    const dataIdLetter = String.fromCharCode(65 + i);
    const text = `<li class='quiz__option ' data-id='${dataIdLetter}'>${item}</li>`;
    list.insertAdjacentHTML('beforeend', text);
  });

  const options = list.querySelectorAll('.quiz__option');
  options.forEach(item => item.setAttribute('onclick', 'optionSelect(this)'));
}

function displayTotal(index) {
  const total = $('.quiz__total');
  total.innerHTML = `Питання ${index + 1}/${questions.length}`;
}

function displayProgress(index) {
  const progress = $('.quiz__progress-inner');
  progress.style.width = `${Math.round(
    ((index + 1) / questions.length) * 100,
  )}%`;
}

function displayFinalResult(result, resultTextFinal) {
  result.classList.remove('hidden');
  refs.quiz.classList.add('hidden');
  resultTextFinal.innerHTML = `Результат: ${score} / ${questions.length}`;
}

function displayScoreAndMoveToNextQuestion(resultText) {
  resultText.innerHTML = `${score}`;
}

function displayCanvas() {
  $('canvas').classList.remove('hidden');
}

// _____get info functions___
function getUserAnswer(answer) {
  return answer.textContent;
}

function getCorrectAnswer() {
  return questions[count].answer;
}

function getOptions() {
  return document.querySelectorAll('.quiz__option');
}

function getCorrectIcon() {
  return `<i class="fa-solid fa-circle-check"></i>`;
}
function getIncorrectIcon() {
  return `<i class="fa-solid fa-xmark"></i>`;
}

// _____handle correct and wrong answers funtions_____
function handleCorrectAnswer(answer) {
  const iconCorrect = `<i class="fa-solid fa-circle-check"></i>`;
  score += 1;
  answer.classList.add('correct');
  answer.insertAdjacentHTML('beforeend', iconCorrect);
}

function handleIncorrectAnswer(answer, correctAnswer, options) {
  const iconIncorrect = getIncorrectIcon();
  answer.classList.add('incorrect');
  answer.insertAdjacentHTML('beforeend', iconIncorrect);

  options.forEach(item => {
    if (item.textContent === correctAnswer) {
      setTimeout(() => {
        item.classList.add('correct');
        item.insertAdjacentHTML('beforeend', getCorrectIcon());
      }, 500);
    }
  });
}

//_____ check functions ______
function isLastQuestionAndOptionDisabled(option) {
  return (
    count + 1 === questions.length && option.classList.contains('disabled')
  );
}
