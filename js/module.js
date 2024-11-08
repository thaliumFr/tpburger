export class Ingredient {
	static storageID = "ingredients";

	constructor(name, url, quantity = 1) {
		this.name = name;
		this.url = url;
		this.quantity = quantity;
	}

	static find(ingredients, name) {
		ingredients.forEach((el) => {
			if (el.name == name) {
				return el;
			}
		});
		return null;
	}

	static Save(ingredients) {
		localStorage.removeItem(Ingredient.storageID);
		localStorage.setItem(Ingredient.storageID, JSON.stringify(ingredients));
	}

	static Load() {
		let ingredients = localStorage.getItem(Ingredient.storageID);

		return ingredients != null ? JSON.parse(ingredients) : [];
	}
}

export class Burger {
	static storageID = "burgers";

	constructor(name, url, ingredients = []) {
		this.name = name;
		this.url = url;
		this.ingredients = ingredients;
	}

	addIngredient(ingredient) {
		this.ingredients.push(ingredient);
		ingredient.quantity--;

		console.log("il reste " + ingredient.quantity + " " + ingredient.name);
	}

	addIngredients(ingredientList) {
		ingredientList.forEach((ingredient) => this.addIngredient(ingredient));
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
			new Burger("Wrap burger", "Burger_wrap.jpg"),
		];

		burgers[0].addIngredients([
			ingredients[2],
			ingredients[4],
			ingredients[10],
			ingredients[18],
			ingredients[22],
		]);

		burgers[1].addIngredients([
			ingredients[0],
			ingredients[1],
			ingredients[3],
			ingredients[6],
			ingredients[7],
			ingredients[8],
			ingredients[9],
			ingredients[11],
			ingredients[13],
			ingredients[14],
			ingredients[16],
			ingredients[23],
			ingredients[25],
		]);

		burgers[2].addIngredients([
			ingredients[5],
			ingredients[15],
			ingredients[21],
			ingredients[24],
			ingredients[26],
			ingredients[28],
		]);

		burgers[3].addIngredients([
			ingredients[12],
			ingredients[19],
			ingredients[20],
			ingredients[27],
			ingredients[28],
		]);

		burgers[4].addIngredients([
			ingredients[5],
			ingredients[10],
			ingredients[15],
			ingredients[19],
			ingredients[20],
			ingredients[24],
			ingredients[26],
			ingredients[29],
		]);

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
