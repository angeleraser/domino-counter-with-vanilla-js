import { insertAfter } from "./main.js";
import { createNewRowHTML } from "./Row.js";
const indexGenerator = function* () {
  let i = 2;
  while (i) {
    yield ++i;
  }
};

const gen = indexGenerator();

const addNewGameSetHTML = (wrapper) => {
  const allTeamScores = getAllSetComponents(wrapper.parentNode).htmlElements;
  const prevEl = allTeamScores[allTeamScores.length - 1];
  const newTeamScore = createGameSet();
  insertAfter(newTeamScore, prevEl);
};

const createGameSet = () => {
  const teamScore = document.createElement("div"),
    totalScore = document.createElement("div");
  teamScore.classList.add("team-score");
  teamScore.dataset.teamScore = gen.next().value;
  totalScore.classList.add("total-score");
  totalScore.textContent = "Total: 0";
  teamScore.append(totalScore, createNewRowHTML());
  return teamScore;
};

const getAllSetComponents = (wrapper) => {
  const elements = Array.from(wrapper.querySelectorAll(".team-score"));
  return {
    htmlElements: elements,
  };
};

const createWinLabelHTML = () => {
  const div = document.createElement("div");
  div.classList.add("set-winner");
  div.textContent = "WIN";
  return div;
};

const getLastGameSet = (parent) => {
  const list = Array.from(parent.querySelectorAll(".team-score")),
    lastSet = list[list.length - 1];
  return lastSet;
};

const resetInputValues = (wrapper) => {
  const inputs = Array.from(wrapper.querySelectorAll("[data-column]"));
  for (const input of inputs) {
    input.value = "";
  }
};

const getLosser = (name) => {
  const home = document.querySelector(".home"),
    visitor = document.querySelector(".visitor");
  return name === "home" ? visitor : home;
};

export { addNewGameSetHTML, createWinLabelHTML, getLastGameSet, getLosser, resetInputValues };
