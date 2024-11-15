import { Burger, Ingredient, getCookie, eraseCookie } from "./module.js";

const form = document.getElementById("ingredientForm");

let name;
let url;
let quantity;

let confirmationMessage;

let ingredients;

const ingredientListEl = document.getElementById("ingredientList");

document.addEventListener("DOMContentLoaded", () => {
	name = document.getElementById("ingredientName");
	url = document.getElementById("ingredientUrl");
	quantity = document.getElementById("ingredientQuantity");

	confirmationMessage = document.getElementById("confirmationMessage");

	ingredients = Ingredient.Load();

	ingredients.forEach((ingredient) => {
		let el = document.createElement("li");
		el.innerText = ingredient.name + " : " + ingredient.quantity;
		ingredientListEl.appendChild(el);
	});

	confirmationMessage.innerText = getCookie("Istate");
	eraseCookie("Istate");
});

form.addEventListener("submit", (e) => {
	Ingredient.CreateOrAdd(name.value, url.value, parseInt(quantity.value));
});
