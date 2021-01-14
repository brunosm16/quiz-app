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

let counter = 1;
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
		optionBox.querySelector('label').innerHTML = option;
		boxOptions.appendChild(optionBox);
	});
}

function getButtonElement() {
	let attrs = new Map();
	attrs.set('class', 'btn');
	attrs.set('id', 'submit-btn');

	return getHTMLElement('button', attrs);
}

function setBtn(message) {
	let btn = getButtonElement();
	btn.innerHTML = message;

	btnContainer.appendChild(btn);
}

function initValues() {
	// Initialize header
	let initialHeader = questions[0].title;

	setHeader(initialHeader);
	setOptions(questions[0].options);
	setBtn('submit');
}

function verifyAnswer(answer) {
	if (answer === questions[counter].answer) {
		rightAnswers++;
	}
}

function changeQuestion() {
    if(counter === questions.length) {
        // setReloadPage
    }
    let newHeader = questions[counter].title;
    setHeader(newHeader);
    // setOptions(questions[counter])
    counter++;
}

function submitEvent() {
	const submitBtn = document.querySelector('#submit-btn');

	submitBtn.addEventListener('click', (e) => {
		e.preventDefault();

		let input = [...document.querySelectorAll('input')];

        input = input.filter((input) => input.checked);
        label = input[0].nextElementSibling;

		if (input.length !== 0) {
			verifyAnswer(label.innerText);
            changeQuestion();
            console.log(counter);
        }
	});
}

function init() {
	initValues();
	submitEvent();
}

document.addEventListener('DOMContentLoaded', init);
