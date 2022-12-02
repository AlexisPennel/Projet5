import { getCanap } from './lib/requests.js';

const main = async () => {
  const items = document.querySelector("#items");
  let canapData = await getCanap("http://localhost:3000/api/products");
  let cards = "";

  if (canapData === -1) {
    alert("erreur");
    return
  }

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

