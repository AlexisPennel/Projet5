import { getCanap } from './lib/requests.js';
import { modifyQuantity, getCartArray } from './lib/cartManagement.js';

const main = async () => {
    //récupération de l'id et des données du produit 
    const urlId = window.location.search;
    const urlSearchParams = new URLSearchParams(urlId);
    const productId = urlSearchParams.get('id');
    const productData = await getCanap(`http://localhost:3000/api/products/${productId}`);

    if (productData === -1 || !productId) {
        alert(`Le produit n'existe pas`);
        window.location.href = `./index.html`
        return
    }

    //Ajout nom du produit (meta title)
    const productName = productData.name
    document.querySelector('title').innerHTML = productName;

    //Ajout image produit
    const productImage = `<img src="${productData.imageUrl}" alt="Photographie d'un canapé"></img>`;
    document.querySelector('.item__img').innerHTML = productImage;

    //Ajout nom du produit (main)
    document.querySelector('#title').innerHTML = productName;

    //Ajout du prix produit 
    document.querySelector('#price').innerHTML = productData.price;

    //Ajout description produit 
    document.querySelector('#description').innerHTML = productData.description;

    //Ajout des options produit 
    let colorsContainer = document.querySelector('#colors');
    let productColorsDatas = productData.colors;
    let newColor = "";

    let productColors = () => {
        productColorsDatas.forEach(element => {
            newColor += `<option value="${element}">${element}</option>`;
        });

        colorsContainer.innerHTML = newColor;
    };
    productColors();

    //ajout panier 
    const quantityInput = document.getElementById('quantity');
    const colorSelect = document.getElementById('colors');

    let addToCart = () => {
        const product = {
            name: productName,
            id: productId,
            quantity: quantityInput.value,
            color: colorSelect.value
        };

        let cartArray = getCartArray();

        const quantityCheck = modifyQuantity(cartArray, product);

        if (cartArray.length === 0) {
            cartArray.push(product);
            localStorage.setItem('cartArray', JSON.stringify(cartArray));
            console.log(cartArray);
            return
        };

        if (quantityCheck === -1) {
            localStorage.setItem('cartArray', JSON.stringify(cartArray));
            return
        }

        cartArray.push(product);
        console.log(cartArray);
        localStorage.setItem('cartArray', JSON.stringify(cartArray));

    };

    document.getElementById('addToCart').addEventListener('click', (addToCart))

};

main();