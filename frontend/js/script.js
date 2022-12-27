// importation de la fonction "getCanap" depuis le fichier "requests.js"
import { getCanap } from './lib/requests.js';

// Fonction principale, qui permet la récupération des données transmises par l'API et la création des "cartes produit"
const main = async () => {
  const items = document.querySelector("#items");

  // Récupération des produits avec l'API
  let canapData = await getCanap("http://localhost:3000/api/products");
  let cards = "";

  // Message d'erreur si canapData retourne -1
  if (canapData === -1) {
    alert("erreur");
    return
  }
  // Si les données sont correctes => création des "cartes produit"
  canapData.forEach(element => {
    cards += `<a href="./product.html?id=${element._id}">
          <article>
            <img src="${element.imageUrl}" alt="${element.altTxt}">
            <h3 class="productName">${element.name}</h3>
            <p class="productDescription">${element.description}</p>
          </article>
        </a>`
  })
   
  items.innerHTML = cards;

};

main();

