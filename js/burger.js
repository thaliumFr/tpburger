import {
	Burger,
	Ingredient,
	getCookie,
	eraseCookie,
	setCookie,
} from "./module.js";

const form = document.getElementById("burgerForm");

let name;
let url;
let ingredient1;
let ingredient2;
let ingredient3;
let confirmationMessage;

let ingredients;

document.addEventListener("DOMContentLoaded", () => {
	name = document.getElementById("burgerName");
	url = document.getElementById("burgerUrl");
	ingredient1 = document.getElementById("ingredient1");
	ingredient2 = document.getElementById("ingredient2");
	ingredient3 = document.getElementById("ingredient3");
	confirmationMessage = document.getElementById("confirmationMessage");

	ingredients = Ingredient.Load();

	makeIngredientList();

	confirmationMessage.innerText = getCookie("Bstate");
	eraseCookie("Bstate");
});

form.addEventListener("submit", (e) => {
	let burger = new Burger(name.value, url.value);

	setCookie("Bstate", "Le burger " + burger.name + " à bien été ajouté");

	burger.addIngredient(ingredient1.value);
	burger.addIngredient(ingredient2.value);
	burger.addIngredient(ingredient3.value);

	// Ajout du burger à la liste
	const burgers = Burger.Load();
	burgers.push(burger);
	Burger.Save(burgers);
});

function makeIngredientList() {
	ingredients.forEach((ingredient) => {
		if (ingredient.quantity > 0) {
			const el = document.createElement("option");
			el.value = ingredient.name;
			el.innerText = ingredient.name + " ( " + ingredient.quantity + " )";

			ingredient1.appendChild(el);

			const el2 = document.createElement("option");
			el2.value = ingredient.name;
			el2.innerText = ingredient.name + " ( " + ingredient.quantity + " )";

			ingredient2.appendChild(el2);

			const el3 = document.createElement("option");
			el3.value = ingredient.name;
			el3.innerText = ingredient.name + " ( " + ingredient.quantity + " )";

			ingredient3.appendChild(el3);
		}
	});
}
