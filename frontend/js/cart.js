import { getCartArray, multiply, quantityCheck, sum } from "./lib/cartManagement.js";
import { getCanap } from "./lib/requests.js";

const main = () => {

  const cartArray = getCartArray();
  const cartItems = document.getElementById('cart__items');
  const totalQuantityContainer = document.getElementById('totalQuantity');
  const totalPriceContainer = document.getElementById('totalPrice');
  let productData = []
  let card = "";

  const createCard = async (element) => {
    const canapData = await getCanap(`http://localhost:3000/api/products/${element.id}`);

    const product = {
      id: element.id,
      color: element.color,
      price: canapData.price,
      totalPrice: 0
    };

    productData.push(product);
    product.totalPrice = multiply(product.price, element.quantity);
    localStorage.setItem('productData', JSON.stringify(productData));

    card += `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
        <div class="cart__item__img">
          <img src="${canapData.imageUrl}" alt="${canapData.description}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${canapData.name}</h2>
            <p>${element.color}</p>
            <p>${product.totalPrice}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`

    cartItems.innerHTML = card;
    // Affichage du prix total des produits
    totalPriceContainer.innerHTML = sum();
    // Affichage de la quantité totale de produits 
    totalQuantityContainer.innerHTML = cartArray.length;

  };

  cartArray.forEach(element => {
    createCard(element);
  });
  

  // Event suppression d'un produit 
  document.addEventListener('click', (e) => {
    if (e.target.className == "deleteItem") {
      const article = e.target.closest('article');
      const dataId = article.dataset.id;
      const dataColor = article.dataset.color;
      // supression de la carte sur la page et du produit dans le localStorage 'cartArray'
      cartItems.removeChild(article);
      let indexInCartArray = cartArray.indexOf(cartArray.find(element => element.id == dataId && element.color === dataColor))
      cartArray.splice(indexInCartArray, 1)
      localStorage.setItem('cartArray', JSON.stringify(cartArray));
      // suppression du produit dans localStorage 'productData'
      const indexInProductDatas = productData.indexOf(productData.find(element => element.id == dataId && element.color == dataColor))
      productData.splice(indexInProductDatas, 1);
      // MAJ prix total des produits 
      localStorage.setItem('productData', JSON.stringify(productData));
      totalPriceContainer.innerHTML = sum();
      // MAJ quantité totale d'articles 
      totalQuantityContainer.innerHTML = cartArray.length;
    };
  });

  // Event modification quantité d'un produit 
  document.addEventListener('change', (e) => {

    if (e.target.className == "itemQuantity" && quantityCheck(e.target.value)) {
      const article = e.target.closest('article');
      const dataId = article.dataset.id;
      const dataColor = article.dataset.color;
      const newQuantity = e.target.value;
      // MAJ de la quantité dans le localStorage "cartArray"
      let indexInCartArray = cartArray.indexOf(cartArray.find(element => element.id == dataId && element.color === dataColor))
      cartArray[indexInCartArray].quantity = newQuantity;
      localStorage.setItem('cartArray', JSON.stringify(cartArray));
      // MAJ prix produit 
      // Recherche du prix unitaire du produit dans 'productData'
      let productPrice = productData.find(element => element.id == dataId).price
      //recherche du produit dans localStorage 'productData' 
      const productInProductDatas = productData.find(element => element.id == dataId && element.color == dataColor)
      // Modification du prix total du produit dans localStorage "productData"
      productInProductDatas.totalPrice = multiply(productPrice, newQuantity);
      // MAJ localStorage "productData"
      localStorage.setItem('productData', JSON.stringify(productData));
      // MAJ de l'affichage du prix du produit dans la carte  
      const itemDescriptionContainer = article.querySelector('.cart__item__content__description');
      itemDescriptionContainer.lastElementChild.innerHTML = `${productInProductDatas.totalPrice}€`;
      // MAJ de l'affichage du prix totale des produits 
      totalPriceContainer.innerHTML = sum();
      return
    };

    alert('mininum 1 article et maximum 100 articles');

  });

};

main();





