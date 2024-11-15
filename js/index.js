import { Burger, Ingredient } from "./module.js";

const burgerImg = document.getElementById("burgerImg");
const burgerName = document.getElementById("burgerName");
const createDefaultBurgers = document.getElementById("createDefaultBurgers");

let ingredients = new Map();

let burgers = [];

let _currentBurger = 0;

document.addEventListener("DOMContentLoaded", async () => {
	// after html loaded
	console.log("Loading...");
	burgers = Burger.Load();
	ingredients = Ingredient.Load();

	console.log(new Map(Ingredient.SetupIngredients()));

	if (ingredients == []) ingredients = Ingredient.SetupIngredients();
	if (burgers == []) burgers = Burger.setupBurgers(ingredients);

	burgerImg.addEventListener("click", toggleBurgerName);
	createDefaultBurgers.addEventListener("click", () => {
		ingredients = new Map(Ingredient.SetupIngredients());
		burgers = Burger.setupBurgers(ingredients);
		Ingredient.Save(ingredients);
		Burger.Save(burgers);
	});

	console.log("Loading finished");

	changeBurger();
	setInterval(changeBurger, 10000);
});

function changeBurger() {
	const burgerFolder = "burger/";
	_currentBurger = ++_currentBurger % (burgers.length - 1);

	if (burgers[_currentBurger] == undefined || burgers[_currentBurger] == null) {
		return;
	}

	console.log("new burger : " + burgers[_currentBurger].name);
	burgerImg.setAttribute(
		"src",
		burgers[_currentBurger].url.startsWith("http")
			? burgers[_currentBurger].url
			: burgerFolder + burgers[_currentBurger].url
	);
	burgerName.innerText = burgers[_currentBurger].name;
}

function toggleBurgerName() {
	burgerName.classList.toggle("hidden");
}
