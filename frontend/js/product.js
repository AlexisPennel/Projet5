import { getCanap } from './lib/requests.js';

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
    const cartArray = [];
    const quantityInput = document.getElementById('quantity');
    const colorSelect = document.getElementById('colors');

    let addToCart = () => {
        const product = {
            name: productName,
            id: productId,
            quantity: quantityInput.value,
            color: colorSelect.value
        };

        if (cartArray.length === 0 ) {
            cartArray.push(product);
            console.log(cartArray);
            return
        }

        if (product.id === cartArray[length].id && product.color === cartArray[length].color) {
            console.log(`same id and color`);
            console.log(cartArray);
            return
        }

        cartArray.push(product);
        console.log(cartArray);

        // for (let i in cartArray) {
        //     if (!cartArray[i]) {
        //         console.log(`push`);
        //     }
        // };

        // if (cartArray.length === 0 || product.id === cartArray[length].id && product.color != cartArray[length].color) {
        //     cartArray.push(product);
        //     console.log(cartArray);
        // } else if (product.id === cartArray[length].id && product.color === cartArray[length].color) {
        //     console.log('meme id et meme couleur');
        //     modifyQuantity();
        // }
    };



    document.getElementById('addToCart').addEventListener('click', (addToCart))

};

main();