let items = document.querySelector("#items");

// fonction ajout d'un produit 
let productCard = (element) => {
    const a = document.createElement("a");
    items.appendChild(a)


    const article = document.createElement("article");
    a.appendChild(article);
    a.href = `product.html?id=${element._id}`
    
    const img = document.createElement("img");
    article.appendChild(img);
    img.src = element.imageUrl;
    img.alt = element.altTxt;


    const h3 = document.createElement("h3");
    article.appendChild(h3);
    h3.classList.add("productName");
    h3.innerHTML = element.name;

    const p = document.createElement("p");
    article.appendChild(p);
    p.innerHTML = element.description;
    p.classList.add("productDescription");
}

//récupération des données produits et ajout au DOM 
const data = fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .catch(error => alert("erreur" + error))
    .then(data => {
        data.forEach(element => {
         productCard(element);
        })
    });


    

