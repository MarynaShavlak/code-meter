'use strict';

const $ = document.querySelector.bind(document);
const quiz = $('.quiz');
const warning = $('.warning');
const nextBtn = $('.quiz__next-btn');

let count = 0;
let score = 0;

if (typeof questions !== 'undefined' && questions.length > 0) {
  quiz.classList.remove('hidden');
  showQuestions(count);
} else {
  warning.classList.remove('hidden');
}
nextBtn.addEventListener('click', nextQuestion);

function showQuestions(index) {
  const title = $('.quiz__title');
  const list = $('.quiz__list');
  const total = $('.quiz__total');
  let progress = $('.quiz__progress-inner');
  title.innerHTML = `${questions[index].question}`;
  list.innerHTML = ``;
  questions[index].options.forEach(item => {
    const text = `<li class='quiz__option ']>${item}</li>`;
    list.insertAdjacentHTML('beforeend', text);
  });
  const options = list.querySelectorAll('.quiz__option');
  options.forEach(item => item.setAttribute('onclick', 'optionSelect(this)'));
  total.innerHTML = `Питання ${index + 1}/${questions.length}`;
  progress.style.width = ` ${Math.round(
    ((index + 1) / questions.length) * 100,
  )}%`;
}

function optionSelect(answer) {
  const userAnwer = answer.textContent;
  const correctAnswer = questions[count].answer;
  const options = document.querySelectorAll('.quiz__option');
  const iconCorrect = `<span>&#10004</span>`;
  const iconIncorrect = `<span>&#9940</span>`;
  if (userAnwer === correctAnswer) {
    score += 1;
    answer.classList.add('correct');
    answer.insertAdjacentHTML('beforeend', iconCorrect);
  } else {
    answer.classList.add('incorrect');
    answer.insertAdjacentHTML('beforeend', iconIncorrect);
    options.forEach(item => {
      if (item.textContent === correctAnswer) {
        setTimeout(() => {
          item.classList.add('correct');
          item.insertAdjacentHTML('beforeend', iconCorrect);
        }, 500);
      }
    });
  }
  options.forEach(item => item.classList.add('disabled'));
}

function nextQuestion() {
  const option = $('.quiz__option');
  const result = $('.result');
  const resultText = $('.result__text');

  if (count + 1 == questions.length && option.classList.contains('disabled')) {
    result.classList.remove('hidden');
    quiz.classList.add('hidden');
    resultText.innerHTML = `Кількість правильних відповідей ${score} із ${questions.length}`;
    return;
  }
  if (option.classList.contains('disabled')) {
    count++;
    showQuestions(count);
  } else {
    alert('Choose one answer variant before going to next question');
  }
}
