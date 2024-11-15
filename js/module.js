export function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

export function eraseCookie(name) {
	document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export class Ingredient {
	static storageID = "ingredients";

	constructor(name, url, quantity = 1) {
		this.name = name;
		this.url = url;
		this.quantity = quantity;
	}

	static CreateOrAdd(name, url, quantity = 0) {
		const ingredients = Ingredient.Load();

		let ingredient = ingredients.get(name);
		if (ingredient != undefined) {
			ingredient.quantity += quantity;
			console.log("added ");
		} else {
			ingredient = new Ingredient(name, url, quantity);
			console.log("created");
		}

		ingredients.set(name, ingredient);
		Ingredient.Save(ingredients);
		setCookie(
			"Istate",
			"L'ingrédient " + ingredient.name + " à bien été ajouté"
		);
	}

	static find(ingredients, name) {
		ingredients.forEach((el) => {
			if (el.name == name) {
				return el;
			}
		});
		return null;
	}

	static SetupIngredients() {
		return [
			[
				"Acide citrique",
				new Ingredient("Acide citrique", "acide_citrique.jpg", 50),
			], // 0
			[
				"Acide lactique",
				new Ingredient("Acide lactique", "acide_lactique.jpg", 50),
			], // 1
			["Algue nori", new Ingredient("Algue nori", "algue_nori.jpg", 20)], // 2
			["Arôme", new Ingredient("Arôme", "arome.jpg", 50)], // 3
			["Avocat", new Ingredient("Avocat", "avocat.jpg", 5)], // 4
			["Cheddar", new Ingredient("Cheddar", "cheddar.jpeg", 70)], // 5
			[
				"Cire d'abeille",
				new Ingredient("Cire d'abeille", "cire_abeille.jpg", 30),
			], // 6
			[
				"Cire de carnauba",
				new Ingredient("Cire de carnauba", "cire_de_carnauba.jpg", 30),
			], // 7
			[
				"Concentré d'algues",
				new Ingredient("Concentré d'algues", "concentré_d_algue.jpg", 20),
			], // 8
			[
				"Concentré de fruit",
				new Ingredient("Concentré de fruit", "concentré_de_druit.jpg", 50),
			], // 9
			["Cornichons", new Ingredient("Cornichons", "corinichons.jpg", 35)], // 10
			[
				"Extrait végétal",
				new Ingredient("Extrait végétal", "extrait_vegetal.png", 50),
			], // 11
			["Fêta", new Ingredient("Fêta", "feta.jpg", 26)], // 12
			["Gélatine", new Ingredient("Gélatine", "gelatine.jpg", 37)], // 13
			[
				"Huile végétale",
				new Ingredient("Huile végétale", "huile_vegetale.jpg", 37),
			], // 14
			["Oignons", new Ingredient("Oignons", "oignons.jpg", 16)], // 15
			["Pectine", new Ingredient("Pectine", "pectine.jpeg", 19)], // 16
			[
				"Pousse de salade",
				new Ingredient("Pousse de salade", "pousse_de_salade.jpg", 60),
			], // 17
			["Riz à sushi", new Ingredient("Riz à sushi", "riz_sushi.jpg", 34)], // 18
			["Salade", new Ingredient("Salade", "salad.jpg")], // 19
			["Sauce barbecue", new Ingredient("Sauce barbecue", "sauce_bbq.jpg")], // 20
			["Sauce burger", new Ingredient("Sauce burger", "sauce_burger.jpg")], // 21
			["Saumon", new Ingredient("Saumon", "saumon.png")], // 22
			[
				"Sirop de glucose",
				new Ingredient("Sirop de glucose", "sirop_de_glucose.jpeg"),
			], // 23
			["Steak", new Ingredient("Steak", "steak.jpg")], // 24
			["Sucre", new Ingredient("Sucre", "sucre.jpg")], // 25
			["Tomate", new Ingredient("Tomate", "tomate.png")], // 26
			[
				"Viande végétale",
				new Ingredient("Viande végétale", "viande_vegetal.jpg"),
			], // 27
			["Pain à burger", new Ingredient("Pain à burger", "pain_urger.jpg")], // 28
			["Galette", new Ingredient("Galette", "galette_wrap.jpg")], // 29
		];
	}

	static Save(ingredients) {
		localStorage.removeItem(Ingredient.storageID);
		localStorage.setItem(
			Ingredient.storageID,
			JSON.stringify(Array.from(ingredients))
		);
	}

	static Load() {
		let ingredients = localStorage.getItem(Ingredient.storageID);

		return ingredients != null ? new Map(JSON.parse(ingredients)) : new Map();
	}
}

export class Burger {
	static storageID = "burgers";

	constructor(name, url, ingredients = []) {
		this.name = name;
		this.url = url;
		this.ingredients = ingredients;
	}

	addIngredient(ingredientName) {
		const ingredientsList = Ingredient.Load();
		let ingredient = ingredientsList.get(ingredientName);
		if (ingredient != null || ingredient.quantity < 1) {
			console.log(
				"Il n'y a plus assez de " +
					ingredient.name +
					"pour l'ajouter à ce burger"
			);

			setCookie(
				"Bstate",
				"Le burger n'a pas pu être créé car il n'y a pas assez de " +
					ingredientName
			);
			return;
		}

		this.ingredients.push(ingredient.name);
		ingredient.quantity--;

		if (ingredient.quantity <= 0) ingredientsList.delete(key);
		else ingredientsList.set(ingredient.name, ingredient);

		console.log("il reste " + ingredient.quantity + " " + ingredient.name);
		Ingredient.Save(ingredientsList);
	}

	addIngredients(ingredientList) {
		ingredientList.forEach((ingredient) => this.addIngredient(ingredient.name));
	}

	static setupBurgers(ingredients) {
		let burgers = [
			new Burger("Sushi burger", "Sushi_burger.jpg"),
			new Burger("Bonbon burger", "Bonbon_hamburger.jpg"),
			new Burger(
				"Burger double steak cheese",
				"Burger_double_steak_cheese.jpg"
			),
			new Burger("Burger pour brouteur", "Burger_pour_brouteur.jpg"),
			new Burger("Wrap burger", "Burger_wrap_barbecue.jpg"),
		];

		burgers[0].ingredients = [
			Array.from(ingredients.values())[2].name,
			Array.from(ingredients.values())[4].name,
			Array.from(ingredients.values())[10].name,
			Array.from(ingredients.values())[18].name,
			Array.from(ingredients.values())[22].name,
		];

		burgers[1].ingredients = [
			Array.from(ingredients.values())[0].name,
			Array.from(ingredients.values())[1].name,
			Array.from(ingredients.values())[3].name,
			Array.from(ingredients.values())[6].name,
			Array.from(ingredients.values())[7].name,
			Array.from(ingredients.values())[8].name,
			Array.from(ingredients.values())[9].name,
			Array.from(ingredients.values())[11].name,
			Array.from(ingredients.values())[13].name,
			Array.from(ingredients.values())[14].name,
			Array.from(ingredients.values())[16].name,
			Array.from(ingredients.values())[23].name,
			Array.from(ingredients.values())[25].name,
		];

		burgers[2].ingredients = [
			Array.from(ingredients.values())[5].name,
			Array.from(ingredients.values())[15].name,
			Array.from(ingredients.values())[21].name,
			Array.from(ingredients.values())[24].name,
			Array.from(ingredients.values())[26].name,
			Array.from(ingredients.values())[28].name,
		];

		burgers[3].ingredients = [
			Array.from(ingredients.values())[12].name,
			Array.from(ingredients.values())[19].name,
			Array.from(ingredients.values())[20].name,
			Array.from(ingredients.values())[27].name,
			Array.from(ingredients.values())[28].name,
		];

		burgers[4].ingredients = [
			Array.from(ingredients.values())[5].name,
			Array.from(ingredients.values())[10].name,
			Array.from(ingredients.values())[15].name,
			Array.from(ingredients.values())[19].name,
			Array.from(ingredients.values())[20].name,
			Array.from(ingredients.values())[24].name,
			Array.from(ingredients.values())[26].name,
			Array.from(ingredients.values())[29].name,
		];

		return burgers;
	}

	static Save(burgers) {
		localStorage.removeItem(Burger.storageID);
		localStorage.setItem(Burger.storageID, JSON.stringify(burgers));
	}

	static Load() {
		let burgers = localStorage.getItem(Burger.storageID);

		return burgers != null ? JSON.parse(burgers) : [];
	}
}
