import FileHelpers from "../helpers/file.helpers.js";

const inputContents = await FileHelpers.getFileContents("input.txt");

const getItemPriority = (item) => {
  const lowercaseACode = "a".charCodeAt(0);
  const uppercaseACode = "A".charCodeAt(0);

  return item.toLowerCase() === item
    ? 1 + (item.charCodeAt(0) - lowercaseACode)
    : 27 + (item.charCodeAt(0) - uppercaseACode);
};

const rucksacks = inputContents.split("\n");
const misplacedItems = rucksacks.map((rucksack) => {
  const rucksackMidpoint = rucksack.length / 2;
  const leftCompartment = rucksack.slice(0, rucksackMidpoint).split("");
  const rightCompartment = rucksack.slice(rucksackMidpoint).split("");

  const misplacedItem = rucksack
    .split("")
    .find(
      (item) =>
        leftCompartment.includes(item) && rightCompartment.includes(item)
    );
  return misplacedItem;
});

const misplacedItemPriorities = misplacedItems.map(getItemPriority);
const misplacedItemsPrioritySum = misplacedItemPriorities.reduce(
  (total, itemPriority) => total + itemPriority,
  0
);

console.log("Part 1 result:", misplacedItemsPrioritySum);

// Part 2
const rucksacksPerGroup = 3;
const rucksackGroups = rucksacks.reduce((groups, _, i) => {
  const rucksackIndex = i + 1;

  if (rucksackIndex % rucksacksPerGroup === 0) {
    const rucksackGroupStart = rucksackIndex - rucksacksPerGroup;
    const rucksackGroup = rucksacks.slice(rucksackGroupStart, rucksackIndex);
    return [...groups, rucksackGroup];
  }
  return groups;
}, []);

const rucksackGroupBadges = rucksackGroups.map((group) => {
  const [r1, r2, r3] = group.map((strRucksack) => strRucksack.split(""));
  const groupBadge = r1.find((item) => r2.includes(item) && r3.includes(item));
  return groupBadge;
});
const groupBadgePriorities = rucksackGroupBadges.map(getItemPriority);
const groupBadgePrioritySum = groupBadgePriorities.reduce(
  (total, val) => total + val,
  0
);

console.log("Part 2 result:", groupBadgePrioritySum);
