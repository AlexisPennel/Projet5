
const getCanap = async (url) => {

  const response = await fetch(url);
  return await response.json();
};


const main = async () => {

  const items = document.querySelector("#items");
  const canapData = await getCanap("http://localhost:3000/api/products");
  let cards = "";
  console.log(canapData);

  canapData.forEach(element => {
    // productCard(element);
    cards += `<a href="./product.html?${element._id}">
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
