import { getCartArray } from "./lib/cartManagement.js";
import { getCanap } from "./lib/requests.js";



const main = async () => {
  let cartArray = getCartArray();
  let cartItems = document.getElementById('cart__items');
  let card = "";
  let numberCheck = 0;

  console.log(cartArray);

  const createCard = async (element) => {
    const productData = await getCanap(`http://localhost:3000/api/products/${element.id}`);
    card += `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
        <div class="cart__item__img">
          <img src="${productData.imageUrl}" alt="${productData.description}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productData.name}</h2>
            <p>${element.color}</p>
            <p>${productData.price}€</p>
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
  };

  
  cartArray.forEach(element => {
    createCard(element);
  });
};


main();




