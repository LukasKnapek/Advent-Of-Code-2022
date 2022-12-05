import FileHelpers from "../helpers/file.helpers.js";

const inputContents = await FileHelpers.getFileContents("input.txt");
const [cargoState, procedure] = inputContents.split("\n\n");

const cargoStrRows = cargoState.split("\n").slice(0, -1);

const emptySpaceOrCrateRegex = /(    |\[\w\])/g;
const stackCount = cargoStrRows[0].match(emptySpaceOrCrateRegex).length;

const partOneStacks = [...new Array(stackCount)].map(() => new Array());
const partTwoStacks = [...new Array(stackCount)].map(() => new Array());

cargoStrRows.forEach((rowStr) => {
  const cargoRow = rowStr.match(emptySpaceOrCrateRegex);

  cargoRow.forEach((emptySpaceOrCrate, i) => {
    const isCrate = /\[\w\]/.test(emptySpaceOrCrate);
    if (isCrate) {
      partOneStacks[i].push(emptySpaceOrCrate);
      partTwoStacks[i].push(emptySpaceOrCrate);
    }
  });
});

const instructions = procedure.split("\n").map((instruction) => {
  const [howMany, fromStack, toStack] = instruction.match(/\d+/g).map(Number);
  return [howMany, fromStack - 1, toStack - 1];
});

// Part 1
instructions.forEach((instruction, i) => {
  const [howMany, from, to] = instruction;

  const transportedCrates = [...new Array(howMany)].map(() =>
    partOneStacks[from].shift()
  );
  transportedCrates.forEach((crate) => partOneStacks[to].unshift(crate));
});

const createsOnTopOfPartOneStacks = partOneStacks
  .map((stack) => stack[0][1])
  .join("");
console.log("Part 1 result:", createsOnTopOfPartOneStacks);

// Part 2
instructions.forEach((instruction, i) => {
  const [howMany, from, to] = instruction;

  const transportedCrates = [...new Array(howMany)].map(() =>
    partTwoStacks[from].shift()
  );
  partTwoStacks[to] = [...transportedCrates, ...partTwoStacks[to]];
});

const createsOnTopOfPartTwoStacks = partTwoStacks
  .map((stack) => stack[0][1])
  .join("");

console.log("Part 2 result:", createsOnTopOfPartTwoStacks);
