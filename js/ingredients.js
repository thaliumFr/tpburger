import { Burger, Ingredient } from "./module.js";

const form = document.getElementById("ingredientForm");

let name;
let url;
let quantity;

let ingredients;

document.addEventListener("DOMContentLoaded", () => {
	name = document.getElementById("ingredientName");
	url = document.getElementById("ingredientUrl");
	quantity = document.getElementById("ingredientQuantity");

	ingredients = Ingredient.Load();
});

form.addEventListener("submit", (e) => {
	const ingredient = new Ingredient(name.value, url.value, quantity.value);
	ingredients.push(ingredient);
	Ingredient.Save(ingredients);

	const confirmation = document.getElementById("confirmation");
});
