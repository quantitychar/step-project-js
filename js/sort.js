import { displayTrainers } from "./cards.js";
import { DATA } from "./index.js";
// import { addToLocalStorage } from "./lockalStorage.js";

let trainersCopy = [...DATA];
let filteredTrainers = [...trainersCopy];
const sortingButtons = document.querySelectorAll(".sorting__btn");
const filtersForm = document.querySelector(".sidebar__filters");
const showButton = document.querySelector(".filters__submit");

const directionLabels = {
  gym: "тренажерний зал",
  "fight club": "бійцівський клуб",
  "kids club": "дитячий клуб",
  "swimming pool": "басейн",
  all: "всі",
};
const categoryesLabels = {
  master: "майстер",
  specialist: "спеціаліст",
  instructor: "інструктор",
  all: "всі",
};

let selectedSortingCriterion = "ЗА ЗАМОВЧУВАННЯМ";

function showFiltersAndSorting() {
  const sortingSection = document.querySelector(".sorting");
  const sidebar = document.querySelector(".sidebar");

  sortingSection.removeAttribute("hidden");
  sidebar.removeAttribute("hidden");
}

function handleSorting() {
  sortingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sortingButtons.forEach((btn) =>
        btn.classList.remove("sorting__btn--active")
      );

      button.classList.add("sorting__btn--active");

      selectedSortingCriterion = button.textContent.trim();
      sortAndFilterTrainers(selectedSortingCriterion);
    });
  });
}

function sortTrainers(criterion) {
  if (criterion === "ЗА ПРІЗВИЩЕМ") {
    return filteredTrainers.sort((a, b) =>
      a["last name"].localeCompare(b["last name"])
    );
  } else if (criterion === "ЗА ДОСВІДОМ") {
    return filteredTrainers.sort((a, b) => {
      const experienceA = parseInt(a.experience.split(" ")[0]);
      const experienceB = parseInt(b.experience.split(" ")[0]);

      return experienceB - experienceA;
    });
  } else if (criterion === "ЗА ЗАМОВЧУВАННЯМ") {
    return filteredTrainers;
  }
  return filteredTrainers;
}

function filterTrainers() {
  const selectedDirection =
    filtersForm.elements["direction"].value.toLowerCase();
  const selectedCategory = filtersForm.elements["category"].value.toLowerCase();

  localStorage.setItem("selectedDirection", selectedDirection);
  localStorage.setItem("selectedCategory", selectedCategory);
  console.log("Збережено в localStorage:", {
    selectedDirection,
    selectedCategory,
  });

  filteredTrainers = trainersCopy.filter((trainer) => {
    const trainerDirection = trainer.specialization.trim().toLowerCase();
    const trainerCategory = trainer.category.trim().toLowerCase();

    const directionMatches =
      selectedDirection === "all" ||
      trainerDirection === directionLabels[selectedDirection];
    const categoryMatches =
      selectedCategory === "all" ||
      trainerCategory === categoryesLabels[selectedCategory];

    return directionMatches && categoryMatches;
  });

  if (filteredTrainers.length === 0) {
    console.warn("Жоден тренер не відповідає критеріям фільтрації.");
  }
  return filteredTrainers;
}

function sortAndFilterTrainers(criterion) {
  filteredTrainers = filterTrainers();
  const sortedTrainers = sortTrainers(criterion);
  displayTrainers(sortedTrainers);
  const selectedDirection =
    filtersForm.elements["direction"].value.toLowerCase();
  const selectedCategory = filtersForm.elements["category"].value.toLowerCase();
  localStorage.setItem("selectedDirection", selectedDirection);
  localStorage.setItem("selectedCategory", selectedCategory);
}

showButton.addEventListener("click", (event) => {
  event.preventDefault();

  sortAndFilterTrainers(selectedSortingCriterion);
});

showFiltersAndSorting();
handleSorting();
export {
  filterTrainers,
  showButton,
  filtersForm,
  sortAndFilterTrainers,
  selectedSortingCriterion,
};
