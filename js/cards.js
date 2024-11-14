"use strict";
import { DATA } from "./index.js";

function displayTrainers(trainers) {
  const container = document.querySelector(".trainers-cards__container");
  const template = document.getElementById("trainer-card").content;
  container.innerHTML = "";

  trainers.forEach((trainer) => {
    const card = template.cloneNode(true);

    const imgElement = card.querySelector(".trainer__img");
    imgElement.src = trainer.photo;
    imgElement.alt = `${trainer["first name"]} ${trainer["last name"]}`;

    const nameElement = card.querySelector(".trainer__name");
    nameElement.textContent = `${trainer["first name"]} ${trainer["last name"]}`;

    const showMoreButton = card.querySelector(".trainer__show-more");
    showMoreButton.addEventListener("click", () => {
      showTrainerDetails(trainer);
    });

    container.appendChild(card);
  });
}

function showTrainerDetails(trainer) {
  const modalTemplate = document.getElementById("modal-template").content;
  const modal = modalTemplate.cloneNode(true);

  const modalImg = modal.querySelector(".modal__img");
  modalImg.src = trainer.photo;
  modalImg.alt = `${trainer["first name"]} ${trainer["last name"]}`;

  modal.querySelector(
    ".modal__name"
  ).textContent = `${trainer["first name"]} ${trainer["last name"]}`;
  modal.querySelector(
    ".modal__point--category"
  ).textContent = `Категорія: ${trainer.category}`;
  modal.querySelector(
    ".modal__point--experience"
  ).textContent = `Досвід: ${trainer.experience}`;
  modal.querySelector(
    ".modal__point--specialization"
  ).textContent = `Напрям тренера: ${trainer.specialization}`;
  modal.querySelector(".modal__text").textContent = trainer.description;

  document.body.style.overflow = "hidden";

  modal.querySelector(".modal__close").addEventListener("click", () => {
    document.body.removeChild(document.querySelector(".modal"));
    document.body.style.overflow = "auto";
  });

  document.body.appendChild(modal);
}

displayTrainers(DATA);
export { displayTrainers, showTrainerDetails };
