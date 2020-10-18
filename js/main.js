import { updateGameState, getInputFields } from "./Row.js";

const gameMaxScore = 100;

const getTotalScore = (values) => values.reduce((sum, val) => sum + val, 0);

const insertAfter = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

const updateCurrentScore = (wrapper) => {
  return () => {
    const values = getInputFields(wrapper).values;
    const totalScoreElement = wrapper.querySelector(".total-score");
    if (!wrapper.classList.contains("done")) {
      totalScoreElement.textContent = `Total: ${getTotalScore(values)}`;
    }
  };
};

const onEventListener = (wrapper) => {
  wrapper.addEventListener("click", ({ target }) => {
    const { parentNode } = target;
    let element = parentNode;
    if (!element.dataset.hasOwnProperty("teamScore")) {
      element = parentNode.parentNode;
      if (!element.classList.contains("done")) {
        if (target.tagName === "INPUT" && target.type === "number") {
          target.addEventListener("keydown", updateGameState(element));
          target.addEventListener("keyup", updateCurrentScore(element));
        }
      }
    }
  });
};

export {
  onEventListener,
  insertAfter,
  getTotalScore,
  updateCurrentScore,
  gameMaxScore,
};
