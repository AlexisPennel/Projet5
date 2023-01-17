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
  const productData = [];
  let card = "";


  // Vérification du nombre de produits dans "cartArray"
  cartLengthCheck(cartArray);

  // Fonction qui récupère les données pour chaque produit présent dans le array du panier (cartArray), pour la création des "cartes produit" du panier.  
  const createCard = async (element) => {
    const canapData = await getCanap(`http://localhost:3000/api/products/${element.id}`);

    const product = {
      id: element.id,
      color: element.color,
      price: canapData.price,
      quantity: element.quantity,
      totalPrice: 0,
    };
    product.totalPrice = multiply(product.price, product.quantity)
    productData.push(product);

    // Création des cartes produit 
    card += `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
        <div class="cart__item__img">
        <img src="${canapData.imageUrl}" alt="${canapData.description}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${canapData.name}</h2>
            <p>${element.color}</p>
            <p>${canapData.price}€</p>
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
    totalQuantityContainer.innerHTML = sumQuantity(productData);
    totalPriceContainer.innerHTML = sum(productData)
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
      // Suppression du tableau ProductData
      const indexInProductData = productData.indexOf(productData.find(element => element.id === dataId && element.color === dataColor));
      productData.splice(indexInProductData, 1);
      // MAJ affichage prix total et quantité total 
      totalQuantityContainer.innerHTML = sumQuantity(productData);
      totalPriceContainer.innerHTML = sum(productData)
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

      if (quantityCheck(e.target.value)) {
        // Mise a jour de la quantité dans le localStorage "cartArray"
        const indexInCartArray = cartArray.indexOf(cartArray.find(element => element.id == dataId && element.color === dataColor));
        cartArray[indexInCartArray].quantity = newQuantity;
        localStorageUpdate('cartArray', cartArray);
        // Mise a jour de la quantité dans le tableau productData 
        const indexInProductData = productData.indexOf(productData.find(element => element.id === dataId && element.color === dataColor));
        productData[indexInProductData].quantity = newQuantity;
        //  Mise a jour du prix total par produit dans le tableau productData
        productData[indexInProductData].totalPrice = multiply(productData[indexInProductData].price, productData[indexInProductData].quantity )
        // Affichage quantité total et prix total panier
        totalQuantityContainer.innerHTML = sumQuantity(productData);
        totalPriceContainer.innerHTML = sum(productData)
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

      // Body de la requête API
      const body = {
        contact: contact,
        products: orderArray
      }

      // POST des datas et réponse API 
      let response = await postData('http://localhost:3000/api/products/order', body);

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