import { Burger, Ingredient } from "./module.js";

const burgerImg = document.getElementById("burgerImg");
const burgerName = document.getElementById("burgerName");
const createDefaultBurgers = document.getElementById("createDefaultBurgers");

const ingredients = [
	new Ingredient("Acide citrique", "acide_citrique.jpg", 50), // 0
	new Ingredient("Acide lactique", "acide_lactique.jpg", 50), // 1
	new Ingredient("Algue nori", "algue_nori.jpg", 20), // 2
	new Ingredient("Arôme", "arome.jpg", 50), // 3
	new Ingredient("Avocat", "avocat.jpg", 5), // 4
	new Ingredient("Cheddar", "cheddar.jpeg", 70), // 5
	new Ingredient("Cire d'abeille", "cire_abeille.jpg", 30), // 6
	new Ingredient("Cire de carnauba", "cire_de_carnauba.jpg", 30), // 7
	new Ingredient("Concentré d'algues", "concentré_d_algue.jpg", 20), // 8
	new Ingredient("Concentré de fruit", "concentré_de_druit.jpg", 50), // 9
	new Ingredient("Cornichons", "corinichons.jpg", 35), // 10
	new Ingredient("Extrait végétal", "extrait_vegetal.png", 50), // 11
	new Ingredient("Fêta", "feta.jpg", 26), // 12
	new Ingredient("Gélatine", "gelatine.jpg", 37), // 13
	new Ingredient("Huile végétale", "huile_vegetale.jpg", 37), // 14
	new Ingredient("Oignons", "oignons.jpg", 16), // 15
	new Ingredient("Pectine", "pectine.jpeg", 19), // 16
	new Ingredient("Pousse de salade", "pousse_de_salade.jpg", 60), // 17
	new Ingredient("Riz à sushi", "riz_sushi.jpg", 34), // 18
	new Ingredient("Salade", "salad.jpg"), // 19
	new Ingredient("Sauce barbecue", "sauce_bbq.jpg"), // 20
	new Ingredient("Sauce burger", "sauce_burger.jpg"), // 21
	new Ingredient("Saumon", "saumon.png"), // 22
	new Ingredient("Sirop de glucose", "sirop_de_glucose.jpeg"), // 23
	new Ingredient("Steak", "steak.jpg"), // 24
	new Ingredient("Sucre", "sucre.jpg"), // 25
	new Ingredient("Tomate", "tomate.png"), // 26
	new Ingredient("Viande végétale", "viande_vegetal.jpg"), // 27
	new Ingredient("Pain à burger", "pain_urger.jpg"), // 28
	new Ingredient("Galette", "galette_wrap.jpg"), // 29
];

let burgers = [];

let _currentBurger = 0;

document.addEventListener("DOMContentLoaded", async () => {
	// after html loaded
	console.log("Loaded");
	burgers = Burger.Load();

	if (burgers == []) burgers = Burger.setupBurgers(ingredients);

	burgerImg.addEventListener("click", toggleBurgerName);
	createDefaultBurgers.addEventListener("click", () => {
		burgers = Burger.setupBurgers(ingredients);
		Burger.Save(burgers);
	});

	console.log(burgers[4]);

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
	burgerImg.setAttribute("src", burgerFolder + burgers[_currentBurger].url);
	burgerName.innerText = burgers[_currentBurger].name;
}

function toggleBurgerName() {
	burgerName.classList.toggle("hidden");
}
