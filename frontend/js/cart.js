import{getCartArray} from "./lib/cartManagement.js";
import { getCanap } from "./lib/requests.js";

let main =async () => { 
    let cartArray = getCartArray();
    let cartItems = document.getElementById('cart__items');
    let card = "";

    console.log(cartArray);

    const getData = async (element) => {
        const productData = await getCanap(`http://localhost:3000/api/products/${element.id}`);       
        console.log(productData);
        card += `<article class="cart__item" data-id="${productData.id}" data-color="${productData.color}">
        <div class="cart__item__img">
          <img src="${productData.imageUrl}" alt="${productData.description}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productData.name}</h2>
            <p>${element.color}</p>
            <p>${productData.price} €</p>
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
    }

    cartArray.forEach(element => {
        getData(element);
    //     card += `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
    //     <div class="cart__item__img">
    //       <img src="${productData.imageUrl}" alt="Photographie d'un canapé">
    //     </div>
    //     <div class="cart__item__content">
    //       <div class="cart__item__content__description">
    //         <h2>Nom du produit</h2>
    //         <p>Vert</p>
    //         <p>42,00 €</p>
    //       </div>
    //       <div class="cart__item__content__settings">
    //         <div class="cart__item__content__settings__quantity">
    //           <p>Qté : </p>
    //           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    //         </div>
    //         <div class="cart__item__content__settings__delete">
    //           <p class="deleteItem">Supprimer</p>
    //         </div>
    //       </div>
    //     </div>
    //   </article>`
    });

    



};

main();