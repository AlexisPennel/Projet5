import { getCartArray, multiply, quantityCheck, sum, localStorageUpdate, sumQuantity, cartLengthCheck } from "./lib/cartManagement.js";
import { getCanap } from "./lib/requests.js";

const main = () => {
  const cartArray = getCartArray();
  const itemsContainer = document.getElementById('cart__items');
  const totalQuantityContainer = document.getElementById('totalQuantity');
  const totalPriceContainer = document.getElementById('totalPrice');
  let productData = []
  let card = "";

  cartLengthCheck(cartArray);
  
  const createCard = async (element) => {
    const canapData = await getCanap(`http://localhost:3000/api/products/${element.id}`);

    const product = {
      id: element.id,
      color: element.color,
      price: canapData.price,
      totalPrice: 0,
      quantity: element.quantity
    };

    console.log(productData);
    productData.push(product);
    product.totalPrice = multiply(product.price, element.quantity);
    localStorageUpdate('productData', productData);

    card += `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
        <div class="cart__item__img">
        <img src="${canapData.imageUrl}" alt="${canapData.description}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${canapData.name}</h2>
            <p>${element.color}</p>
            <p>${product.quantity} x  ${product.price}€</p>
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

    itemsContainer.innerHTML = card;
    // Affichage du prix total des produits
    totalPriceContainer.innerHTML = sum();
    // Affichage de la quantité totale de produits 
    totalQuantityContainer.innerHTML = sumQuantity();

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
      itemsContainer.removeChild(article);
      const indexInCartArray = cartArray.indexOf(cartArray.find(element => element.id == dataId && element.color === dataColor));
      cartArray.splice(indexInCartArray, 1);
      localStorageUpdate('cartArray', cartArray);
      // suppression du produit dans localStorage 'productData'
      const indexInProductDatas = productData.indexOf(productData.find(element => element.id == dataId && element.color == dataColor));
      productData.splice(indexInProductDatas, 1);
      // MAJ prix total des produits 
      localStorageUpdate('productData', productData);
      totalPriceContainer.innerHTML = sum();
      // MAJ quantité totale d'articles 
      totalQuantityContainer.innerHTML = sumQuantity();
    };
  });

  // Event modification quantité d'un produit 
  document.addEventListener('change', (e) => {

    const article = e.target.closest('article');
    const dataId = article.dataset.id;
    const dataColor = article.dataset.color;
    const newQuantity = e.target.value;
    //recherche du produit dans localStorage 'productData' 
    const productInProductData = productData.find(element => element.id == dataId && element.color == dataColor);

    if (e.target.className == "itemQuantity") {
      if (quantityCheck(e.target.value)) {
        // MAJ de la quantité dans le localStorage "cartArray"
        const indexInCartArray = cartArray.indexOf(cartArray.find(element => element.id == dataId && element.color === dataColor));
        cartArray[indexInCartArray].quantity = newQuantity;
        localStorageUpdate('cartArray', cartArray);
        // MAJ prix produit 
        // Recherche du prix unitaire du produit dans 'productData'
        const productUnitPrice = productData.find(element => element.id == dataId).price;
        // Modification du prix total du produit dans localStorage "productData"
        productInProductData.totalPrice = multiply(productUnitPrice, newQuantity);
        // Modification de la quantité dans localStorage 'productData 
        productInProductData.quantity = newQuantity;
        // MAJ localStorage "productData"
        localStorageUpdate('productData', productData);
        // MAJ de l'affichage du prix du produit dans la carte  
        const itemDescriptionContainer = article.querySelector('.cart__item__content__description');
        itemDescriptionContainer.lastElementChild.innerHTML = `${productInProductData.quantity} x  ${productInProductData.price}€`;
        // MAJ de l'affichage du prix totale des produits 
        totalPriceContainer.innerHTML = sum();
        // MAJ de l'affichage de la quantité totale des produits 
        totalQuantityContainer.innerHTML = sumQuantity();
        return
      };

      alert('mininum 1 article et maximum 100 articles');
      e.target.value = productInProductData.quantity;

    };
  });

  // Formulaire 
  // const form = document.querySelector('.cart__order__form')
  // const firstNameInput = document.getElementById('firstName');
  // const lastNameInput = document.getElementById('lastName');
  // const adressInput = document.getElementById('adress');
  // const cityInput = document.getElementById('city');
  // const emailInput = document.getElementById('email');
  // const orderBtn = document.getElementById('order');


  // form.addEventListener('submit', () => {
  //   namesCheck(firstNameInput.value);
  //   namesCheck(lastNameInput.value);


  // });

};

main();





