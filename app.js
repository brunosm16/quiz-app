const questions = [
	{
		options: ['Bill Gates', 'James Gosgling', 'Dennis Ritchie', 'Bredan Eich'],
		title: 'Who Created Javascript ?',
		answer: 'Bredan Eich',
	},

	{
		title: 'Who Created HTML ?',
		options: [
			'mark zuckerberg',
			'Linus Torvalds',
			'Tim Berners-Lee',
			'Bredan Eich',
		],
		answer: 'Tim Berners-Lee',
	},

	{
		title: 'What year was JavaScript launched?',
		options: [1996, 1995, 2004, 1981],
		answer: 1995,
	},
	{
		title: 'Who was the first programmer ?',
		options: [
			'Friedrich Ludwig Bauer',
			'Alan Turing',
			'Ken Thompson',
			'Ada Lovelace',
		],
		answer: 'Ada Lovelace',
	},
];

const questionText = document.querySelector('#question-text');
const boxOptions = document.querySelector('#form-box-options');
const btnContainer = document.querySelector('#btn-container');
const quizForm = document.querySelector('#quiz-form');
const formContainer = document.querySelector('.form-container');

let counter = 0;
let rightAnswers = 0;

function setHeader(header) {
	questionText.innerHTML = header;
}

function getHTMLElement(name, attrs = {}) {
	let element = document.createElement(name);

	for (let [key, value] of attrs.entries()) {
		element.setAttribute(key, value);
	}

	return element;
}

function getInput() {
	// map with attributes to pass to input element
	let attrs = new Map();
	attrs.set('type', 'radio');
	attrs.set('name', 'option');

	return getHTMLElement('input', attrs);
}

function getLabel() {
	let attrs = new Map();
	attrs.set('for', 'option');

	return getHTMLElement('label', attrs);
}

function getOptionBox() {
	let box = getHTMLElement('div', new Map().set('class', 'option-box'));

	// append input and label
	box.appendChild(getInput());
	box.appendChild(getLabel());

	return box;
}

function setOptions(options) {
	options.forEach((option) => {
		let optionBox = getOptionBox();
		let label = optionBox.querySelector('label');

		if (label) optionBox.querySelector('label').innerHTML = option;
		boxOptions.appendChild(optionBox);
	});
}

function replaceOptions(options) {
	let childsFormBox = boxOptions.querySelectorAll('.option-box');

	for (let i = 0; i < childsFormBox.length; i++) {
		let newLabel = getLabel();
		let newInput = getInput();

		newLabel.innerHTML = options[i];

		let oldLabel = childsFormBox[i].lastElementChild;
		let oldInput = childsFormBox[i].firstElementChild;

		childsFormBox[i].replaceChild(newLabel, oldLabel);
		childsFormBox[i].replaceChild(newInput, oldInput);
	}
}

function getButtonElement(id) {
	let attrs = new Map();
	attrs.set('class', 'btn');
	attrs.set('id', id);

	return getHTMLElement('button', attrs);
}

function setBtn(message) {
	let btn = getButtonElement(`${message}-btn`);
	btn.innerHTML = message;

	let oldBtn = btnContainer.firstElementChild;

	if (oldBtn) btnContainer.removeChild(oldBtn);

	btnContainer.appendChild(btn);
}

function initValues() {
	// Initialize header
	let initialHeader = questions[0].title;

	setHeader(initialHeader);
	setOptions(questions[0].options);
	setBtn('submit');
	submitEvent();
}

function verifyAnswer(answer) {
	if (answer == questions[counter].answer) {
		rightAnswers++;
	}
}

function setResult() {
	let optionBoxes = document.querySelectorAll('.option-box')

	optionBoxes.forEach(box => box.remove());

	questionText.innerHTML = `
	You answered correctly at ${rightAnswers}/${questions.length} 
	questions 
	`;

	formContainer.classList.add('result');
}

function changeQuestion() {
	if (counter === questions.length - 1) {
		setResult();
		setBtn('reload');
		reloadEvent();
	} else {
		counter++;

		if (counter != questions.length) {
			// Set New Values
			let newHeader = questions[counter].title;
			setHeader(newHeader);
			replaceOptions(questions[counter].options);
		}
	}
}

function reloadEvent() {
	const reloadBtn = document.querySelector('#reload-btn');

	if (reloadBtn) {
		reloadBtn.addEventListener('click', (e) => {
			e.preventDefault();

			// reset counting
			counter = 0;
			rightAnswers = 0;

			// set initial display
			boxOptions.style.display = 'block';
			formContainer.classList.remove('result');
			let newHeader = questions[counter].title;
			setHeader(newHeader);
			initValues();
		});
	}
}

function submitEvent() {
	const submitBtn = document.querySelector('#submit-btn');

	submitBtn.addEventListener('click', (e) => {
		e.preventDefault();

		console.log('submit')

		let input = [...document.querySelectorAll('input')];

		input = input.filter((input) => input.checked);

		if (input.length !== 0) {
			label = input[0].nextElementSibling;
			verifyAnswer(label.innerText);
			changeQuestion();
		}
	});
}

function init() {
	initValues();
}

document.addEventListener('DOMContentLoaded', init);
