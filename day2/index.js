import FileHelpers from "../helpers/file.helpers.js";

const codeToSymbol = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const symbolToPoints = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const winningStrategies = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

const losingStrategies = Object.fromEntries(
  Object.entries(winningStrategies).map(([opponent, self]) => [self, opponent])
);

const inputContents = await FileHelpers.getFileContents("input.txt");
const matchups = inputContents
  .replaceAll("\n", ",")
  .replaceAll(" ", ":")
  .split(",");

const evaluateMatchupScore = (opponentSymbol, mySymbol) => {
  if (winningStrategies[opponentSymbol] === mySymbol)
    return 6 + symbolToPoints[mySymbol];

  if (losingStrategies[opponentSymbol] === mySymbol)
    return 0 + symbolToPoints[mySymbol];

  return 3 + symbolToPoints[mySymbol];
};

// Part 1
const roundScores = matchups.map((matchup) => {
  const [opponentCode, myCode] = matchup.split(":");
  const opponentSymbol = codeToSymbol[opponentCode];
  const mySymbol = codeToSymbol[myCode];

  return evaluateMatchupScore(opponentSymbol, mySymbol);
});

const part1Score = roundScores.reduce((total, score) => total + score, 0);
console.log("Part 1 score:", part1Score);

// Part 2
const strategyMatchups = matchups.map((matchup) => {
  const [opponentCode, strategy] = matchup.split(":");
  const opponentSymbol = codeToSymbol[opponentCode];

  let mySymbol;
  if (strategy === "X") mySymbol = losingStrategies[opponentSymbol];
  if (strategy === "Y") mySymbol = opponentSymbol;
  if (strategy === "Z") mySymbol = winningStrategies[opponentSymbol];

  return evaluateMatchupScore(opponentSymbol, mySymbol);
});

const part2Score = strategyMatchups.reduce((total, score) => total + score, 0);
console.log("Part 2 score:", part2Score);
