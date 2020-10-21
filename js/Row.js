import { insertAfter, gameMaxScore } from "./main.js";
import {
  addNewGameSetHTML,
  createWinLabelHTML,
  getLastGameSet,
  resetInputValues,
  getLosser,
} from "./GameSet.js";

const indexGenerator = function* () {
  let i = 2;
  while (i) {
    yield ++i;
  }
};
const gen = indexGenerator();
const teams = ["home", "visitor"];
const getTotalScore = (values) => values.reduce((sum, val) => sum + val, 0);

const getSetResults = (table) => {
  const values = getInputFields(table).values;
  const totalScoreElement = table.querySelector(".total-score");
  const { htmlElements, empty } = getAllRowsHTML(table);
  const totalScore = getTotalScore(values);
  if (!table.classList.contains("done")) {
    totalScoreElement.textContent = `Total: ${totalScore}`;
  }
  return {
    values,
    totalScore,
    allRows: htmlElements,
    emptyRows: empty,
  };
};

const createNewRowHTML = () => {
  const row = document.createElement("label"),
    inputLeft = document.createElement("input"),
    inputRight = document.createElement("input");
  row.classList.add("row"),
    (inputRight.type = "number"),
    (inputLeft.type = "number"),
    (inputLeft.dataset.column = gen.next().value),
    (inputRight.dataset.column = gen.next().value);
  row.append(inputLeft, inputRight);
  return row;
};

const pushNewRowHTML = (rows) => {
  const lastRow = rows[rows.length - 1];
  const newRow = createNewRowHTML();
  insertAfter(newRow, lastRow);
};

const getInputFields = (table) => {
  const inputs = Array.from(table.querySelectorAll("[data-column]"));
  return {
    htmlElements: inputs,
    values: inputs.map(({ value }) =>
      value.length === 0 ? 0 : parseInt(value)
    ),
    empty: inputs.filter((inp) => inp.value.trim().length === 0),
  };
};

const getAllRowsHTML = (table) => {
  const rows = Array.from(table.querySelectorAll(".row"));
  return {
    htmlElements: rows,
    empty: rows.filter((row) => {
      return getInputFields(row).empty.length === 2;
    }),
  };
};

const updateGameState = (table) => {
  return ({ key }) => {
    if (key === "Enter") {
      const { values, emptyRows, allRows, totalScore } = getSetResults(table);
      if (
        values.every((val) => val > 0) &&
        totalScore < gameMaxScore &&
        !table.classList.contains("done")
      ) {
        pushNewRowHTML(allRows);
      } else if (
        allRows.length >= 2 &&
        emptyRows.length &&
        !table.classList.contains("done")
      )
        removeEmptyRows(table);
      else if (
        totalScore >= gameMaxScore &&
        !table.classList.contains("done")
      ) {
        const lastRow = allRows[allRows.length - 1],
          winnerName = table.parentNode.classList.contains("home")
            ? "home"
            : "visitor",
          losser = getLosser(winnerName);
        getInputFields(table).htmlElements.forEach((input) => {
          input.setAttribute("disabled", true);
        });
        insertAfter(createWinLabelHTML(), lastRow);
        table.classList.add("done");
        addNewGameSetHTML(table);
        resetInputValues(getLastGameSet(losser));
      }
    }
  };
};

const removeEmptyRows = (table) => {
  const { empty, htmlElements } = getAllRowsHTML(table);
  let rowsToDelete = empty;
  if (empty.length === htmlElements.length) {
    rowsToDelete = empty.filter((_, i) => i > 0);
  }
  for (const el of rowsToDelete) {
    el.remove();
  }
};

export { updateGameState, getInputFields, createNewRowHTML };
