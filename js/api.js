const txt = document.getElementById("txt");

function getAPIContent() {
	const request = new XMLHttpRequest();
	request.open(
		"GET",
		"https://opendata.agencebio.org/api/gouv/operateurs/?siret=79317749400028"
	);
	request.onreadystatechange = (e) => {
		console.log(request.readyState);

		// once the request is finished and fully received
		if (request.readyState == request.DONE) {
			let APIContent = request.response;

			processAPIContent(APIContent);
		}
	};

	request.send();
}

function processAPIContent(APIContent) {
	let content = JSON.parse(APIContent);

	if (content["nbTotal"] == 0) {
		console.error("the operators couldn't be loaded");
		return;
	}

	console.log(content);

	content = content["items"][0];
	addresses = content["adressesOperateurs"][0];

	let res =
		"Notre restaurant travaille avec des produits locaux provenant de la ferme bio numéro " +
		content["numeroBio"] +
		" de Monsieur " +
		content["gerant"] +
		" située à l'adresse " +
		addresses["lieu"] +
		"" +
		addresses["codePostal"] +
		" " +
		addresses["ville"] +
		" Cette ferme intervient dans les commerces :\n";

	for (const commerce of content["productions"]) {
		res += "- " + commerce["nom"] + "\n";
	}

	txt.innerText = res;

	console.log(res);
}

document.addEventListener("DOMContentLoaded", () => getAPIContent());
