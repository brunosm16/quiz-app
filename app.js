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

function replaceOptions(options) {
	let childsFormBox = boxOptions.querySelectorAll('.option-box');

	for (let i = 0; i < childsFormBox.length; i++) {
		let newLabel = getLabel();
		let newInput = getInputRadio();

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

/*
	Remove all occurrences from a element specified by identifier
*/
function removeAllElements(className) {
	let elements = document.querySelectorAll(className);
	elements.forEach((element) => element.remove());
}

function setResult() {
	// Remove all occurrences of '.option-box'
	removeAllElements('.option-box');

	let html = `
	You answered correctly at ${rightAnswers}/${questions.length} 
	questions 
	`;

	updateHeader(html);
	formContainer.classList.add('result');
}

function resetValuesFromPage() {
	// reset counting
	counter = 0;
	rightAnswers = 0;

	// set initial display
	boxOptions.style.display = 'block';
	formContainer.classList.remove('result');

	initValues();
}

function reloadEvent() {
	const reloadBtn = document.querySelector('#reload-btn');

	if (reloadBtn) {
		reloadBtn.addEventListener('click', (e) => {
			e.preventDefault();
			resetValuesFromPage();
		});
	}
}

function setResultPage() {
	setResult();
	setBtn('reload');
	reloadEvent();
}

function updatePage() {
	// Counter didn't reach the all the questions
	if (++counter != questions.length) {
		// Set new values
		updateHeader(questions[counter].title);
		replaceOptions(questions[counter].options);
		return;
	}

	// Only executed if counter reach the limit of questions
	setResultPage();
}

/*
	Verify if 'answer' is correct by comparing with the answer 
	for the current question in question object. 
*/
function verifyAnswer(answer) {
	// Only increment the answers if is right
	if (answer == questions[counter].answer) rightAnswers++;
}	

/*
	Return a HTML element with a name passed as argument,
	and with attributes from a Map. 
*/
function getHTMLElement(name, attrs = {}) {
	let element = document.createElement(name);

	for (let [key, value] of attrs.entries()) {
		element.setAttribute(key, value);
	}

	return element;
}

function getInputRadio() {
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
	box.appendChild(getInputRadio());
	box.appendChild(getLabel());

	return box;
}

function updateHeader(html) {
	questionText.innerHTML = html;
}

// Set Options for Initial Page
function setOptions(options) {
	options.forEach((option) => {
		let optionBox = getOptionBox();
		let label = optionBox.querySelector('label');

		label.innerHTML = option;

		boxOptions.appendChild(optionBox);
	});
}

function setBtn(message) {
	// Get a button with id based on message
	let btn = getButtonElement(`${message}-btn`);
	btn.innerHTML = message;

	let oldBtn = btnContainer.firstElementChild;

	// Only one element can be on page so if another element
	// is supposed to be set the last one is removed
	if (oldBtn) btnContainer.removeChild(oldBtn);

	btnContainer.appendChild(btn);
}

function submitEvent() {
	const submitBtn = document.querySelector('#submit-btn');

	submitBtn.addEventListener('click', (e) => {
		e.preventDefault();

		// Get input radio values
		let input = [...document.querySelectorAll('input')];

		// Return the only radio checked
		input = input.filter((input) => input.checked);

		// Verify if one element was checked
		if (input.length !== 0) {
			label = input[0].nextElementSibling;
			verifyAnswer(label.innerText);

			updatePage();
		}
	});
}

function initValues() {
	updateHeader(questions[0].title);
	setOptions(questions[0].options);
	setBtn('submit');
	submitEvent();
}

function init() {
	initValues();
}

document.addEventListener('DOMContentLoaded', init);
