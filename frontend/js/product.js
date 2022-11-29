import { getCanap } from './requests.js';

const main = async () => {
    //récupération de l'id et des données du produit 
    const productId = window.location.search.slice(1);
    // console.log(pageId);
    let productData = await getCanap(`http://localhost:3000/api/products/${productId}`);
    console.log(productData);

    //Ajout nom du produit (meta title)
    const productName = productData.name
    let pageTitle = document.querySelector('title').innerHTML = productName;

    //Ajout image produit
    let productImage = `<img src="${productData.imageUrl}" alt="Photographie d'un canapé"></img>`;
    let imageContainer = document.querySelector('.item__img').innerHTML = productImage;

    //Ajout nom du produit (main)
    let productTitle = document.querySelector('#title').innerHTML = productName;
    
    //Ajout du prix produit 
    let productPrice = document.querySelector('#price').innerHTML = productData.price;

    //Ajout description produit 
    let productDescription = document.querySelector('#description').innerHTML = productData.description;

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

    


    
};


main();

