const getCanap = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    return canapData = -1;
  }
};

const main = async () => {
  const items = document.querySelector("#items");
  let canapData = await getCanap("http://localhost:3000/api/products");
  let cards = "";
  console.log(canapData);

  if (canapData === -1) {
    alert("erreur");
  } else {
    canapData.forEach(element => {
      cards += `<a href="./product.html?${element._id}">
          <article>
            <img src="${element.imageUrl}" alt="${element.altTxt}">
            <h3 class="productName">${element.name}</h3>
            <p class="productDescription">${element.description}</p>
          </article>
        </a>`
    })
    items.innerHTML = cards;
  }
};

main();
