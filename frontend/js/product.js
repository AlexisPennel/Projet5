// Importation des fonctions depuis les fichiers "requests.js" et "cartManagement.js"
import { getCanap } from './lib/requests.js';
import { addProduct } from './lib/cartManagement.js';

// Fonction principale
const main = async () => {
    //Récupération de l'id et des données du produit 
    const urlId = window.location.search;
    const urlSearchParams = new URLSearchParams(urlId);
    const productId = urlSearchParams.get('id');
    const productData = await getCanap(`http://localhost:3000/api/products/${productId}`);

    // Message d'erreur si productData retourne "-1" ou si l'id produit est absent 
    if (productData === -1 || !productId) {
        alert(`Le produit n'existe pas`);
        window.location.href = `./index.html`
        return
    }

    //Ajout du nom du produit dans la balise meta title
    const productName = productData.name
    document.querySelector('title').innerHTML = productName;

    //Ajout de l'image du produit
    const productImage = `<img src="${productData.imageUrl}" alt="${productData.description}"></img>`;
    document.querySelector('.item__img').innerHTML = productImage;

    //Ajout du nom du produit 
    document.querySelector('#title').innerHTML = productName;

    //Ajout du prix du produit 
    document.querySelector('#price').innerHTML = productData.price;

    //Ajout de la description du produit 
    document.querySelector('#description').innerHTML = productData.description;

    //Ajout des options de couleur dans le menu déroulant
    const colorsContainer = document.querySelector('#colors');
    const productColorsDatas = productData.colors;
    let newColor = "";

    //Création de l'option (menu déroulant) pour chaque élément de la variable "productColorsDatas"
    productColorsDatas.forEach(element => {
        newColor += `<option value="${element}">${element}</option>`;
    });

    colorsContainer.insertAdjacentHTML('beforeend', newColor);


    //Ajout au panier 
    const quantityInput = document.getElementById('quantity');
    const colorSelect = document.getElementById('colors');

    // Fonction appelée lors du clic sur le bouton "Ajouter au panier"
    const addToCart = () => {

        // Appel de la fonction "addProduct" du fichier js "cartManagement"
        const productCheck = addProduct(productId, colorSelect.value, quantityInput.value, productName);

        // Affichage du message d'erreur renvoyé par la fonction productCheck
        if (productCheck !== undefined) {
            alert(productCheck)
            return
        };

        // Redirection page "panier"
        window.location.href = `./cart.html`;
    };

    // Événement du bouton "Ajouter au panier"
    document.getElementById('addToCart').addEventListener('click', (addToCart))

};

main();