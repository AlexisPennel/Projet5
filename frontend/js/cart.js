// Importation des fonctions depuis "cartManagement.js", "requests.js", "form.js"
import { getCartArray, multiply, quantityCheck, sum, localStorageUpdate, sumQuantity, cartLengthCheck } from "./lib/cartManagement.js";
import { getCanap, postData } from "./lib/requests.js";
import { removeError, isFormValid } from "./lib/form.js";

// Fonction principale 
const main = () => {
  // Récupération du array "panier"
  const cartArray = getCartArray();
  const itemsContainer = document.getElementById('cart__items');
  const totalQuantityContainer = document.getElementById('totalQuantity');
  const totalPriceContainer = document.getElementById('totalPrice');
  let productData = []
  let card = "";

  // Vérification du nombre de produits dans "cartArray"
  cartLengthCheck(cartArray);

  // Fonction qui récupère les données pour chaque produit présent dans le array du panier (cartArray), pour la création des "cartes produit" du panier.  
  const createCard = async (element) => {
    const canapData = await getCanap(`http://localhost:3000/api/products/${element.id}`);

    // Création d'un objet "product" pour le array "productData" avec les infos du produit 
    const product = {
      id: element.id,
      color: element.color,
      price: canapData.price,
      totalPrice: 0,
      quantity: element.quantity
    };

    // Ajout du "product" dans le array "productData"
    productData.push(product);
    // Calcul de prix total par produits (Prix unitaire x quantité sélectionnée)
    product.totalPrice = multiply(product.price, element.quantity);
    // Mise à jour du array "productData" dans le localStorage
    localStorageUpdate('productData', productData);

    // Création des cartes produit 
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

    // Affichage de la "carte produit" 
    itemsContainer.innerHTML = card;
    // Affichage du prix total des produits
    totalPriceContainer.innerHTML = sum();
    // Affichage de la quantité totale de produits 
    totalQuantityContainer.innerHTML = sumQuantity();

  };

  // Boucle pour la création des "cartes produit" pour chaque élément du array "cartArray"
  cartArray.forEach(element => {
    createCard(element);
  });


  // Événement pour la suppression d'un produit 
  document.addEventListener('click', (e) => {
    if (e.target.className == "deleteItem") {
      // Récupération de la balise <article> la plus proche et du "dataId" et de la "dataColor"
      const article = e.target.closest('article');
      const dataId = article.dataset.id;
      const dataColor = article.dataset.color;
      // Suppression de la carte sur la page et du produit dans le localStorage 'cartArray'
      itemsContainer.removeChild(article);
      const indexInCartArray = cartArray.indexOf(cartArray.find(element => element.id == dataId && element.color === dataColor));
      cartArray.splice(indexInCartArray, 1);
      localStorageUpdate('cartArray', cartArray);
      // Suppression du produit dans le localStorage 'productData'
      const indexInProductDatas = productData.indexOf(productData.find(element => element.id == dataId && element.color == dataColor));
      productData.splice(indexInProductDatas, 1);
      // Mise à jour du prix total des produits 
      localStorageUpdate('productData', productData);
      totalPriceContainer.innerHTML = sum();
      // Mise à jour de la quantité totale d'articles 
      totalQuantityContainer.innerHTML = sumQuantity();
    };
  });

  // Événement pour la modification de la quantité d'un produit 
  document.addEventListener('change', (e) => {

    if (e.target.className == "itemQuantity") {
      // Récupération de l'article le plus proche et du "dataId" et de la "dataColor"
      const article = e.target.closest('article');
      const dataId = article.dataset.id;
      const dataColor = article.dataset.color;
      const newQuantity = e.target.value;
      // Recherche du produit dans localStorage 'productData' 
      const productInProductData = productData.find(element => element.id == dataId && element.color == dataColor);

      if (quantityCheck(e.target.value)) {
        // Mise a jour de la quantité dans le localStorage "cartArray"
        const indexInCartArray = cartArray.indexOf(cartArray.find(element => element.id == dataId && element.color === dataColor));
        cartArray[indexInCartArray].quantity = newQuantity;
        localStorageUpdate('cartArray', cartArray);
        // Mise a jour prix produit 
        // Recherche du prix unitaire du produit dans 'productData'
        const productUnitPrice = productData.find(element => element.id == dataId).price;
        // Modification du prix total du produit dans localStorage "productData"
        productInProductData.totalPrice = multiply(productUnitPrice, newQuantity);
        // Modification de la quantité dans localStorage "productData"
        productInProductData.quantity = newQuantity;
        // Mise à jour localStorage "productData"
        localStorageUpdate('productData', productData);
        // Mise à jour de l'affichage du prix du produit dans la "carte produit" 
        const itemDescriptionContainer = article.querySelector('.cart__item__content__description');
        itemDescriptionContainer.lastElementChild.innerHTML = `${productInProductData.quantity} x  ${productInProductData.price}€`;
        // Mise à jour de l'affichage du prix total des produits 
        totalPriceContainer.innerHTML = sum();
        // Mise à jour de l'affichage de la quantité totale des produits 
        totalQuantityContainer.innerHTML = sumQuantity();
        return
      };

      // Message d'erreur si la quantité d'articles n'est pas comprise entre 1 et 100 et retour à la valeur initiale 
      alert('Mininum 1 article et maximum 100 articles');
      e.target.value = productInProductData.quantity;

    };
  });

  // Variables formulaire 
  const form = document.querySelector('.cart__order__form')
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const email = document.getElementById('email');

  // Événement envoie du formulaire 
  form.addEventListener('submit', async (event) => {

    // Suppression du comportement par défaut
    event.preventDefault()

    // Suppression des messages d'erreur (champs de saisie)
    removeError();

    // Appel de la fonction "isFormValid" pour la vérification des données saisies. => Si true, création de l'objet "contact" et du array "produit", et envoi des données a l'API
    if (isFormValid(firstName.value, lastName.value, address.value, city.value, email.value)) {

      // Objet "contact"
      const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
      };

      // Array "produit" 
      const orderArray = [];
      for (let i in cartArray) {
        orderArray.push(cartArray[i].id)
        
      };
      // POST des datas et réponse API 
      let response = await postData(contact, orderArray);

      // Récupération du numéro de commande
      const orderId = response.orderId

      // Clear local storage
      localStorage.clear();

      // Redirection page confirmation
      window.location.href = `./confirmation.html?id=${orderId}`;
    }
  });
};

main();