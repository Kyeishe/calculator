// -------------------- Advanced Calculator with Explanation --------------------
function calculate() {
  const input = document.getElementById("calcInput").value;
  try {
    const result = eval(input);
    const explanation = `To solve: ${input}, follow standard math operations. Result: ${result}`;
    document.getElementById("calcResult").textContent = result;
    document.getElementById("calcExplanation").textContent = explanation;
  } catch (e) {
    document.getElementById("calcResult").textContent = "Invalid expression";
    document.getElementById("calcExplanation").textContent = "";
  }
}

// -------------------- Math Challenge Mode with Difficulty & Score --------------------
let currentChallenge = {};
let score = 0;

function generateChallenge(difficulty = 'easy') {
  let a, b, opSet, max;

  switch (difficulty) {
    case 'medium':
      max = 50;
      opSet = ["+", "-", "*"];
      break;
    case 'hard':
      max = 100;
      opSet = ["+", "-", "*", "/"];
      break;
    case 'expert':
      max = 500;
      opSet = ["+", "-", "*", "/",];
      break;
    default: // easy
      max = 10;
      opSet = ["+", "-", "*"];
  }

  a = Math.floor(Math.random() * max) + 1;
  b = Math.floor(Math.random() * max) + 1;
  let op = opSet[Math.floor(Math.random() * opSet.length)];

  // Prevent division by 0
  if (op === "/" && b === 0) b = 1;

  let question = `${a} ${op} ${b}`;
  let answer = parseFloat(eval(question).toFixed(2));
  let explanation = `Compute ${a} ${op} ${b} = ${answer}`;

  currentChallenge = { question, answer, explanation };

  document.getElementById("challengeQuestion").textContent = `What is ${question}?`;
  document.getElementById("challengeFeedback").textContent = "-";
  document.getElementById("challengeExplanation").textContent = "-";
  document.getElementById("challengeAnswer").value = "";
}

function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById("challengeAnswer").value);
  if (isNaN(userAnswer)) {
    document.getElementById("challengeFeedback").textContent = "❗ Please enter a number.";
    return;
  }

  if (Math.abs(userAnswer - currentChallenge.answer) < 0.01) {
    document.getElementById("challengeFeedback").textContent = "✅ Correct!";
    score++;
  } else {
    document.getElementById("challengeFeedback").textContent =
      `❌ Incorrect. Correct answer: ${currentChallenge.answer}`;
  }

  document.getElementById("challengeExplanation").textContent = currentChallenge.explanation;
  document.getElementById("scoreBoard").textContent = `Score: ${score}`;
}
