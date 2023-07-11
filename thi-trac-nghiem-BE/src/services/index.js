question_and_options = [
    'Cau 1: a + b = ?',
    'c',
    'd',
    'e',
    'f',
    'ANSWER: C',
]
let QA = {}
QA.question = question_and_options[0];
QA.answersList = question_and_options.slice(1, question_and_options.length - 1);
QA.resultQuestion = new Array(QA.answersList.length);
QA.resultQuestion.fill(false);
QA.resultQuestion[question_and_options[question_and_options.length - 1][8].charCodeAt(0) - 'A'.charCodeAt(0)] = true;
QA.subjectId = 1;
console.log(QA);
console.log(question_and_options[question_and_options.length - 1].charCodeAt(0) - 'A'.charCodeAt(0));