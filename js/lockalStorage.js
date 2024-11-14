"use string";
import {
  filterTrainers,
  showButton,
  filtersForm,
  sortAndFilterTrainers,
  selectedSortingCriterion,
} from "./sort.js";

function restoreFilters() {
  const savedDirection = localStorage.getItem("selectedDirection");
  const savedCategory = localStorage.getItem("selectedCategory");

  if (savedDirection) {
    filtersForm.elements["direction"].value = savedDirection;
  }

  if (savedCategory) {
    filtersForm.elements["category"].value = savedCategory;
  }
  sortAndFilterTrainers(selectedSortingCriterion);
}

showButton.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault;
  filterTrainers();
});

document.addEventListener("DOMContentLoaded", () => {
  restoreFilters();
});
